import ActionTypes from '../actionTypes'
import { ID } from '../generics'
import { Disorders, FightingArt, Gender, IBaseStat, IDefenseStat, ISpecialStat, ISurvivor } from '../survivor'
import IAction from './genericAction'

export type UpdateSurvivorAction = IAction<ActionTypes.UPDATE_SURVIVOR, ISurvivor>

export type UpdateSurvivorNameAction = IAction<ActionTypes.UPDATE_SURVIVOR_NAME, { id: ID; name: string }>

export type UpdateSurvivorGenderAction = IAction<ActionTypes.UPDATE_SURVIVOR_GENDER, { id: ID; gender: Gender }>

export type UpdateSurvivorStatAction = IAction<
    ActionTypes.UPDATE_SURVIVOR_STAT,
    { stat: IBaseStat | IDefenseStat | ISpecialStat; survivorId: ID }
>

export type KillSurvivorAction = IAction<ActionTypes.KILL_SURVIVOR, ID>

export type ReviveSurvivorAction = IAction<ActionTypes.REVIVE_SURVIVOR, ID>

export type CreateSurvivorAction = IAction<ActionTypes.CREATE_SURVIVOR, undefined>

export type UpdateSurvivorFightingArtsAction = IAction<
    ActionTypes.UPDATE_SURVIVOR_FIGHTNG_ART,
    { id: ID; arts: FightingArt[] }
>

export type UpdateSurvivorDisordersAction = IAction<ActionTypes.UPDATE_DISORDERS, { id: ID; disorders: Disorders[] }>

export type RemoveSurvivorAction = IAction<ActionTypes.REMOVE_SURVIVOR, ID>
