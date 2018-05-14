import { BaseStats, DefenseStats, SpecialStats, UUID } from "interfaces";

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
    survivor: UUID;
    stat: BaseStats;
}

export interface IDefenseStatLayer {
    type: LayerType.defensestat;
    survivor: UUID;
    stat: DefenseStats;
}

export interface ISpecialStatLayer {
    type: LayerType.specialstat;
    survivor: UUID;
    stat: SpecialStats;
}
