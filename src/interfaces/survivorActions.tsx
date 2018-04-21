import ActionTypes from "./actionTypes";
import IAction from "./genericAction";
import { ID } from "./generics";
import { Gender } from "./survivor";

export type SetSurvivorNameAction = IAction<ActionTypes.SET_SURVIVOR_NAME, { id: ID, name: string }>;

export type SetSurvivorGenderAction = IAction<ActionTypes.SET_SURVIVOR_GENDER, { id: ID, gender: Gender}>;
