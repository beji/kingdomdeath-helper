import { IDisorder, IWeaponProficiency } from "interfaces";
import { ID } from "../generics";
import { IFightingArt } from "./fightingarts";
import { IBaseStat, IDefenseStat, ISpecialStat } from "./stats";

export * from "./disorder";
export * from "./fightingarts";
export * from "./stats";

export enum Gender {
    male,
    female,
}

export interface ISurvivor {
    readonly [key: string]: any; // UUID | string | number | boolean | undefined | ReadonlyArray<IBaseStat> | ReadonlyArray<IDefenseStat> | ReadonlyArray<ISpecialStat> | ReadonlyArray<IFightingArt>;
    readonly id: ID;
    readonly gridId: string | undefined;
    readonly name: string;
    readonly gender: Gender;
    readonly hunting: boolean;
    readonly alive: boolean;
    readonly skipNextHunt: boolean;
    readonly lifetimeReroll: boolean;
    readonly baseStats: ReadonlyArray<IBaseStat>;
    readonly defenseStats: ReadonlyArray<IDefenseStat>;
    readonly huntxp: number;
    readonly specialstats: ReadonlyArray<ISpecialStat>;
    readonly fightingArts?: ReadonlyArray<IFightingArt>;
    readonly disorders?: ReadonlyArray<IDisorder>;
    readonly weaponProficiency?: IWeaponProficiency;

}
