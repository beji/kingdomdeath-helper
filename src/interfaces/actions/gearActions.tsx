import ActionTypes from "../actionTypes";
import { IGearGrid } from "../gear";
import { UUID } from "../generics";
import IAction from "./genericAction";

export type SetPlayerNameAction = IAction<ActionTypes.SET_PLAYER_NAME, { name: string, gridId: UUID }>;

export type UpdateGearGridAction = IAction<ActionTypes.UPDATE_GEARGRID, IGearGrid>;

export type UpdateGearSlotAffinityAction = IAction<ActionTypes.UPDATE_GEARSLOT_AFFINITY, IGearGrid>;
