import { Reducer } from "redux";
import initialState from "../initialstate";
import { ISettlement, ISurvivor } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { ImportAction } from "../interfaces/importAction";
import { SetNameAction } from "../interfaces/settlementActions";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";
import { clone } from "../util";

type Actions = AddToHuntAction | RemoveFromHuntAction | ImportAction | SetNameAction | UpdateSurvivorAction;

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
        default: return state;
    }
};

export default reducer;
