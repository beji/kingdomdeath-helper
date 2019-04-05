import Actions, { RemoteableActions } from 'interfaces/reducer'
import ActionTypes from '../actionTypes'
import { ISettlement } from '../settlement'
import IAction from './genericAction'

export type ImportAction = IAction<ActionTypes.IMPORT, ISettlement>

export type RemoteAction = IAction<ActionTypes.REMOTE_UPDATE, RemoteableActions>
