import { IGearGrid, UUID } from "../interfaces";
import { SetPlayerNameAction, UpdateGearGridAction, UpdateGearSlotAffinityAction } from "../interfaces/actions";
import ActionTypes from "../interfaces/actionTypes";

export const setPlayerName = (name: string, gridId: UUID): SetPlayerNameAction => ({
    payload: {
        gridId,
        name,
    },
    type: ActionTypes.SET_PLAYER_NAME,
});

export const updateGear = (gearGrid: IGearGrid): UpdateGearGridAction => ({
    payload: gearGrid,
    type: ActionTypes.UPDATE_GEARGRID,
});

export const updateGearSlotAffinity = (gearGrid: IGearGrid): UpdateGearSlotAffinityAction => ({
    payload: gearGrid,
    type: ActionTypes.UPDATE_GEARSLOT_AFFINITY,
});
