import ActionTypes from "../interfaces/actionTypes";
import { SetNameAction, UpdateSurvivalLimitAction } from "../interfaces/settlementActions";

export const setName = (name: string): SetNameAction => ({
    payload: name,
    type: ActionTypes.SET_NAME,
});

export const updateSurvivalLimit = (survivalLimit: number): UpdateSurvivalLimitAction => ({
    payload: survivalLimit,
    type: ActionTypes.UPDATE_SURVIVAL_LIMIT,
});
