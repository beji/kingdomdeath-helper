import { BaseStats, DefenseStats, ID, SpecialStats } from "interfaces";

export enum LayerType {
    simple,
    basestat,
    defensestat,
    specialstat,
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

export interface ISpecialStatLayer {
    type: LayerType.specialstat;
    survivor: ID;
    stat: SpecialStats;
}
