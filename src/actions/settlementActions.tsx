import { Innovations } from 'interfaces/innovations'
import { AddInnovationAction, RemoveInnovationAction, SetNameAction, UpdateSurvivalLimitAction, SetLanternYearAction } from '../interfaces/actions'
import ActionTypes from '../interfaces/actionTypes'

export const setName = (name: string): SetNameAction => ({
  payload: name,
  type: ActionTypes.SET_NAME,
})

export const updateSurvivalLimit = (survivalLimit: number): UpdateSurvivalLimitAction => ({
  payload: survivalLimit,
  type: ActionTypes.UPDATE_SURVIVAL_LIMIT,
})

export const addInnovation = (innovation: Innovations): AddInnovationAction => ({
  payload: innovation,
  type: ActionTypes.ADD_INNOVATION,
})

export const removeInnovation = (innovation: Innovations): RemoveInnovationAction => ({
  payload: innovation,
  type: ActionTypes.REMOVE_INNOVATION,
})

export const setLanternYear = (year: number): SetLanternYearAction => ({
  payload: year,
  type: ActionTypes.SET_LANTERNYEAR,
})
