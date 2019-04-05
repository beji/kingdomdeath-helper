import Actions from 'interfaces/reducer'
import { Reducer } from 'redux'
import initialState from '../../initialstate'
import { DefenseStats, ISettlement } from '../../interfaces'
import ActionTypes from '../../interfaces/actionTypes'
import { clone } from '../../util'
import geargridReducer from './geargrid'
import survivorReducer from './survivor'

const secondaryReducers = [geargridReducer, survivorReducer]

const reducer: Reducer<ISettlement, Actions> = (state: ISettlement | undefined, action: Actions): ISettlement => {
    if (!state) {
        return initialState.settlement
    }

    switch (action.type) {
        case ActionTypes.IMPORT: {
            return clone(action.payload) || state
        }
        // Updates the settlement name
        case ActionTypes.SET_NAME: {
            if (action.payload && action.payload !== '') {
                return {
                    ...state,
                    name: action.payload,
                }
            }
            return state
        }
        // Updates players name on gear grid
        case ActionTypes.SET_PLAYER_NAME: {
            const { gridId, name } = action.payload
            return {
                ...state,
                geargrids: state.geargrids.map(grid => {
                    if (grid.id === gridId) {
                        return {
                            ...grid,
                            playername: name,
                        }
                    }
                    return grid
                }),
            }
        }
        // Update Survival Limit
        case ActionTypes.UPDATE_SURVIVAL_LIMIT: {
            return {
                ...state,
                survivalLimit: action.payload > 0 ? action.payload : state.survivalLimit,
            }
        }
        case ActionTypes.RESET_HUNT: {
            return {
                ...state,
                survivors: state.survivors.map(survivor => ({
                    ...survivor,
                    baseStats: survivor.baseStats.map(basestat => ({
                        ...basestat,
                        token: 0,
                    })),
                    defenseStats: survivor.defenseStats.map(defstat => ({
                        ...defstat,
                        heavyWound: false,
                        lightWound: false,
                        modifier:
                            defstat.stat === DefenseStats.brain || defstat.stat === DefenseStats.survival
                                ? defstat.modifier
                                : 0,
                    })),
                })),
            }
        }
        case ActionTypes.REMOTE_UPDATE: {
            const nextState = reducer(state, action.payload)
            if (JSON.stringify(nextState) !== JSON.stringify(state)) {
                return nextState
            }
            return state
        }
        case ActionTypes.ADD_INNOVATION: {
            const id = action.payload
            if (state.innovations.includes(id)) {
                return state
            }
            return {
                ...state,
                innovations: Array.prototype.concat(state.innovations, [id]),
            }
        }
        case ActionTypes.REMOVE_INNOVATION: {
            const id = action.payload
            if (!state.innovations.includes(id)) {
                return state
            }
            return {
                ...state,
                innovations: state.innovations.filter(innovation => innovation !== id),
            }
        }
        default:
            return secondaryReducers.reduce(
                (updatedState, secondaryReducer) => secondaryReducer(updatedState, action),
                state,
            )
    }
}

export default reducer
