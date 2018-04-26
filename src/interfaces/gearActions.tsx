import ActionTypes from "./actionTypes";
import { IGearGrid } from "./gear";
import IAction from "./genericAction";

export type UpdateGearGridAction = IAction<ActionTypes.UPDATE_GEARGRID, IGearGrid>;
