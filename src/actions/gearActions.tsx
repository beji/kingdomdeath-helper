import ActionTypes from "../interfaces/actionTypes";
import { IGearGrid } from "../interfaces/gear";
import { UpdateGearGridAction } from "../interfaces/gearActions";

export const updateGear = (gearGrid: IGearGrid): UpdateGearGridAction => ({
    payload: gearGrid,
    type: ActionTypes.UPDATE_GEARGRID,
});
