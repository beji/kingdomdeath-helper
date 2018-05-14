import { FightingArt, Gender, IBaseStat, IDefenseStat, ISpecialStat, ISurvivor, UUID } from "../interfaces";
import { CreateSurvivorAction, KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction, UpdateSurvivorFightingArtsAction, UpdateSurvivorGenderAction, UpdateSurvivorNameAction, UpdateSurvivorStatAction } from "../interfaces/actions";
import ActionTypes from "../interfaces/actionTypes";

export const updateSurvivor = (survivor: ISurvivor): UpdateSurvivorAction => ({
    payload: survivor,
    type: ActionTypes.UPDATE_SURVIVOR,
});

export const updateSurvivorStat = (stat: IBaseStat | IDefenseStat | ISpecialStat, survivorId: UUID): UpdateSurvivorStatAction => ({
    payload: {
        stat,
        survivorId,
    },
    type: ActionTypes.UPDATE_SURVIVOR_STAT,
});

export const killSurvivor = (id: UUID): KillSurvivorAction => ({
    payload: id,
    type: ActionTypes.KILL_SURVIVOR,
});

export const reviveSurvivor = (id: UUID): ReviveSurvivorAction => ({
    payload: id,
    type: ActionTypes.REVIVE_SURVIVOR,
});

export const createSurvivor = (): CreateSurvivorAction => ({
    payload: undefined,
    type: ActionTypes.CREATE_SURVIVOR,
});

export const updateSurvivorFightingArt = (id: UUID, arts: FightingArt[]): UpdateSurvivorFightingArtsAction => ({
    payload: {
        arts,
        id,
    },
    type: ActionTypes.UPDATE_SURVIVOR_WEAPON_ART,
});

export const updateSurvivorName = (id: UUID, name: string): UpdateSurvivorNameAction => ({
    payload: {
        id,
        name,
    },
    type: ActionTypes.UPDATE_SURVIVOR_NAME,
});

export const updateSurvivorGender = (id: UUID, gender: Gender): UpdateSurvivorGenderAction => ({
    payload: {
        gender,
        id,
    },
    type: ActionTypes.UPDATE_SURVIVOR_GENDER,
});
