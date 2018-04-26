import ActionTypes from "./actionTypes";
import IAction from "./genericAction";

export type AddToHuntAction = IAction<ActionTypes.ADD_TO_HUNT, string>;

export type RemoveFromHuntAction = IAction<ActionTypes.REMOVE_FROM_HUNT, string>;
