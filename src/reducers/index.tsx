import { Reducer } from "redux";
import initialState from "../initialstate";
import { ISettlement } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { ImportAction } from "../interfaces/importAction";
import { SetNameAction } from "../interfaces/settlementActions";
import { SetSurvivorGenderAction, SetSurvivorNameAction } from "../interfaces/survivorActions";

type Actions = AddToHuntAction | RemoveFromHuntAction | ImportAction | SetNameAction | SetSurvivorNameAction | SetSurvivorGenderAction;

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
                const updatedSurvivors = state.survivors.map((survivor) => {
                    if (survivor.id === action.payload && survivor.alive) {
                        survivor.hunting = true;
                    }
                    return survivor;
                });
                const nextState: ISettlement = {
                    survivors: updatedSurvivors,
                    ...state,
                };
                return nextState;
            }
        }
        case ActionTypes.REMOVE_FROM_HUNT: {
            const updatedSurvivors = state.survivors.map((survivor) => {
                if (survivor.id === action.payload) {
                    survivor.hunting = false;
                }
                return survivor;
            });
            const nextState: ISettlement = {
                survivors: updatedSurvivors,
                ...state,
            };
            return nextState;
        }
        case ActionTypes.IMPORT: {
            return action.payload || state;
        }
        case ActionTypes.SET_NAME: {
            if (action.payload) {
                const nextState: ISettlement = JSON.parse(JSON.stringify(state));
                nextState.name = action.payload;
                return nextState;
            }
            return state;
        }
        case ActionTypes.SET_SURVIVOR_NAME: {
            if (action.payload) {
                const { id, name } = action.payload;
                const updatedSurvivors = state.survivors.map((survivor) => {
                    if (survivor.id === id) {
                        survivor.name = name;
                    }
                    return survivor;
                });
                const nextState: ISettlement = {
                    survivors: updatedSurvivors,
                    ...state,
                };
                return nextState;
            }
            return state;
        }
        case ActionTypes.SET_SURVIVOR_GENDER: {
            if (action.payload) {
                const { id, gender } = action.payload;
                const updatedSurvivors = state.survivors.map((survivor) => {
                    if (survivor.id === id) {
                        survivor.gender = gender;
                    }
                    return survivor;
                });
                const nextState: ISettlement = {
                    survivors: updatedSurvivors,
                    ...state,
                };
                return nextState;
            }
            return state;
        }
        default: return state;
    }
};

export default reducer;
