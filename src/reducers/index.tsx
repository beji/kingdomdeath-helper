import { Reducer } from "redux";
import initialState from "../initialstate";
import { IHitLocation, ISettlement, ISurvivor, ISurvivorBaseStat } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { ImportAction } from "../interfaces/importAction";
import { SetNameAction } from "../interfaces/settlementActions";
import { KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction, UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { clone } from "../util";

type Actions = AddToHuntAction | RemoveFromHuntAction | ImportAction | SetNameAction | UpdateSurvivorAction | UpdateSurvivorStatAction | KillSurvivorAction | ReviveSurvivorAction;

function generateWithUpdatedSurvivors(state: ISettlement, mapfunc: (survivor: ISurvivor) => ISurvivor) {
    const updatedSurvivors = state.survivors.map(mapfunc);
    const nextState = clone(state);
    nextState.survivors = updatedSurvivors;
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
                        survivor.hunting = true;
                        survivor.gridId = action.payload.gridId.toString();
                        if (Object.keys(oldStats).length > 0) {
                            Object.keys(survivor.baseStats).forEach((key) => {
                                survivor.baseStats[key].gear = oldStats[key].gear;
                            });
                        }
                    } else if (survivor.id === survivorId) {
                        survivor.hunting = false;
                        survivor.gridId = undefined;
                        Object.keys(survivor.baseStats).forEach((key) => {
                            survivor.baseStats[key].gear = 0;
                        });
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
                        survivor.hunting = false;
                        state.geargrids[parseInt(survivor.gridId as string, 10)].survivorId = undefined;
                        survivor.gridId = undefined;
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
                const nextState = clone(state);
                nextState.name = action.payload;
                return nextState;
            }
            return state;
        }
        case ActionTypes.UPDATE_SURVIVOR: {
            if (action.payload) {
                const newSurvivor = action.payload as ISurvivor;
                const nextState = generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === newSurvivor.id && newSurvivor.name !== "") {
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
                    Object.keys(survivor.baseStats).map((statKey) => {
                        if (survivor.baseStats[statKey].id === newStat.id) {
                            survivor.baseStats[statKey] = newStat as ISurvivorBaseStat;
                        }
                    });
                    Object.keys(survivor.defenseStats).map((statKey) => {
                        if (survivor.defenseStats[statKey].id === newStat.id) {
                            survivor.defenseStats[statKey] = newStat as IHitLocation;
                        }
                    });
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
                        survivor.alive = false;
                        survivor.hunting = false;
                        survivor.gridId = undefined;
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
        }
        case ActionTypes.REVIVE_SURVIVOR: {
            if (action.payload) {
                return generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === action.payload) {
                        survivor.alive = true;
                    }
                    return survivor;
                });
            }
        }
        default: return state;
    }
};

export default reducer;
