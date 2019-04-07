import ActionTypes from 'interfaces/actionTypes'
import Actions from 'interfaces/reducer'
import { SocketMessages } from 'interfaces/socketMessages'
import socket from './clientsocket'
import { getURLParam } from './util'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const socketMiddleware = () => (next: any) => (action: Actions) => {
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
