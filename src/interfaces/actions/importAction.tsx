import ActionTypes from "../actionTypes";
import { ISettlement } from "../settlement";
import IAction from "./genericAction";

export type ImportAction = IAction<ActionTypes.IMPORT, ISettlement>;
