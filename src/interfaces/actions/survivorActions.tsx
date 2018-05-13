import ActionTypes from "../actionTypes";
import { ID } from "../generics";
import { FightingArt, IBaseStat, IDefenseStat, ISpecialStat, ISurvivor } from "../survivor";
import IAction from "./genericAction";

export type UpdateSurvivorAction = IAction<ActionTypes.UPDATE_SURVIVOR, ISurvivor>;

export type UpdateSurvivorStatAction = IAction<ActionTypes.UPDATE_SURVIVOR_STAT, { stat: IBaseStat | IDefenseStat | ISpecialStat, survivorId: ID }>;

export type KillSurvivorAction = IAction<ActionTypes.KILL_SURVIVOR, ID>;

export type ReviveSurvivorAction = IAction<ActionTypes.REVIVE_SURVIVOR, ID>;

export type CreateSurvivorAction = IAction<ActionTypes.CREATE_SURVIVOR, undefined>;

export type UpdateSurvivorFightingArtsAction = IAction<ActionTypes.UPDATE_SURVIVOR_WEAPON_ART, { id: ID, arts: FightingArt[] }>;
