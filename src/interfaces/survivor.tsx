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

const enum DefenceStats {
    brain = "Brain",
    head = "Head",
    arms = "Arms",
    body = "Body",
    waist = "Waist",
    legs = "Legs",
}

interface IHitLocation {
    [key: string]: ID | string | number | boolean;
    id: ID;
    armor: number;
    label: string;
    onlyHeavyWound: boolean;
    lightWound: boolean;
    heavyWound: boolean;
}

interface ISurvivorBaseStat {
    [key: string]: number | string;
    id: ID;
    gear: number;
    label: string;
    permanent: number;
    token: number;
}

interface IStats {
    [key: string]: ISurvivorBaseStat;
    movement: ISurvivorBaseStat;
    accuracy: ISurvivorBaseStat;
    strength: ISurvivorBaseStat;
    evasion: ISurvivorBaseStat;
    luck: ISurvivorBaseStat;
    speed: ISurvivorBaseStat;
}

interface IDefence {
    [key: string]: IHitLocation;
    brain: IHitLocation;
    head: IHitLocation;
    body: IHitLocation;
    arms: IHitLocation;
    waist: IHitLocation;
    legs: IHitLocation;
}

interface ISurvivor {
    id: ID;
    gridId: string | null;
    name: string;
    gender: Gender;
    hunting: boolean;
    alive: boolean;
    baseStats: IStats;
    defenceStats: IDefence;
    survival: number;
}

export { BaseStats, DefenceStats, Gender, IDefence, IHitLocation, ISurvivor, IStats, ISurvivorBaseStat };
