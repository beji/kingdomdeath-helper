import Actions from "interfaces/reducer";
import { IInterface } from "interfaces/state";
import { Reducer } from "redux";
import initialState from "../initialstate";
import ActionTypes from "../interfaces/actionTypes";

const reducer: Reducer<IInterface, Actions> = (state: IInterface | undefined, action: Actions): IInterface => {

    if (!state) {
        return initialState.interface;
    }

    switch (action.type) {

        case ActionTypes.SHOW_LAYER: {
            return {
                ...state,
                layer: action.payload,
            };
        }
        case ActionTypes.HIDE_LAYER: {
            return {
                ...state,
                layer: undefined,
            };
        }
        case ActionTypes.UPDATE_SURVIVOR_STAT: {
            return {
                ...state,
                layer: undefined,
            };
        }
        default: return state;
    }

};

export default reducer;
