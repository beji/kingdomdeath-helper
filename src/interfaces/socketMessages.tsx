import { RemoteableActions } from 'interfaces/reducer'

export const enum SocketMessages {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  JOIN = 'join_room',
  STATE_UPDATE = 'atomic_state_update',
  FULL_SYNC = 'full_sync',
}

export interface IRoomMessage {
  room: string
}

export interface IStatusUpdateMessage {
  room: string
  payload: RemoteableActions
}
