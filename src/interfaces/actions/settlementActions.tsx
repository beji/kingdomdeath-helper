import ActionTypes from "../actionTypes";
import IAction from "./genericAction";

export type SetNameAction = IAction<ActionTypes.SET_NAME, string>;

export type UpdateSurvivalLimitAction = IAction<ActionTypes.UPDATE_SURVIVAL_LIMIT, number>;
