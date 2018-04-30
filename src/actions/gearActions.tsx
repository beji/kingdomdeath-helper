import { IGearGrid } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { UpdateGearGridAction } from "../interfaces/gearActions";

export const updateGear = (gearGrid: IGearGrid): UpdateGearGridAction => ({
    payload: gearGrid,
    type: ActionTypes.UPDATE_GEARGRID,
});
