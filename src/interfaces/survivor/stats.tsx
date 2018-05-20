import { UUID } from "../generics";

export enum StatType {
    defense,
    base,
    special,
}

export enum BaseStats {
    accuracy,
    evasion,
    luck,
    movement,
    speed,
    strength,
}

export enum DefenseStats {
    brain,
    head,
    arms,
    body,
    waist,
    legs,
    survival,
}

export enum SpecialStats {
    huntxp,
    weapon_proficiency,
    courage,
    understanding,
    bleed_token,
}

export interface IDefenseStat {
    readonly [key: string]: UUID | string | number | boolean;
    readonly armor: number;
    readonly modifier: number;
    readonly onlyHeavyWound: boolean;
    readonly noWounds: boolean;
    readonly lightWound: boolean;
    readonly heavyWound: boolean;
    readonly type: StatType.defense;
    readonly stat: DefenseStats;
}

export interface IBaseStat {
    readonly [key: string]: number | string;
    readonly gear: number;
    readonly permanent: number;
    readonly token: number;
    readonly type: StatType.base;
    readonly stat: BaseStats;
}

export interface ISpecialStat {
    readonly stat: SpecialStats;
    readonly value: number;
    readonly type: StatType.special;
}
