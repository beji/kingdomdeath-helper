import { Innovations } from 'interfaces/innovations'
import ActionTypes from '../actionTypes'
import IAction from './genericAction'

export type SetNameAction = IAction<ActionTypes.SET_NAME, string>

export type UpdateSurvivalLimitAction = IAction<ActionTypes.UPDATE_SURVIVAL_LIMIT, number>

export type AddInnovationAction = IAction<ActionTypes.ADD_INNOVATION, Innovations>

export type RemoveInnovationAction = IAction<ActionTypes.REMOVE_INNOVATION, Innovations>
