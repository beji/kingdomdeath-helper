import { ID } from "./generics";

export enum Gender {
    male,
    female,
}

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
}

export interface IDefenseStat {
    readonly [key: string]: ID | string | number | boolean;
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

export interface ISurvivor {
    readonly id: ID;
    readonly gridId: string | undefined;
    readonly name: string;
    readonly gender: Gender;
    readonly hunting: boolean;
    readonly alive: boolean;
    readonly baseStats: ReadonlyArray<IBaseStat>;
    readonly defenseStats: ReadonlyArray<IDefenseStat>;
    readonly huntxp: number;
    readonly specialstats: ReadonlyArray<ISpecialStat>;
}
