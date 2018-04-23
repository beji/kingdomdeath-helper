import ActionTypes from "./actionTypes";
import IAction from "./genericAction";
import { ID } from "./generics";
import { ISurvivor } from "./survivor";

export type UpdateSurvivorAction = IAction<ActionTypes.UPDATE_SURVIVOR, ISurvivor>;

export type KillSurvivorAction = IAction<ActionTypes.KILL_SURVIVOR, ID>;

export type ReviveSurvivorAction = IAction<ActionTypes.REVIVE_SURVIVOR, ID>;
