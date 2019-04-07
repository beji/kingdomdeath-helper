import items, { set as gearSets } from '../data/ItemDataHelper'
import { GearSet, IGearGrid, IGearSetBonus, IItem, IItemStat, ISettlement, ISurvivor, Item } from '../interfaces'

export function generateWithUpdatedSurvivors(state: ISettlement, mapfunc: (survivor: ISurvivor) => ISurvivor): ISettlement {
  const updatedSurvivors = state.survivors.map(mapfunc)
  return {
    ...state,
    survivors: updatedSurvivors,
  }
}

export function generateWithUpdatedGrid(state: ISettlement, mapfunc: (grid: IGearGrid) => IGearGrid): ISettlement {
  const updatedGrids = state.geargrids.map(mapfunc)
  return {
    ...state,
    geargrids: updatedGrids,
  }
}

export function getGearItem(itemId: Item | undefined): IItem | undefined {
  if (itemId) {
    return items.find(item => item.id === itemId)
  } else {
    return undefined
  }
}

export function getGearSetItems(setId: GearSet): Item[] {
  return items
    .filter(item => item.set && item.set.id === setId)
    .map(item => item.id)
    .sort()
}

export function getGearSetBonus(setId: GearSet): IGearSetBonus | undefined {
  return gearSets.filter(gearSet => gearSet.id === setId)[0].bonus
}

export function updateStatOnSurvior(stat: IItemStat, survivor: ISurvivor): ISurvivor {
  const updatedSurvivor = { ...survivor }
  const statTypes = ['defenseStats', 'baseStats', 'specialstats'] // Array sorted by StatType enum
  const fieldToAddName = ['armor', 'gear', 'value'] // Array sorted by StatType enum
  if (updatedSurvivor[statTypes[stat.type]]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedSurvivor[statTypes[stat.type]].some((survivorStat: any) => {
      if (stat.stat === survivorStat.stat) {
        survivorStat[fieldToAddName[stat.type]] += stat.amount
      }
      return stat.stat === survivorStat.stat
    })
  }
  return updatedSurvivor
}
