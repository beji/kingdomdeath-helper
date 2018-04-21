import { ID } from "./generics";

const enum Gender {
    Male = "M",
    Female = "F",
}

interface IStats {
    movement: number;
    accuracy: number;
    strength: number;
    evasion: number;
    luck: number;
    speed: number;
}

interface ISurvivor {
    id: ID;
    name: string;
    gender: Gender;
    hunting: boolean;
    alive: boolean;
    baseStats: IStats;
}

export { Gender, ISurvivor, IStats };
