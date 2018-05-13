import { SetNameAction, UpdateSurvivalLimitAction } from "../interfaces/actions";
import ActionTypes from "../interfaces/actionTypes";

export const setName = (name: string): SetNameAction => ({
    payload: name,
    type: ActionTypes.SET_NAME,
});

export const updateSurvivalLimit = (survivalLimit: number): UpdateSurvivalLimitAction => ({
    payload: survivalLimit,
    type: ActionTypes.UPDATE_SURVIVAL_LIMIT,
});
