import { UUID } from "interfaces";
import ActionTypes from "../actionTypes";
import IAction from "./genericAction";

export type AddToHuntAction = IAction<ActionTypes.ADD_TO_HUNT, { id: UUID, gridId: number }>;

export type RemoveFromHuntAction = IAction<ActionTypes.REMOVE_FROM_HUNT, UUID>;

export type ResetHuntAction = IAction<ActionTypes.RESET_HUNT, undefined>;
