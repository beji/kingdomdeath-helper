import items from "../data/ItemDataHelper";
import { IGearGrid, IItem, ISettlement, ISurvivor, Item } from "../interfaces";

export function generateWithUpdatedSurvivors(state: ISettlement, mapfunc: (survivor: ISurvivor) => ISurvivor) {
  const updatedSurvivors = state.survivors.map(mapfunc);
  return {
      ...state,
      survivors: updatedSurvivors,
  };
}

export function generateWithUpdatedGrid(state: ISettlement, mapfunc: (grid: IGearGrid) => IGearGrid) {
  const updatedGrids = state.geargrids.map(mapfunc);
  return {
      ...state,
      geargrids: updatedGrids,
  };
}

export function getGearItem(itemId: Item | undefined): IItem | undefined {
  if ( itemId ) {
    return items.find((item) => item.id === itemId);
  } else {
    return undefined;
  }
}