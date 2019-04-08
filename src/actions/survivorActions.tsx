import { Disorders, FightingArt, Gender, IBaseStat, ID, IDefenseStat, ISpecialStat, ISurvivor, WeaponProficiency } from '../interfaces'
import {
  CreateSurvivorAction,
  KillSurvivorAction,
  RemoveSurvivorAction,
  ReviveSurvivorAction,
  UpdateSurvivorAction,
  UpdateSurvivorDisordersAction,
  UpdateSurvivorFightingArtsAction,
  UpdateSurvivorGenderAction,
  UpdateSurvivorNameAction,
  UpdateSurvivorStatAction,
  UpdateSurvivorWeaponProficiencyAction,
  UpdateSurvivorWeaponProficiencyLevelAction,
} from '../interfaces/actions'
import ActionTypes from '../interfaces/actionTypes'

export const updateSurvivor = (survivor: ISurvivor): UpdateSurvivorAction => ({
  payload: survivor,
  type: ActionTypes.UPDATE_SURVIVOR,
})

export const updateSurvivorStat = (stat: IBaseStat | IDefenseStat | ISpecialStat, survivorId: ID): UpdateSurvivorStatAction => ({
  payload: {
    stat,
    survivorId,
  },
  type: ActionTypes.UPDATE_SURVIVOR_STAT,
})

export const killSurvivor = (id: ID): KillSurvivorAction => ({
  payload: id,
  type: ActionTypes.KILL_SURVIVOR,
})

export const reviveSurvivor = (id: ID): ReviveSurvivorAction => ({
  payload: id,
  type: ActionTypes.REVIVE_SURVIVOR,
})

export const createSurvivor = (): CreateSurvivorAction => ({
  payload: undefined,
  type: ActionTypes.CREATE_SURVIVOR,
})

export const updateSurvivorFightingArt = (id: ID, arts: FightingArt[]): UpdateSurvivorFightingArtsAction => ({
  payload: {
    arts,
    id,
  },
  type: ActionTypes.UPDATE_SURVIVOR_FIGHTNG_ART,
})

export const updateSurvivorName = (id: ID, name: string): UpdateSurvivorNameAction => ({
  payload: {
    id,
    name,
  },
  type: ActionTypes.UPDATE_SURVIVOR_NAME,
})

export const updateSurvivorGender = (id: ID, gender: Gender): UpdateSurvivorGenderAction => ({
  payload: {
    gender,
    id,
  },
  type: ActionTypes.UPDATE_SURVIVOR_GENDER,
})

export const updateSurvivorDisorders = (id: ID, disorders: Disorders[]): UpdateSurvivorDisordersAction => ({
  payload: {
    disorders,
    id,
  },
  type: ActionTypes.UPDATE_DISORDERS,
})

export const removeSurvivor = (id: ID): RemoveSurvivorAction => ({
  payload: id,
  type: ActionTypes.REMOVE_SURVIVOR,
})

export const updateWeaponProficiency = (survivorId: ID, proficiency?: WeaponProficiency): UpdateSurvivorWeaponProficiencyAction => ({
  payload: {
    proficiency,
    survivorId,
  },
  type: ActionTypes.UPDATE_WEAPON_PROFICIENCY,
})

export const updateSurvivorWeaponProficiencyLevel = (id: ID, level: number): UpdateSurvivorWeaponProficiencyLevelAction => ({
  payload: {
    id,
    level,
  },
  type: ActionTypes.UPDATE_WEAPON_PROFICIENCY_LEVEL,
})
