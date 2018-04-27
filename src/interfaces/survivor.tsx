import { ID } from "./generics";

const enum Gender {
    Male = "M",
    Female = "F",
}

const enum BaseStats {
    accuracy = "Accuracy",
    evasion = "Evasion",
    luck = "Luck",
    movement = "Movement",
    speed = "Speed",
    strength = "Strength",
}

const enum DefenseStats {
    brain = "Brain",
    head = "Head",
    arms = "Arms",
    body = "Body",
    waist = "Waist",
    legs = "Legs",
    survival = "Survival",
}

interface IHitLocation {
    [key: string]: ID | string | number | boolean;
    id: ID;
    armor: number;
    label: string;
    onlyHeavyWound: boolean;
    noWounds: boolean;
    lightWound: boolean;
    heavyWound: boolean;
}

interface ISurvivorBaseStat {
    readonly [key: string]: number | string;
    readonly id: ID;
    readonly gear: number;
    readonly label: string;
    readonly permanent: number;
    readonly token: number;
}

interface IBaseStats {
    readonly [key: string]: ISurvivorBaseStat;
    readonly movement: ISurvivorBaseStat;
    readonly accuracy: ISurvivorBaseStat;
    readonly strength: ISurvivorBaseStat;
    readonly evasion: ISurvivorBaseStat;
    readonly luck: ISurvivorBaseStat;
    readonly speed: ISurvivorBaseStat;
}

interface IDefenseStats {
    readonly [key: string]: IHitLocation;
    readonly brain: IHitLocation;
    readonly head: IHitLocation;
    readonly body: IHitLocation;
    readonly arms: IHitLocation;
    readonly waist: IHitLocation;
    readonly legs: IHitLocation;
    readonly survival: IHitLocation;
}

interface ISurvivor {
    readonly id: ID;
    readonly gridId: string | undefined;
    readonly name: string;
    readonly gender: Gender;
    readonly hunting: boolean;
    readonly alive: boolean;
    readonly baseStats: IBaseStats;
    readonly defenseStats: IDefenseStats;
}

export { BaseStats, DefenseStats, Gender, IDefenseStats, IHitLocation, ISurvivor, IBaseStats, ISurvivorBaseStat };
