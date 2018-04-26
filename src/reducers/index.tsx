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
            if (state.survivors.filter((survivor) => survivor.hunting).length >= 4) {
                if (typeof window !== "undefined" && window.alert) {
                    alert("You can not bring more than four survivors to a hunt!");
                }
                return state;
            } else {
                return generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === action.payload && survivor.alive) {
                        survivor.hunting = true;
                    }
                    return survivor;
                });
            }
        }
        case ActionTypes.REMOVE_FROM_HUNT: {
            return generateWithUpdatedSurvivors(state, (survivor) => {
                if (survivor.id === action.payload) {
                    survivor.hunting = false;
                }
                return survivor;
            });
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
                    const statSurvivor = clone(survivor);
                    Object.keys(statSurvivor.baseStats).map((statKey) => {
                        if (statSurvivor.baseStats[statKey].id === newStat.id) {
                            statSurvivor.baseStats[statKey] = newStat as ISurvivorBaseStat;
                        }
                    });
                    Object.keys(statSurvivor.defenseStats).map((statKey) => {
                        if (statSurvivor.defenseStats[statKey].id === newStat.id) {
                            statSurvivor.defenseStats[statKey] = newStat as IHitLocation;
                        }
                    });
                    return statSurvivor;
                });
            }
            return state;
        }
        case ActionTypes.KILL_SURVIVOR: {
            if (action.payload) {
                return generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === action.payload) {
                        survivor.alive = false;
                        survivor.hunting = false;
                    }
                    return survivor;
                });
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
