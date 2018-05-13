import { FightingArt, IBaseStat, ID, IDefenseStat, ISpecialStat, ISurvivor } from "../interfaces";
import { CreateSurvivorAction, KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction, UpdateSurvivorFightingArtsAction, UpdateSurvivorStatAction } from "../interfaces/actions";
import ActionTypes from "../interfaces/actionTypes";

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

export const updateSurvivorFightingArt = (id: ID, arts: FightingArt[]): UpdateSurvivorFightingArtsAction => ({
    payload: {
        arts,
        id,
    },
    type: ActionTypes.UPDATE_SURVIVOR_WEAPON_ART,
});
