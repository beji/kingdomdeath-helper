import ActionTypes from '../actionTypes'
import { IGearGrid } from '../gear'
import { ID } from '../generics'
import IAction from './genericAction'

export type SetPlayerNameAction = IAction<ActionTypes.SET_PLAYER_NAME, { name: string; gridId: ID }>

export type UpdateGearGridAction = IAction<ActionTypes.UPDATE_GEARGRID, IGearGrid>

export type UpdateGearSlotAffinityAction = IAction<ActionTypes.UPDATE_GEARSLOT_AFFINITY, IGearGrid>

export type UpdateGearSlotGearSetAction = IAction<ActionTypes.UPDATE_GEARSLOT_GEARSET, IGearGrid>
