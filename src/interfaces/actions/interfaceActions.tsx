import { IBaseStatLayer, IDefenseStatLayer, ISimpleLayer, ISpecialStatLayer } from "interfaces";
import IAction from "interfaces/actions/genericAction";
import ActionTypes from "interfaces/actionTypes";
import { IDisorderListLayer, IFightingartListLayer, IGearListLayer, IWeaponProficiencyLayer } from "interfaces/layer";

export type ShowLayerAction = IAction<ActionTypes.SHOW_LAYER, ISimpleLayer | IBaseStatLayer | IDefenseStatLayer | ISpecialStatLayer | IDisorderListLayer | IFightingartListLayer | IGearListLayer | IWeaponProficiencyLayer>;

export type HideLayerAction = IAction<ActionTypes.HIDE_LAYER, undefined>;
