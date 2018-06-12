import { Innovations } from "interfaces/innovations";
import { AddInnovationAction, RemoveFromHuntAction, RemoveInnovationAction, SetNameAction, UpdateSurvivalLimitAction } from "../interfaces/actions";
import ActionTypes from "../interfaces/actionTypes";

export const setName = (name: string): SetNameAction => ({
    payload: name,
    type: ActionTypes.SET_NAME,
});

export const updateSurvivalLimit = (survivalLimit: number): UpdateSurvivalLimitAction => ({
    payload: survivalLimit,
    type: ActionTypes.UPDATE_SURVIVAL_LIMIT,
});

export const addInnovation = (innovation: Innovations): AddInnovationAction => ({
    payload: innovation,
    type: ActionTypes.ADD_INNOVATION,
});

export const removeInnovation = (innovation: Innovations): RemoveInnovationAction => ({
    payload: innovation,
    type: ActionTypes.REMOVE_INNOVATION,
});
