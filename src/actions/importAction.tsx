import { ISettlement } from "../interfaces";
import ActionTypes from "../interfaces/actionTypes";
import { ImportAction } from "../interfaces/importAction";

export const importSettlement = (imported: ISettlement): ImportAction => ({
    payload: imported,
    type: ActionTypes.IMPORT,
});
