import { ISettlement } from "../interfaces";
import { ImportAction } from "../interfaces/actions";
import ActionTypes from "../interfaces/actionTypes";

export const importSettlement = (imported: ISettlement): ImportAction => ({
    payload: imported,
    type: ActionTypes.IMPORT,
});
