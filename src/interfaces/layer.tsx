import { BaseStats, DefenseStats, ID } from "interfaces";

export enum LayerType {
    simple,
    basestat,
    defensestat,
}

export interface ISimpleLayer {
    type: LayerType.simple;
    headline: string;
    content: string;
}

export interface IBaseStatLayer {
    type: LayerType.basestat;
    survivor: ID;
    stat: BaseStats;
}

export interface IDefenseStatLayer {
    type: LayerType.defensestat;
    survivor: ID;
    stat: DefenseStats;
}

export const enum LayerEvents {
    show_simple,
    hide,
}

export default interface ILayerEvent<T, P> {
    readonly type: T;
    readonly payload?: P;
}

export type SimpleLayerEvent = ILayerEvent<LayerEvents.show_simple, { headline: JSX.Element, content: JSX.Element }>;

export type HideLayerEvent = ILayerEvent<LayerEvents.hide, undefined>;
