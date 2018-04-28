import { Reducer } from "redux";
import { removeFromHunt } from "../actions";
import initialState, { DEFAULT_SURVIVOR_NAME } from "../initialstate";
import { IBaseStats, IHitLocation, ISettlement, ISurvivor, ISurvivorBaseStat } from "../interfaces";
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
                let oldStats: any = {};

                if (oldSurvivor) {
                    oldStats = clone(oldSurvivor.baseStats);
                }

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
                        if (Object.keys(oldStats).length > 0) {
                            // The non-gear baseStats stay the same
                            const newBaseStats = Object.keys(survivor.baseStats).reduce((acc, key) => {
                                return {
                                    ...acc,
                                    [key]: {
                                        ...newState.baseStats[key],
                                        gear: oldStats[key].gear,
                                    },
                                };
                            }, {}) as IBaseStats;

                            return {
                                ...newState,
                                baseStats: newBaseStats,
                            };
                        }
                        return newState;
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
                            baseStats: Object.keys(survivor.baseStats).reduce((acc, key) => {
                                return {
                                    ...acc,
                                    [key]: {
                                        ...survivor.baseStats[key],
                                        gear: 0,
                                    },
                                };
                            }, {}) as IBaseStats,
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
                                defenseStats: {
                                    ...newSurvivor.defenseStats,
                                    survival: {
                                        ...newSurvivor.defenseStats.survival,
                                        armor: newSurvivor.defenseStats.survival.armor + 1,
                                    },
                                },
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

                    // At this point the update could be for a baseStat or a hitLocation, we don't know yet

                    // We try to find a baseStat that maps to the given id
                    const statKeyForBaseStat = Object.keys(survivor.baseStats).find((statKey) => {
                        return survivor.baseStats[statKey].id === newStat.id;
                    });
                    // We found a baseStat, so this update is for a baseStat
                    if (statKeyForBaseStat) {
                        return {
                            ...survivor,
                            baseStats: {
                                ...survivor.baseStats,
                                [statKeyForBaseStat]: newStat as ISurvivorBaseStat,
                            },
                        };
                    }

                    // If we get here then we didn't find a baseStat, so the update propably is a hitLocation
                    const statKeyForHitLocation = Object.keys(survivor.defenseStats).find((statKey) => {
                        return survivor.defenseStats[statKey].id === newStat.id;
                    });

                    if (statKeyForHitLocation) {
                        return {
                            ...survivor,
                            defenseStats: {
                                ...survivor.defenseStats,
                                [statKeyForHitLocation]: newStat as IHitLocation,
                            },
                        };
                    }
                    return survivor;
                });
            }
            return state;
        }
        // Kill a survivor. This should remove him/her from the hunt and update the gear grid accordingly
        // FIXME: This doesn't seem to update the survivors stats, which it should?
        case ActionTypes.KILL_SURVIVOR: {
            if (action.payload) {
                const gridElement = state.geargrids.find((grid) => grid.survivorId === action.payload);

                // Mark the survivor as dead (or not alive, to be more correct)
                const nextState = generateWithUpdatedSurvivors(state, (survivor) => {
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
                // If the survivor was a hunter we need to remove the reference in the gear grid
                if (gridElement) {
                    const nextStateWithGrids = {
                        ...nextState,
                        geargrids: nextState.geargrids.map((geargrid) => {
                            if (geargrid.id === gridElement.id) {
                                return {
                                    ...geargrid,
                                    survivorId: undefined,
                                };
                            }
                            return geargrid;
                        }),
                    };
                    return nextStateWithGrids;
                }
                return nextState;
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
        // FIXME: @uller82, add a description
        case ActionTypes.UPDATE_GEARGRID: {
            if (action.payload) {

                const newState = {
                    ...state,
                    geargrids: state.geargrids.map((grid) => {
                        if (action.payload && grid.id === action.payload.id) {
                            return action.payload;
                        }
                        return grid;
                    }),
                };

                return newState;
            }
            return state;
        }
        default: return state;
    }
};

export default reducer;
