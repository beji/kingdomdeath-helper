import { IBaseStat, ID, IDefenseStat, ISpecialStat, ISurvivor } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { CreateSurvivorAction, KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction, UpdateSurvivorStatAction } from "../interfaces/survivorActions";

export const updateSurvivor = (survivor: ISurvivor): UpdateSurvivorAction => ({
    payload: survivor,
    type: ActionTypes.UPDATE_SURVIVOR,
});

export const updateSurvivorStat = (stat: IBaseStat | IDefenseStat | ISpecialStat, survivorId: ID): UpdateSurvivorStatAction => ({
    payload: {
        stat,
        survivorId,
    },
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

export const createSurvivor = (): CreateSurvivorAction => ({
    payload: undefined,
    type: ActionTypes.CREATE_SURVIVOR,
});
