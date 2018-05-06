import { IGearGrid } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { UpdateGearGridAction, UpdateGearSlotAffinityAction } from "../interfaces/gearActions";

export const updateGear = (gearGrid: IGearGrid): UpdateGearGridAction => ({
    payload: gearGrid,
    type: ActionTypes.UPDATE_GEARGRID,
});

export const updateGearSlotAffinity = (gearGrid: IGearGrid): UpdateGearSlotAffinityAction => ({
    payload: gearGrid,
    type: ActionTypes.UPDATE_GEARSLOT_AFFINITY,
});
