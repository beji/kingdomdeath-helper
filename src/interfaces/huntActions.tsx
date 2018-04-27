import ActionTypes from "./actionTypes";
import IAction from "./genericAction";

export type AddToHuntAction = IAction<ActionTypes.ADD_TO_HUNT, { id: string, gridId: number }>;

export type RemoveFromHuntAction = IAction<ActionTypes.REMOVE_FROM_HUNT, string>;
