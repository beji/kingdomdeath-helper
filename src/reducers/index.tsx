import weaponArts from "data/final/weaponarts.json";
import { Reducer } from "redux";
import { removeFromHunt, updateGear, updateGearSlotAffinity, updateSurvivor } from "../actions";
import items from "../data/ItemDataHelper";
import initialState, { DEFAULT_SURVIVOR_NAME, newSurvivor } from "../initialstate";
import { Affinity, AffinityTypes, DefenseStats, IGearGrid, IItem, ISettlement, ISurvivor, StatType } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { UpdateGearGridAction, UpdateGearSlotAffinityAction } from "../interfaces/gearActions";
import { AddToHuntAction, RemoveFromHuntAction, ResetHuntAction } from "../interfaces/huntActions";
import { ImportAction } from "../interfaces/importAction";
import { SetNameAction } from "../interfaces/settlementActions";
import { CreateSurvivorAction, KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction, UpdateSurvivorStatAction, UpdateSurvivorWeaponArtsAction } from "../interfaces/survivorActions";
import { clone } from "../util";

type Actions = AddToHuntAction | RemoveFromHuntAction | ImportAction | SetNameAction | UpdateSurvivorAction | UpdateSurvivorStatAction | KillSurvivorAction | ReviveSurvivorAction | CreateSurvivorAction | UpdateGearGridAction | UpdateGearSlotAffinityAction | UpdateSurvivorWeaponArtsAction | ResetHuntAction;

function generateWithUpdatedSurvivors(state: ISettlement, mapfunc: (survivor: ISurvivor) => ISurvivor) {
    const updatedSurvivors = state.survivors.map(mapfunc);
    return {
        ...state,
        survivors: updatedSurvivors,
    };
}

function generateWithUpdatedGrid(state: ISettlement, mapfunc: (grid: IGearGrid) => IGearGrid) {
    const updatedGrids = state.geargrids.map(mapfunc);
    return {
        ...state,
        geargrids: updatedGrids,
    };
}

const reducer: Reducer<ISettlement> = (state: ISettlement | undefined, action: Actions): ISettlement => {

    if (!state) {
        return initialState;
    }

    switch (action.type) {
        // Set a survivor to the specified hunting slot, this will also migrate any stats gained from gear in the current slot to the survivor and remove the current hunter from the slot
        case ActionTypes.ADD_TO_HUNT: {
            if (action.payload) {
                // The slot might be occupied by a survivor, that survivor will loose their stat bonuses gained by the gear
                const { survivorId } = state.geargrids[action.payload.gridId];

                const oldSurvivor = state.survivors.find((survivor) => survivor.id === survivorId);
                const oldStats = oldSurvivor ? clone(oldSurvivor.baseStats) : [];

                // If the survivor is currently hunting they might be just switching their hunting spot
                // we need to keep them from occupying two spots at the same time
                // so we just remove them from the hunt before (re-)adding them
                const statePhaseOne = reducer(state, removeFromHunt(action.payload.id));

                // If the targeted hunting spot is currently occupied the old hunter needs to get removed as well
                const baseState = oldSurvivor ? reducer(statePhaseOne, removeFromHunt(oldSurvivor.id)) : statePhaseOne;

                const nextState = generateWithUpdatedSurvivors(baseState, (survivor) => {
                    // mark the new survivor as hunting and move the gear stats from the old survivor to the new one
                    if (action.payload && survivor.id === action.payload.id && survivor.alive) {
                        const newState = {
                            ...survivor,
                            gridId: action.payload.gridId.toString(),
                            hunting: true,
                        };

                        // The non-gear baseStats stay the same
                        const newBaseStats = survivor.baseStats.map((basestat) => {
                            const oldStat = oldStats.find((oldstat) => oldstat.stat === basestat.stat);
                            if (oldStat) {
                                return {
                                    ...basestat,
                                    gear: oldStat.gear,
                                };
                            }
                            return basestat;
                        });

                        return {
                            ...newState,
                            baseStats: newBaseStats,
                        };
                    }
                    return survivor;
                });
                // Now the grid has to reference the new survivor
                let newGrid;
                const updatedGearGrids = nextState.geargrids.map((geargrid, idx) => {
                    if (action.payload && idx === action.payload.gridId) {
                        newGrid = {
                            ...geargrid,
                            survivorId: action.payload.id,
                        };
                        return newGrid;
                    }
                    return geargrid;
                });

                const returnState = {
                    ...nextState,
                    geargrids: updatedGearGrids,
                };

                return newGrid ? reducer(returnState, updateGear(newGrid as IGearGrid)) : returnState;
            }
            return state;
        }
        // Remove a survivor from the hunt
        case ActionTypes.REMOVE_FROM_HUNT: {
            if (action.payload) {
                let idxToUpdate = -1;

                // Set the survivor to not hunting and also remove the reference to the gear grid, it only applies to hunters
                const stateWithUpdatedSurvivor = generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === action.payload) {
                        idxToUpdate = parseInt(survivor.gridId as string, 10);
                        return {
                            ...survivor,
                            // The non-gear baseStats stay the same
                            baseStats: survivor.baseStats.map((basestat) => {
                                return {
                                    ...basestat,
                                    gear: 0,
                                };
                            }),
                            gridId: undefined,
                            hunting: false,

                        };
                    }
                    return survivor;
                });
                // Update the gear grid to no longer reference the survivor
                if (idxToUpdate !== -1) {
                    return {
                        ...stateWithUpdatedSurvivor,
                        geargrids: state.geargrids.map((geargrid, idx) => {
                            if (idx === idxToUpdate) {
                                return {
                                    ...geargrid,
                                    survivorId: undefined,
                                };
                            }
                            return geargrid;
                        }),
                    };
                }
                return stateWithUpdatedSurvivor;

            }
            return state;
        }
        case ActionTypes.IMPORT: {
            return clone(action.payload) || state;
        }
        // Updates the settlement name
        case ActionTypes.SET_NAME: {
            if (action.payload && action.payload !== "") {
                return {
                    ...state,
                    name: action.payload,
                };
            }
            return state;
        }
        // Updates
        // a) The name of a survivor
        // b) The gender of a survivor
        // TODO: Rework this into different actions
        case ActionTypes.UPDATE_SURVIVOR: {
            if (action.payload) {
                const survivorToUpdate = action.payload as ISurvivor;
                return generateWithUpdatedSurvivors(state, (survivor) => {
                    // Survivors gain one free survival on the first rename (faked by checking for the DEFAULT_SURVIVOR_NAME, could be cheated)
                    if (survivor.id === survivorToUpdate.id && survivorToUpdate.name !== "") {
                        if (survivor.name === DEFAULT_SURVIVOR_NAME && survivorToUpdate.name !== DEFAULT_SURVIVOR_NAME) {

                            return {
                                ...survivorToUpdate,
                                defenseStats: survivorToUpdate.defenseStats.map((defensestat) => {
                                    if (defensestat.stat === DefenseStats.survival) {
                                        return {
                                            ...defensestat,
                                            armor: defensestat.armor + 1,
                                        };
                                    }
                                    return defensestat;
                                }),
                            };
                        }
                        return clone(survivorToUpdate);
                    }
                    return survivor;
                });
            }
            return state;
        }
        // Updates the survivor base- and defenseStats
        case ActionTypes.UPDATE_SURVIVOR_STAT: {
            if (action.payload) {
                const newStat = action.payload;
                return generateWithUpdatedSurvivors(state, (survivor) => {

                    const { stat, survivorId } = newStat;
                    // At this point the update could be for a baseStat or a hitLocation, we don't know yet

                    if (survivor.id === survivorId) {
                        if (stat.type === StatType.base) {
                            return {
                                ...survivor,
                                baseStats: survivor.baseStats.map((basestat) => {
                                    if (basestat.stat === stat.stat) {
                                        return clone(stat);
                                    }
                                    return basestat;
                                }),
                            };
                        } else if (stat.type === StatType.defense) {
                            return {
                                ...survivor,
                                defenseStats: survivor.defenseStats.map((basestat) => {
                                    if (basestat.stat === stat.stat) {
                                        return clone(stat);
                                    }
                                    return basestat;
                                }),
                            };
                        } else if (stat.type === StatType.special) {
                            return {
                                ...survivor,
                                specialstats: survivor.specialstats.map((specialstat) => {
                                    if (specialstat.stat === stat.stat) {
                                        return clone(stat);
                                    }
                                    return specialstat;
                                }),
                            };
                        }
                    }
                    return survivor;
                });
            }
            return state;
        }
        // Kill a survivor. This should remove them from the hunt and update the gear grid accordingly
        case ActionTypes.KILL_SURVIVOR: {
            if (action.payload) {
                const baseState = reducer(state, removeFromHunt(action.payload));
                // Mark the survivor as dead (or not alive, to be more correct)
                return generateWithUpdatedSurvivors(baseState, (survivor) => {
                    if (survivor.id === action.payload) {
                        return {
                            ...survivor,
                            alive: false,
                            gridId: undefined,
                            hunting: false,
                        };
                    }
                    return survivor;
                });
            }
            return state;
        }
        // Revives a dead survivor
        case ActionTypes.REVIVE_SURVIVOR: {
            if (action.payload) {
                return generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === action.payload) {
                        return {
                            ...survivor,
                            alive: true,
                        };
                    }
                    return survivor;
                });
            }
            return state;
        }
        // Creates a new survivor
        case ActionTypes.CREATE_SURVIVOR: {
            return {
                ...state,
                survivors: state.survivors.concat(newSurvivor()),
            };
        }
        // Updates geargrid with updated grid from payload
        case ActionTypes.UPDATE_GEARGRID: {
            if (action.payload) {
                const { survivorId, slots } = action.payload;

                if (survivorId) {
                    const nextState = generateWithUpdatedSurvivors(state, (survivor) => {
                        if (survivor.id === survivorId) {
                            // reset survivor stats
                            const updatedSurvivor: ISurvivor = {
                                ...survivor,
                                baseStats: survivor.baseStats.map((stat) => {
                                    return {
                                        ...stat,
                                        gear: 0,
                                    };
                                }),
                                defenseStats: survivor.defenseStats.map((stat) => {
                                    return {
                                        ...stat,
                                        armor: 0,
                                    };
                                }),
                            };

                            // assign stats from gear
                            slots
                                .filter((slot) => slot.content)
                                .map((slot) => items.find((itm) => itm.id === slot.content) as IItem)
                                .map((item) => {
                                    if (item && item.stats && updatedSurvivor) {
                                        item.stats.map((cardStat) => {
                                            const statTypes = ["defenseStats", "baseStats", "specialstats"]; // Array sorted by StatType enum
                                            const fieldToAddName = ["armor", "gear", "value"]; // Array sorted by StatType enum
                                            if (updatedSurvivor[statTypes[cardStat.type]]) {
                                                updatedSurvivor[statTypes[cardStat.type]].some((survivorStat: any) => {
                                                    if (cardStat.stat === survivorStat.stat) {
                                                        survivorStat[fieldToAddName[cardStat.type]] += cardStat.amount;
                                                    }
                                                    return cardStat.stat === survivorStat.stat;
                                                });
                                            }
                                        });
                                    }
                                });

                            return updatedSurvivor;
                        }
                        return survivor;
                    });

                    const baseState = generateWithUpdatedGrid(nextState, (grid) => {
                        if (action.payload && grid.id === action.payload.id) {
                            return action.payload;
                        }
                        return grid;
                    });

                    return reducer(baseState, updateGearSlotAffinity(action.payload));
                }
            }
            return state;
        }
        case ActionTypes.UPDATE_GEARSLOT_AFFINITY: {
            if (action.payload) {
                const gearGrid = action.payload;
                const currentSurvivor = state.survivors.find((survivor) => survivor.id === gearGrid.survivorId);
                const updatedSurvivor: any = {...currentSurvivor};

                const nextState = generateWithUpdatedGrid(state, (grid) => {
                    if (grid.id === gearGrid.id) {
                        const gridAffinities: Affinity[] = [];
                        const affinitySlots: string[] = [];
                        // calculate affinities in this grid
                        let slots = gearGrid.slots.map((slot, slotKey) => {
                            if (slot.content) {
                                const thisCard = items.find((item) => item.id === slot.content);
                                const directions = [
                                    { o: "top", c: "bottom", slotId: slotKey - 3 },
                                    { o: "right", c: "left", slotId: slotKey % 3 === 2 ? -1 : slotKey + 1 },
                                    { o: "bottom", c: "top", slotId: slotKey + 3 },
                                    { o: "left", c: "right", slotId: slotKey % 3 === 0 ? -1 : slotKey - 1 },
                                ];
                                const affinities = [] as Affinity[];

                                // calculate slot affinities with adjacent slots and gridAffinities
                                directions.forEach((direction) => {
                                    if (direction.slotId > -1 && direction.slotId < 9) {
                                        if (gearGrid.slots[direction.slotId].content) {
                                            const card = items.find((item) => item.id === gearGrid.slots[direction.slotId].content);
                                            const affinity = thisCard && thisCard.affinity && thisCard.affinity[direction.o];
                                            const affinitySlotMarker = slotKey > direction.slotId ? `${direction.slotId}${slotKey}` : `${slotKey}${direction.slotId}`;
                                            if (affinity === (card && card.affinity && card.affinity[direction.c])) {
                                                affinities.push(affinity);
                                                if (affinitySlots.indexOf(affinitySlotMarker) === -1) {
                                                    gridAffinities.push(affinity);
                                                    affinitySlots.push(affinitySlotMarker);
                                                }
                                            }
                                        }
                                    }
                                });

                                return {
                                    ...slot,
                                    affinities,
                                };
                            } else {
                                return slot;
                            }
                        });
                        // calculate active card affinities
                        slots = slots.map((slot) => {
                            const { affinities, content } = slot;
                            const thisCard = items.find((item) => item.id === slot.content);
                            let affinityActive = false;

                            // calculate if affinity bonus on current card is active
                            if (content && thisCard && thisCard.affinity && thisCard.affinity.bonus) {
                                const { bonus } = thisCard.affinity;
                                const activeAffs: Affinity[] = [];
                                const requiredAffinities = bonus.require;

                                // check affinities on card
                                if (affinities && affinities.length > 0) {
                                    affinities.forEach((slotAff) => {
                                        requiredAffinities.some((cardAff) => {
                                            if (slotAff === cardAff.color && cardAff.connection === AffinityTypes.card) {
                                                activeAffs.push(slotAff);
                                            }
                                            return slotAff === cardAff.color;
                                        });
                                    });
                                }

                                // check affinities on grid
                                if (requiredAffinities.length !== activeAffs.length) {
                                    gridAffinities.forEach((gridAff) => {
                                        requiredAffinities.some((cardAff) => {
                                            if (gridAff === cardAff.color && cardAff.connection === AffinityTypes.grid) {
                                                activeAffs.push(gridAff);
                                            }
                                            return gridAff === cardAff.color;
                                        });
                                    });
                                }
                                affinityActive = requiredAffinities.length === activeAffs.length;

                                // update survivor with stats from active bonus
                                if (affinityActive && bonus.stats && updatedSurvivor) {
                                    bonus.stats.map((bonusStat) => {
                                        updatedSurvivor.baseStats.some((survivorStat: any) => {
                                            if (bonusStat.type === survivorStat.type && bonusStat.stat === survivorStat.stat) {
                                                survivorStat.gear += bonusStat.amount;
                                            }
                                            return bonusStat.stat === survivorStat.stat;
                                        });
                                    });
                                }

                                return {
                                    ...slot,
                                    affinityActive,
                                };
                            }
                            return slot;
                        });

                        return {
                            ...gearGrid,
                            affinities: gridAffinities,
                            slots,
                        };
                    }
                    return grid;
                });
                return reducer(nextState, updateSurvivor(updatedSurvivor));
            }
            return state;
        }
        case ActionTypes.RESET_HUNT: {
            return {
                ...state,
                survivors: state.survivors.map((survivor) => ({
                    ...survivor,
                    baseStats: survivor.baseStats.map((basestat) => ({
                        ...basestat,
                        token: 0,
                    })),
                    defenseStats: survivor.defenseStats.map((defensestat) => ({
                        ...defensestat,
                        modifier: 0,
                    })),
                })),
            };
        }
        case ActionTypes.UPDATE_SURVIVOR_WEAPON_ART: {
            if (action.payload) {
                const { id, arts } = action.payload;
                if (arts.length <= 3) {
                    return {
                        ...state,
                        survivors: state.survivors.map((survivor) => {
                            if (survivor.id === id) {
                                return {
                                    ...survivor,
                                    weaponArts: arts.map((art) => weaponArts[art]),
                                };
                            }
                            return survivor;
                        }),
                    };
                }
                return state;
            }
            return state;
        }
        default: return state;
    }
};

export default reducer;
