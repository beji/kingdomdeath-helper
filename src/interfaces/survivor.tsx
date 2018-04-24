import { ID } from "./generics";

const enum Gender {
    Male = "M",
    Female = "F",
}

type THitLocation = {
    armor: number;
    lightWound: boolean;
    heavyWound: boolean;
}

interface IComplexStat {
    gear: number;
    label: string;
    permanent: number;
    token: number;
}

interface IStats {
    [key:string]: IComplexStat;
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

export { Gender, ISurvivor, IStats, IComplexStat };
