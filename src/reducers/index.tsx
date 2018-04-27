import { Reducer } from "redux";
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
        case ActionTypes.ADD_TO_HUNT: {
            if (action.payload) {
                const { survivorId } = state.geargrids[action.payload.gridId];

                const oldSurvivor = state.survivors.find((survivor) => survivor.id === survivorId);
                let oldStats: any = {};

                if (oldSurvivor) {
                    oldStats = clone(oldSurvivor.baseStats);
                }

                const nextState = generateWithUpdatedSurvivors(state, (survivor) => {
                    if (action.payload && survivor.id === action.payload.id && survivor.alive) {
                        const newState = {
                            ...survivor,
                            gridId: action.payload.gridId.toString(),
                            hunting: true,
                        };
                        if (Object.keys(oldStats).length > 0) {

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
                    } else if (survivor.id === survivorId) {
                        const newState: ISurvivor = {
                            ...survivor,
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
                        return newState;
                    }
                    return survivor;
                });
                nextState.geargrids[action.payload.gridId].survivorId = action.payload.id;
                return nextState;
            }
            return state;
        }
        case ActionTypes.REMOVE_FROM_HUNT: {
            if (action.payload) {
                return generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === action.payload) {
                        const nextState = {
                            ...survivor,
                            gridId: undefined,
                            hunting: false,
                        };
                        state.geargrids[parseInt(survivor.gridId as string, 10)].survivorId = undefined;
                    }
                    return survivor;
                });
            }
            return state;
        }
        case ActionTypes.IMPORT: {
            return action.payload || state;
        }
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
        case ActionTypes.UPDATE_SURVIVOR: {
            if (action.payload) {
                const newSurvivor = action.payload as ISurvivor;
                const nextState = generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === newSurvivor.id && newSurvivor.name !== "") {
                        if (survivor.name === DEFAULT_SURVIVOR_NAME && newSurvivor.name !== DEFAULT_SURVIVOR_NAME) {
                            newSurvivor.defenseStats.survival.armor += 1;
                        }
                        return clone(newSurvivor);
                    }
                    return survivor;
                });
                return nextState;
            }
            return state;
        }
        case ActionTypes.UPDATE_SURVIVOR_STAT: {
            if (action.payload) {
                const newStat = action.payload;
                return generateWithUpdatedSurvivors(state, (survivor) => {

                    const statKeyForBaseStat = Object.keys(survivor.baseStats).find((statKey) => {
                        return survivor.baseStats[statKey].id === newStat.id;
                    });

                    if (statKeyForBaseStat) {
                        return {
                            ...survivor,
                            baseStats: {
                                ...survivor.baseStats,
                                [statKeyForBaseStat]: newStat as ISurvivorBaseStat,
                            },
                        };
                    }

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
        case ActionTypes.KILL_SURVIVOR: {
            if (action.payload) {
                const gridElement = state.geargrids.find((grid) => grid.survivorId === action.payload);
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
                if (gridElement) {
                    nextState.geargrids = nextState.geargrids.map((geargrid) => {
                        if (geargrid.id === gridElement.id) {
                            geargrid.survivorId = undefined;
                        }
                        return geargrid;
                    });
                }
                return nextState;
            }
            return state;
        }
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
