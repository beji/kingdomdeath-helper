import { ID, UUID } from "../interfaces";
import { AddToHuntAction, RemoveFromHuntAction, ResetHuntAction } from "../interfaces/actions";
import ActionTypes from "../interfaces/actionTypes";

export const addToHunt = (id: ID, gridId: number): AddToHuntAction => ({
    payload: { id, gridId },
    type: ActionTypes.ADD_TO_HUNT,
});

export const removeFromHunt = (id: ID): RemoveFromHuntAction => ({
    payload: id,
    type: ActionTypes.REMOVE_FROM_HUNT,
});

export const resetHunt = (): ResetHuntAction => ({
    payload: undefined,
    type: ActionTypes.RESET_HUNT,
});
