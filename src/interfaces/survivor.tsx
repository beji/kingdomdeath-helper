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

type THitLocation = {
    armor: number;
    lightWound: boolean;
    heavyWound: boolean;
}

interface IComplexStat {
    [key: string]: number | string,
    gear: number;
    label: string;
    permanent: number;
    token: number;
}

interface IStats {
    [key: string]: IComplexStat;
    movement: IComplexStat;
    accuracy: IComplexStat;
    strength: IComplexStat;
    evasion: IComplexStat;
    luck: IComplexStat;
    speed: IComplexStat;
}

interface IDefence {
    survival: number;
    insanity: number;
    brainWound: boolean;
    head: THitLocation;
    body: THitLocation;
    arms: THitLocation;
    waist: THitLocation;
    legs: THitLocation;
}

interface ISurvivor {
    id: ID;
    name: string;
    gender: Gender;
    hunting: boolean;
    alive: boolean;
    baseStats: IStats;
}

export { BaseStats, Gender, ISurvivor, IStats, IComplexStat };
