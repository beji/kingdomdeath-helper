import { IGearGrid } from "../interfaces";
import { UpdateGearGridAction, UpdateGearSlotAffinityAction } from "../interfaces/actions";
import ActionTypes from "../interfaces/actionTypes";

export const updateGear = (gearGrid: IGearGrid): UpdateGearGridAction => ({
    payload: gearGrid,
    type: ActionTypes.UPDATE_GEARGRID,
});

export const updateGearSlotAffinity = (gearGrid: IGearGrid): UpdateGearSlotAffinityAction => ({
    payload: gearGrid,
    type: ActionTypes.UPDATE_GEARSLOT_AFFINITY,
});
