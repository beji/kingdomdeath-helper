import Actions from "interfaces/reducer";
import { IInterface } from "interfaces/state";
import initialState from "../initialstate";
import ActionTypes from "../interfaces/actionTypes";
import { clone } from "../util";

const reducer = (state: IInterface | undefined, action: Actions): IInterface => {

    if (!state) {
        return initialState.interface;
    }

    switch (action.type) {

        case ActionTypes.SHOW_LAYER: {
            if (action.payload) {
                return {
                    ...state,
                    layer: clone(action.payload),
                };
            }
            return state;
        }
        case ActionTypes.HIDE_LAYER: {
            return {
                ...state,
                layer: undefined,
            };
        }
        default: return state;
    }

};

export default reducer;
