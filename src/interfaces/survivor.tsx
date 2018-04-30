import { ID } from "./generics";

enum Gender {
    male,
    female,
}

enum StatType {
    defense,
    base,
}

enum BaseStats {
    accuracy,
    evasion,
    luck,
    movement,
    speed,
    strength,
}

enum DefenseStats {
    brain,
    head,
    arms,
    body,
    waist,
    legs,
    survival,
}

interface IDefenseStat {
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

interface IBaseStat {
    readonly [key: string]: number | string;
    readonly gear: number;
    readonly permanent: number;
    readonly token: number;
    readonly type: StatType.base;
    readonly stat: BaseStats;
}

interface ISurvivor {
    readonly id: ID;
    readonly gridId: string | undefined;
    readonly name: string;
    readonly gender: Gender;
    readonly hunting: boolean;
    readonly alive: boolean;
    readonly baseStats: ReadonlyArray<IBaseStat>;
    readonly defenseStats: ReadonlyArray<IDefenseStat>;
}

export { BaseStats, DefenseStats, Gender, IDefenseStat, ISurvivor, IBaseStat, StatType };
