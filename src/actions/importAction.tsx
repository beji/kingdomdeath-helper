import { RemoteableActions } from 'interfaces/reducer'
import { ISettlement } from '../interfaces'
import { ImportAction, RemoteAction } from '../interfaces/actions'
import ActionTypes from '../interfaces/actionTypes'

export const importSettlement = (imported: ISettlement): ImportAction => ({
    payload: imported,
    type: ActionTypes.IMPORT,
})

export const remoteAction = (action: RemoteableActions): RemoteAction => ({
    payload: action,
    type: ActionTypes.REMOTE_UPDATE,
})
