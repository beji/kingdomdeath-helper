import { ISurvivor } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";

export const updateSurvivor = (survivor: ISurvivor): UpdateSurvivorAction => ({
    payload: survivor,
    type: ActionTypes.UPDATE_SURVIVOR,
});
