import { IBaseStatLayer, IDefenseStatLayer, ISimpleLayer, ISpecialStatLayer } from "interfaces";
import { HideLayerAction, ShowLayerAction } from "interfaces/actions";
import ActionTypes from "interfaces/actionTypes";

export const showLayer = (layer: ISimpleLayer | IBaseStatLayer | IDefenseStatLayer | ISpecialStatLayer): ShowLayerAction => ({
    payload: layer,
    type: ActionTypes.SHOW_LAYER,
});

export const hideLayer = (): HideLayerAction => ({
    payload: undefined,
    type: ActionTypes.HIDE_LAYER,
});
