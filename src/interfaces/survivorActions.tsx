import ActionTypes from "./actionTypes";
import IAction from "./genericAction";
import { ID } from "./generics";
import { IBaseStat, IDefenseStat, ISpecialStat, ISurvivor, WeaponArt } from "./survivor";

export type UpdateSurvivorAction = IAction<ActionTypes.UPDATE_SURVIVOR, ISurvivor>;

export type UpdateSurvivorStatAction = IAction<ActionTypes.UPDATE_SURVIVOR_STAT, { stat: IBaseStat | IDefenseStat | ISpecialStat, survivorId: ID }>;

export type KillSurvivorAction = IAction<ActionTypes.KILL_SURVIVOR, ID>;

export type ReviveSurvivorAction = IAction<ActionTypes.REVIVE_SURVIVOR, ID>;

export type CreateSurvivorAction = IAction<ActionTypes.CREATE_SURVIVOR, undefined>;

export type UpdateSurvivorWeaponArtsAction = IAction<ActionTypes.UPDATE_SURVIVOR_WEAPON_ART, { id: ID, arts: WeaponArt[] }>;
