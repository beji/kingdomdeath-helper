import ActionTypes from 'interfaces/actionTypes'
import Actions from 'interfaces/reducer'
import { SocketMessages } from 'interfaces/socketMessages'
import socket from './clientsocket'
import { getURLParam } from './util'

export const socketMiddleware = (store: any) => (next: any) => (action: Actions) => {
    const roomId = getURLParam('id')
    if (roomId && roomId !== '' && action.type !== ActionTypes.REMOTE_UPDATE) {
        console.log('emitting atomic_state_update with', action)
        socket.emit(SocketMessages.STATE_UPDATE, {
            payload: action,
            room: roomId,
        })
    }
    next(action)
}
