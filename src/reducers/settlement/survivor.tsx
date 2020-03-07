import { Reducer } from 'redux'
import disorderList from '../../../data/final/disorder.json'
import fightingArts from '../../../data/final/fightingarts'
import { removeFromHunt, updateGear } from '../../actions'
import initialState, { DEFAULT_SURVIVOR_NAME, newSurvivor } from '../../initialstate'
import { DefenseStats, Disorders, FightingArt, IGearGrid, ISettlement, ISurvivor, StatType } from '../../interfaces'
import ActionTypes from '../../interfaces/actionTypes'
import Actions from '../../interfaces/reducer'
import { clone, deduplicate, getNewSurvivorID } from '../../util'
import { generateWithUpdatedSurvivors } from '../_helper'
import gearReducer from './geargrid'

const reducer: Reducer<ISettlement, Actions> = (state: ISettlement | undefined, action: Actions): ISettlement => {
  if (!state) {
    return initialState.settlement
  }

  switch (action.type) {
    // Set a survivor to the specified hunting slot, this will also migrate any stats gained from gear in the current slot to the survivor and remove the current hunter from the slot
    case ActionTypes.ADD_TO_HUNT: {
      // The slot might be occupied by a survivor, that survivor will loose their stat bonuses gained by the gear
      const { survivorId } = state.geargrids[action.payload.gridId]

      const oldSurvivor = state.survivors.find(survivor => survivor.id === survivorId)
      const oldStats = oldSurvivor ? clone(oldSurvivor.baseStats) : []

      // If the survivor is currently hunting they might be just switching their hunting spot
      // we need to keep them from occupying two spots at the same time
      // so we just remove them from the hunt before (re-)adding them
      const statePhaseOne = reducer(state, removeFromHunt(action.payload.id))

      // If the targeted hunting spot is currently occupied the old hunter needs to get removed as well
      const baseState = oldSurvivor ? reducer(statePhaseOne, removeFromHunt(oldSurvivor.id)) : statePhaseOne

      const nextState = generateWithUpdatedSurvivors(baseState, survivor => {
        // mark the new survivor as hunting and move the gear stats from the old survivor to the new one
        if (action.payload && survivor.id === action.payload.id && survivor.alive) {
          const newState = {
            ...survivor,
            gridId: action.payload.gridId.toString(),
            hunting: true,
          }

          // The non-gear baseStats stay the same
          const newBaseStats = survivor.baseStats.map(basestat => {
            const oldStat = oldStats.find(oldstat => oldstat.stat === basestat.stat)
            if (oldStat) {
              return {
                ...basestat,
                gear: oldStat.gear,
              }
            }
            return basestat
          })

          return {
            ...newState,
            baseStats: newBaseStats,
          }
        }
        return survivor
      })
      // Now the grid has to reference the new survivor
      let newGrid: IGearGrid | undefined
      const updatedGearGrids = nextState.geargrids.map((geargrid, idx) => {
        if (action.payload && idx === action.payload.gridId) {
          newGrid = {
            ...geargrid,
            survivorId: action.payload.id,
          }
          return newGrid
        }
        return geargrid
      })

      const returnState: ISettlement = {
        ...nextState,
        geargrids: updatedGearGrids,
      }

      if (typeof newGrid !== 'undefined') {
        return gearReducer(returnState, updateGear(newGrid))
      }
      return returnState
    }
    // Remove a survivor from the hunt
    case ActionTypes.REMOVE_FROM_HUNT: {
      let idxToUpdate = -1

      // Set the survivor to not hunting and also remove the reference to the gear grid, it only applies to hunters
      const stateWithUpdatedSurvivor = generateWithUpdatedSurvivors(state, survivor => {
        if (survivor.id === action.payload) {
          idxToUpdate = parseInt(survivor.gridId as string, 10)
          return {
            ...survivor,
            // The non-gear baseStats stay the same
            baseStats: survivor.baseStats.map(basestat => {
              return {
                ...basestat,
                gear: 0,
              }
            }),
            // A non-hunting survivor can't have any gear and therefore no armor
            defenseStats: survivor.defenseStats.map(defenseStat => ({
              ...defenseStat,
              armor: 0,
            })),
            gridId: undefined,
            hunting: false,
          }
        }
        return survivor
      })
      // Update the gear grid to no longer reference the survivor
      if (idxToUpdate !== -1) {
        return {
          ...stateWithUpdatedSurvivor,
          geargrids: state.geargrids.map((geargrid, idx) => {
            if (idx === idxToUpdate) {
              return {
                ...geargrid,
                survivorId: undefined,
              }
            }
            return geargrid
          }),
        }
      }
      return stateWithUpdatedSurvivor
    }
    case ActionTypes.UPDATE_SURVIVOR: {
      console.warn('UPDATE_SURVIVOR should be deprecated, rework whatever calls this!')
      const survivorToUpdate = action.payload as ISurvivor
      return generateWithUpdatedSurvivors(state, survivor => {
        // Survivors gain one free survival on the first rename (faked by checking for the DEFAULT_SURVIVOR_NAME, could be cheated)
        if (survivor.id === survivorToUpdate.id && survivorToUpdate.name !== '') {
          if (survivor.name === DEFAULT_SURVIVOR_NAME && survivorToUpdate.name !== DEFAULT_SURVIVOR_NAME) {
            return {
              ...survivorToUpdate,
              defenseStats: survivorToUpdate.defenseStats.map(defensestat => {
                if (defensestat.stat === DefenseStats.survival) {
                  return {
                    ...defensestat,
                    armor: defensestat.armor + 1,
                  }
                }
                return defensestat
              }),
            }
          }
          return clone(survivorToUpdate)
        }
        return survivor
      })
    }
    // Updates the survivor base- and defenseStats
    case ActionTypes.UPDATE_SURVIVOR_STAT: {
      const newStat = action.payload
      return generateWithUpdatedSurvivors(state, survivor => {
        const { stat, survivorId } = newStat
        // At this point the update could be for a baseStat or a hitLocation, we don't know yet

        if (survivor.id === survivorId) {
          if (stat.type === StatType.base) {
            return {
              ...survivor,
              baseStats: survivor.baseStats.map(basestat => {
                if (basestat.stat === stat.stat) {
                  return clone(stat)
                }
                return basestat
              }),
            }
          } else if (stat.type === StatType.defense) {
            return {
              ...survivor,
              defenseStats: survivor.defenseStats.map(basestat => {
                if (basestat.stat === stat.stat) {
                  return clone(stat)
                }
                return basestat
              }),
            }
          } else if (stat.type === StatType.special) {
            return {
              ...survivor,
              specialstats: survivor.specialstats.map(specialstat => {
                if (specialstat.stat === stat.stat) {
                  return clone(stat)
                }
                return specialstat
              }),
            }
          }
        }
        return survivor
      })
    }
    // Kill a survivor. This should remove them from the hunt and update the gear grid accordingly
    case ActionTypes.KILL_SURVIVOR: {
      const baseState = reducer(state, removeFromHunt(action.payload))
      // Mark the survivor as dead (or not alive, to be more correct)
      return generateWithUpdatedSurvivors(baseState, survivor => {
        if (survivor.id === action.payload) {
          return {
            ...survivor,
            alive: false,
            gridId: undefined,
            hunting: false,
          }
        }
        return survivor
      })
    }
    // Revives a dead survivor
    case ActionTypes.REVIVE_SURVIVOR: {
      return generateWithUpdatedSurvivors(state, survivor => {
        if (survivor.id === action.payload) {
          return {
            ...survivor,
            alive: true,
          }
        }
        return survivor
      })
    }
    // Creates a new survivor
    case ActionTypes.CREATE_SURVIVOR: {
      return {
        ...state,
        survivors: state.survivors.concat(newSurvivor(getNewSurvivorID(state))),
      }
    }
    case ActionTypes.UPDATE_SURVIVOR_NAME: {
      const { id, name } = action.payload
      if (name !== '') {
        return generateWithUpdatedSurvivors(state, survivor => {
          if (survivor.id === id) {
            if (survivor.name === DEFAULT_SURVIVOR_NAME && name !== DEFAULT_SURVIVOR_NAME) {
              return {
                ...survivor,
                defenseStats: survivor.defenseStats.map(defensestat => {
                  if (defensestat.stat === DefenseStats.survival) {
                    return {
                      ...defensestat,
                      armor: defensestat.armor + 1,
                    }
                  }
                  return defensestat
                }),
                name,
              }
            }
            return {
              ...survivor,
              name,
            }
          }
          return survivor
        })
      }
      return state
    }
    case ActionTypes.UPDATE_SURVIVOR_GENDER: {
      const { id, gender } = action.payload
      return generateWithUpdatedSurvivors(state, survivor => {
        if (survivor.id === id) {
          return {
            ...survivor,
            gender,
          }
        }
        return survivor
      })
    }
    case ActionTypes.UPDATE_SURVIVOR_FIGHTNG_ART: {
      const { id, arts: artsWithDuplicates } = action.payload
      const arts = deduplicate(artsWithDuplicates)
      if (arts.length <= 3) {
        return {
          ...state,
          survivors: state.survivors.map(survivor => {
            if (survivor.id === id) {
              return {
                ...survivor,
                fightingArts: arts.map((art: FightingArt) => fightingArts[art]),
              }
            }
            return survivor
          }),
        }
      }
      return state
    }
    case ActionTypes.UPDATE_DISORDERS: {
      const { id } = action.payload
      const disorders = deduplicate(action.payload.disorders)
      if (disorders.length <= 3) {
        return {
          ...state,
          survivors: state.survivors.map(survivor => {
            if (survivor.id === id) {
              return {
                ...survivor,
                disorders: deduplicate(disorders).map((disorder: Disorders) => disorderList[disorder]),
              }
            }
            return survivor
          }),
        }
      }
      return state
    }
    case ActionTypes.REMOVE_SURVIVOR: {
      const id = action.payload
      if (typeof state.survivors.find(survivor => survivor.id === id) === 'undefined') {
        return state
      }
      return {
        ...state,
        survivors: state.survivors.filter(survivor => survivor.id !== id),
      }
    }
    case ActionTypes.UPDATE_WEAPON_PROFICIENCY_LEVEL: {
      const { id, level } = action.payload
      return {
        ...state,
        survivors: state.survivors.map(survivor => {
          if (survivor.id === id) {
            return {
              ...survivor,
              weaponproficiency: {
                ...survivor.weaponproficiency,
                value: level,
              },
            }
          }
          return survivor
        }),
      }
    }
    case ActionTypes.UPDATE_WEAPON_PROFICIENCY: {
      const { survivorId, proficiency } = action.payload
      return {
        ...state,
        survivors: state.survivors.map(survivor => {
          if (survivor.id === survivorId) {
            return {
              ...survivor,
              weaponproficiency: {
                ...survivor.weaponproficiency,
                proficiency,
              },
            }
          }
          return survivor
        }),
      }
    }
    default:
      return state
  }
}

export default reducer
