import ActionTypes from "../actionTypes";
import { UUID } from "../generics";
import { FightingArt, Gender, IBaseStat, IDefenseStat, ISpecialStat, ISurvivor } from "../survivor";
import IAction from "./genericAction";

export type UpdateSurvivorAction = IAction<ActionTypes.UPDATE_SURVIVOR, ISurvivor>;

export type UpdateSurvivorNameAction = IAction<ActionTypes.UPDATE_SURVIVOR_NAME, { id: UUID, name: string }>;

export type UpdateSurvivorGenderAction = IAction<ActionTypes.UPDATE_SURVIVOR_GENDER, { id: UUID, gender: Gender }>;

export type UpdateSurvivorStatAction = IAction<ActionTypes.UPDATE_SURVIVOR_STAT, { stat: IBaseStat | IDefenseStat | ISpecialStat, survivorId: UUID }>;

export type KillSurvivorAction = IAction<ActionTypes.KILL_SURVIVOR, UUID>;

export type ReviveSurvivorAction = IAction<ActionTypes.REVIVE_SURVIVOR, UUID>;

export type CreateSurvivorAction = IAction<ActionTypes.CREATE_SURVIVOR, undefined>;

export type UpdateSurvivorFightingArtsAction = IAction<ActionTypes.UPDATE_SURVIVOR_WEAPON_ART, { id: UUID, arts: FightingArt[] }>;
