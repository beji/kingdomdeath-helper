import ActionTypes from "../interfaces/actionTypes";
import { SetNameAction } from "../interfaces/settlementActions";

export const setName = (name: string): SetNameAction => ({
    payload: name,
    type: ActionTypes.SET_NAME,
});
