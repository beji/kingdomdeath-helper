import { Gender, ID } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { SetSurvivorGenderAction, SetSurvivorNameAction } from "../interfaces/survivorActions";

export const setSurvivorName = (id: ID, name: string): SetSurvivorNameAction => ({
    payload: { id, name },
    type: ActionTypes.SET_SURVIVOR_NAME,
});

export const setSurvivorGender = (id: ID, gender: Gender): SetSurvivorGenderAction => ({
    payload: { id, gender },
    type: ActionTypes.SET_SURVIVOR_GENDER,
});
