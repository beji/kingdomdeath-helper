import { ID } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";

export const addToHunt = (id: ID): AddToHuntAction => ({
    payload: id,
    type: ActionTypes.ADD_TO_HUNT,
});

export const removeFromHunt = (id: ID): RemoveFromHuntAction => ({
    payload: id,
    type: ActionTypes.REMOVE_FROM_HUNT,
});
