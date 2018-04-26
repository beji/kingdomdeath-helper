import { ID, IHitLocation, ISurvivor, ISurvivorBaseStat } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction, UpdateSurvivorStatAction } from "../interfaces/survivorActions";

export const updateSurvivor = (survivor: ISurvivor): UpdateSurvivorAction => ({
    payload: survivor,
    type: ActionTypes.UPDATE_SURVIVOR,
});

export const updateSurvivorStat = (Stat: ISurvivorBaseStat | IHitLocation): UpdateSurvivorStatAction => ({
    payload: Stat,
    type: ActionTypes.UPDATE_SURVIVOR_STAT,
});

export const killSurvivor = (id: ID): KillSurvivorAction => ({
    payload: id,
    type: ActionTypes.KILL_SURVIVOR,
});

export const reviveSurvivor = (id: ID): ReviveSurvivorAction => ({
    payload: id,
    type: ActionTypes.REVIVE_SURVIVOR,
});
