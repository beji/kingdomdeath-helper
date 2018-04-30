import { Reducer } from "redux";
import { removeFromHunt, updateSurvivor } from "../actions";
import initialState, { DEFAULT_SURVIVOR_NAME } from "../initialstate";
import { DefenseStats, IGearGrid, IHitLocation, IItem, ISettlement, ISurvivor, ISurvivorBaseStat, StatType } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { UpdateGearGridAction } from "../interfaces/gearActions";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { ImportAction } from "../interfaces/importAction";
import { SetNameAction } from "../interfaces/settlementActions";
import { CreateSurvivorAction, KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction, UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { clone } from "../util";

type Actions = AddToHuntAction | RemoveFromHuntAction | ImportAction | SetNameAction | UpdateSurvivorAction | UpdateSurvivorStatAction | KillSurvivorAction | ReviveSurvivorAction | CreateSurvivorAction | UpdateGearGridAction;

function generateWithUpdatedSurvivors(state: ISettlement, mapfunc: (survivor: ISurvivor) => ISurvivor) {
    const updatedSurvivors = state.survivors.map(mapfunc);
    const nextState = {
        ...state,
        survivors: updatedSurvivors,
    };
    return nextState;
}

function getCombinedArmorStats(grid: IGearGrid) {
    return grid;
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

                // Remove the old survivor by abusing the reducer
                const baseState = oldSurvivor ? reducer(state, removeFromHunt(oldSurvivor.id)) : state;

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
                const updatedGearGrids = nextState.geargrids.map((geargrid, idx) => {
                    if (action.payload && idx === action.payload.gridId) {
                        return {
                            ...geargrid,
                            survivorId: action.payload.id,
                        };
                    }
                    return geargrid;
                });

                return {
                    ...nextState,
                    geargrids: updatedGearGrids,
                };
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
            return action.payload || state;
        }
        // Updates the settlement name
        case ActionTypes.SET_NAME: {
            if (action.payload && action.payload !== "") {
                const nextState = {
                    ...state,
                    name: action.payload,
                };
                return nextState;
            }
            return state;
        }
        // Updates
        // a) The name of a survivor
        // b) The gender of a survivor
        case ActionTypes.UPDATE_SURVIVOR: {
            if (action.payload) {
                const newSurvivor = action.payload as ISurvivor;
                const nextState = generateWithUpdatedSurvivors(state, (survivor) => {
                    // Survivors gain one free survival on the first rename (faked by checking for the DEFAULT_SURVIVOR_NAME, could be cheated)
                    if (survivor.id === newSurvivor.id && newSurvivor.name !== "") {
                        if (survivor.name === DEFAULT_SURVIVOR_NAME && newSurvivor.name !== DEFAULT_SURVIVOR_NAME) {

                            return {
                                ...newSurvivor,
                                defenseStats: newSurvivor.defenseStats.map((defensestat) => {
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
                        return clone(newSurvivor);
                    }
                    return survivor;
                });
                return nextState;
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
                const gridElement = state.geargrids.find((grid) => grid.survivorId === action.payload);
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
            if (action.payload) {
                const nextState = {
                    ...state,
                    survivors: state.survivors.concat(action.payload),
                };
                return nextState;
            }
            return state;
        }
        // Updates geargrid with updated grid from payload
        case ActionTypes.UPDATE_GEARGRID: {
            console.error("FIX UPDATE_GEARGRID!!!!!!!");
            /*if (action.payload) {
                const { survivorId, slots } = action.payload;
                const { geargrids, items, survivors } = state;
                let baseState;

                console.log("SURVIVOR", survivorId);
                if (survivorId) {
                    const survivor = survivors.find((s) => s.id === survivorId) as ISurvivor;
                    const newStats: any = {};

                    // map survivor defenseStats
                    Object.keys(survivor.defenseStats).map((statKey) => {
                        // map slots from geargrid
                        slots.map((slot) => {
                            if (slot.content) {
                                // find item in slot
                                const item = items.find((itm) => itm.id === slot.content) as IItem;
                                const { stats } = item;
                                // map item stat to survivor
                                if (stats) {
                                    stats.map((stat: any) => {
                                        console.log(statKey.toLowerCase(), stat.type, stat.type.toLowerCase() === statKey.toLowerCase()as DefenseStats);
                                        if (stat.type.toLowerCase() === statKey) {
                                            newStats[statKey] = {
                                                ...survivor.defenseStats[statKey],
                                                armor: survivor.defenseStats[statKey].armor + stat.amount,
                                            };
                                        }
                                    });
                                }
                            }
                        });
                        if (!newStats[statKey]) {
                            newStats[statKey] = survivor.defenseStats[statKey];
                        }
                    });

                    const newSurvivor = {
                        ...survivor,
                        defenseStats: newStats,
                    };
                    console.log("UPDATING SURVIVOR", newSurvivor);
                    baseState = reducer(state, updateSurvivor(newSurvivor));
                } else {
                    baseState = state;
                }

                const newState = {
                    ...baseState,
                    geargrids: geargrids.map((grid) => {
                        if (action.payload && grid.id === action.payload.id) {
                            return action.payload;
                        }
                        return grid;
                    }),
                };

                return newState;
            }*/
            return state;
        }
        default: return state;
    }
};

export default reducer;
