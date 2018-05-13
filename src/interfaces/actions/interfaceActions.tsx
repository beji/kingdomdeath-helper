import { IBaseStatLayer, ISimpleLayer } from "interfaces";
import IAction from "interfaces/actions/genericAction";
import ActionTypes from "interfaces/actionTypes";

export type ShowLayerAction = IAction<ActionTypes.SHOW_LAYER, ISimpleLayer | IBaseStatLayer>;

export type HideLayerAction = IAction<ActionTypes.HIDE_LAYER, undefined>;
