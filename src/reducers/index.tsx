import { Reducer } from "redux";
import initialState from "../initialstate";
import { ISettlement, ISurvivor } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { ImportAction } from "../interfaces/importAction";
import { SetNameAction } from "../interfaces/settlementActions";
import { SetSurvivorGenderAction, SetSurvivorNameAction } from "../interfaces/survivorActions";
import { clone } from "../util";

type Actions = AddToHuntAction | RemoveFromHuntAction | ImportAction | SetNameAction | SetSurvivorNameAction | SetSurvivorGenderAction;

function generateWithUpdatedSurvivors(state: ISettlement, mapfunc: (survivor: ISurvivor) => ISurvivor) {
    const updatedSurvivors = state.survivors.map(mapfunc);
    const nextState: ISettlement = {
        survivors: updatedSurvivors,
        ...state,
    };
    return nextState;
}

const reducer: Reducer<ISettlement> = (state: ISettlement | undefined, action: Actions): ISettlement => {

    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case ActionTypes.ADD_TO_HUNT: {
            if (state.survivors.filter((survivor) => survivor.hunting).length >= 4) {
                alert("You can not bring more than four survivors to a hunt!");
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
            if (action.payload) {
                const nextState = clone(state);
                nextState.name = action.payload;
                return nextState;
            }
            return state;
        }
        case ActionTypes.SET_SURVIVOR_NAME: {
            if (action.payload) {
                const { id, name } = action.payload;
                return generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === id) {
                        survivor.name = name;
                    }
                    return survivor;
                });
            }
            return state;
        }
        case ActionTypes.SET_SURVIVOR_GENDER: {
            if (action.payload) {
                const { id, gender } = action.payload;
                return generateWithUpdatedSurvivors(state, (survivor) => {
                    if (survivor.id === id) {
                        survivor.gender = gender;
                    }
                    return survivor;
                });
            }
            return state;
        }
        default: return state;
    }
};

export default reducer;
