import ActionTypes from "./actionTypes";
import IAction from "./genericAction";
import { ISettlement } from "./settlement";

export type ImportAction = IAction<ActionTypes.IMPORT, ISettlement>;
