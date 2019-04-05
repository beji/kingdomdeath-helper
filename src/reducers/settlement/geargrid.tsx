import ActionTypes from 'interfaces/actionTypes'
import { Reducer } from 'redux'
import { updateGearSlotAffinity, updateGearSlotSet } from '../../actions'
import items from '../../data/ItemDataHelper'
import initialState from '../../initialstate'
import {
    Affinity,
    AffinityTypes,
    GearSet,
    IGridSlot,
    IItem,
    IItemStat,
    ISettlement,
    ISurvivor,
    Item,
} from '../../interfaces'
import Actions from '../../interfaces/reducer'
import { clone } from '../../util'
import {
    generateWithUpdatedGrid,
    generateWithUpdatedSurvivors,
    getGearItem,
    getGearSetBonus,
    getGearSetItems,
    updateStatOnSurvior,
} from '../_helper'

const reducer: Reducer<ISettlement, Actions> = (state: ISettlement | undefined, action: Actions): ISettlement => {
    if (!state) {
        return initialState.settlement
    }

    switch (action.type) {
        // Updates geargrid with updated grid from payload
        case ActionTypes.UPDATE_GEARGRID: {
            const { survivorId, slots } = action.payload

            if (typeof survivorId !== 'undefined') {
                const nextState = generateWithUpdatedSurvivors(state, survivor => {
                    if (survivor.id === survivorId) {
                        // reset survivor stats
                        let updatedSurvivor: ISurvivor = {
                            ...survivor,
                            baseStats: survivor.baseStats.map(stat => {
                                return {
                                    ...stat,
                                    gear: 0,
                                }
                            }),
                            defenseStats: survivor.defenseStats.map(stat => {
                                return {
                                    ...stat,
                                    armor: 0,
                                }
                            }),
                        }

                        // assign stats from gear
                        slots
                            .filter((slot: IGridSlot) => slot.content)
                            .map((slot: IGridSlot) => items.find(itm => itm.id === slot.content) as IItem)
                            .map((item: IItem) => {
                                if (item && item.stats && updatedSurvivor) {
                                    item.stats.map((cardStat: IItemStat) => {
                                        updatedSurvivor = updateStatOnSurvior(cardStat as IItemStat, updatedSurvivor)
                                    })
                                }
                            })

                        return updatedSurvivor
                    }
                    return survivor
                })

                const baseState = generateWithUpdatedGrid(nextState, grid => {
                    if (action.payload && grid.id === action.payload.id) {
                        return clone(action.payload)
                    }
                    return grid
                })
                return reducer(
                    reducer(baseState, updateGearSlotAffinity(action.payload)),
                    updateGearSlotSet(action.payload),
                )
            }
            return state
        }
        case ActionTypes.UPDATE_GEARSLOT_AFFINITY: {
            const gearGrid = action.payload
            const currentSurvivor = state.survivors.find(survivor => survivor.id === gearGrid.survivorId)
            const updatedSurvivor: any = { ...currentSurvivor }

            const nextState = generateWithUpdatedGrid(state, grid => {
                if (grid.id === gearGrid.id) {
                    const gridAffinities: Affinity[] = []
                    const affinitySlots: string[] = []
                    // calculate affinities in this grid
                    let slots = gearGrid.slots.map((slot: IGridSlot, slotKey: number) => {
                        if (slot.content) {
                            const thisCard = items.find(item => item.id === slot.content)
                            const directions = [
                                { o: 'top', c: 'bottom', slotId: slotKey - 3 },
                                { o: 'right', c: 'left', slotId: slotKey % 3 === 2 ? -1 : slotKey + 1 },
                                { o: 'bottom', c: 'top', slotId: slotKey + 3 },
                                { o: 'left', c: 'right', slotId: slotKey % 3 === 0 ? -1 : slotKey - 1 },
                            ]
                            const affinities = [] as Affinity[]

                            // calculate slot affinities with adjacent slots and gridAffinities
                            directions.forEach(direction => {
                                if (direction.slotId > -1 && direction.slotId < 9) {
                                    if (gearGrid.slots[direction.slotId].content) {
                                        const card = items.find(
                                            item => item.id === gearGrid.slots[direction.slotId].content,
                                        )
                                        const affinity = thisCard && thisCard.affinity && thisCard.affinity[direction.o]
                                        const affinitySlotMarker =
                                            slotKey > direction.slotId
                                                ? `${direction.slotId}${slotKey}`
                                                : `${slotKey}${direction.slotId}`
                                        if (affinity === (card && card.affinity && card.affinity[direction.c])) {
                                            affinities.push(affinity)
                                            if (affinitySlots.indexOf(affinitySlotMarker) === -1) {
                                                gridAffinities.push(affinity)
                                                affinitySlots.push(affinitySlotMarker)
                                            }
                                        }
                                    }
                                }
                            })

                            return {
                                ...slot,
                                affinities,
                            }
                        } else {
                            return slot
                        }
                    })
                    // calculate active card affinities
                    slots = slots.map(slot => {
                        const { affinities, content } = slot
                        const thisCard = getGearItem(slot.content)
                        let affinityActive = false

                        // calculate if affinity bonus on current card is active
                        if (content && thisCard && thisCard.affinity && thisCard.affinity.bonus) {
                            const { bonus } = thisCard.affinity
                            const activeAffs: Affinity[] = []
                            const requiredAffinities = bonus.require

                            // check affinities on card
                            if (affinities && affinities.length > 0) {
                                affinities.forEach(slotAff => {
                                    requiredAffinities.some(cardAff => {
                                        if (slotAff === cardAff.color && cardAff.connection === AffinityTypes.card) {
                                            activeAffs.push(slotAff)
                                        }
                                        return slotAff === cardAff.color
                                    })
                                })
                            }

                            // check affinities on grid
                            if (requiredAffinities.length !== activeAffs.length) {
                                gridAffinities.forEach(gridAff => {
                                    requiredAffinities.some(cardAff => {
                                        if (gridAff === cardAff.color && cardAff.connection === AffinityTypes.grid) {
                                            activeAffs.push(gridAff)
                                        }
                                        return gridAff === cardAff.color
                                    })
                                })
                            }
                            affinityActive = requiredAffinities.length === activeAffs.length

                            // update survivor with stats from active bonus
                            if (affinityActive && bonus.stats && updatedSurvivor) {
                                bonus.stats.map(bonusStat => {
                                    updatedSurvivor.baseStats.some((survivorStat: any) => {
                                        if (
                                            bonusStat.type === survivorStat.type &&
                                            bonusStat.stat === survivorStat.stat
                                        ) {
                                            survivorStat.gear += bonusStat.amount
                                        }
                                        return bonusStat.stat === survivorStat.stat
                                    })
                                })
                            }

                            return {
                                ...slot,
                                affinityActive,
                            }
                        }
                        return slot
                    })

                    return {
                        ...grid,
                        affinities: gridAffinities,
                        slots,
                    }
                }
                return grid
            })

            return generateWithUpdatedSurvivors(nextState, survivor => {
                // Survivors gain one free survival on the first rename (faked by checking for the DEFAULT_SURVIVOR_NAME, could be cheated)
                if (survivor.id === updatedSurvivor.id) {
                    return updatedSurvivor
                }
                return survivor
            })
        }
        case ActionTypes.UPDATE_GEARSLOT_GEARSET: {
            const gearGrid = action.payload
            const currentSurvivor = state.survivors.find(survivor => survivor.id === gearGrid.survivorId)
            let updatedSurvivor: any = { ...currentSurvivor }

            const nextState = generateWithUpdatedGrid(state, grid => {
                if (grid.id === gearGrid.id) {
                    const setItems: { [key: number]: Item[] } = {}
                    const { slots } = gearGrid

                    // Calculate sets in gearGrid
                    const gearSetsInGrid: ReadonlyArray<GearSet> = [
                        ...new Set<GearSet>(
                            slots
                                .map(slot => {
                                    const item = getGearItem(slot.content)
                                    if (item && item.set) {
                                        // Add item.id to setItems
                                        setItems[item.set.id] = setItems[item.set.id]
                                            ? [...setItems[item.set.id], item.id]
                                            : [item.id]
                                        return item.set.id
                                    }
                                })
                                .filter((itemId): itemId is GearSet => itemId !== undefined),
                        ),
                    ]
                    // Filter out incomplete gearsets
                    const fullSets = gearSetsInGrid.filter(
                        setId => JSON.stringify(setItems[setId].sort()) === JSON.stringify(getGearSetItems(setId)),
                    )

                    fullSets.map(setId => {
                        const gearSetBonus = getGearSetBonus(setId)
                        if (gearSetBonus && gearSetBonus.stats) {
                            gearSetBonus.stats.map(stat => {
                                updatedSurvivor = updateStatOnSurvior(stat, updatedSurvivor)
                            })
                        }
                    })

                    // Return grid with array of full sets
                    return {
                        ...grid,
                        gearSets: fullSets,
                    }
                }
                return grid
            })

            return generateWithUpdatedSurvivors(nextState, survivor => {
                // Survivors gain one free survival on the first rename (faked by checking for the DEFAULT_SURVIVOR_NAME, could be cheated)
                if (survivor.id === updatedSurvivor.id) {
                    return updatedSurvivor
                }
                return survivor
            })
        }
        default:
            return state
    }
}

export default reducer
