import ActionTypes from "./actionTypes";
import IAction from "./genericAction";
import { ISurvivor } from "./survivor";

export type UpdateSurvivorAction = IAction<ActionTypes.UPDATE_SURVIVOR, ISurvivor>;
