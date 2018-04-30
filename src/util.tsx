import { BaseStats, DefenseStats, Gender } from "./interfaces";

// tslint:disable:no-bitwise

export function clone<T>(arg: T): T {
    return JSON.parse(JSON.stringify(arg));
}

export function darken(rgb: string, by: number) {
    const convertedRgb = parseInt(rgb.replace("#", ""), 16);
    const modifier = 1 - by;
    const r = Math.floor((convertedRgb >> 16) * modifier);
    const g = Math.floor((convertedRgb >> 8 & 0x00FF) * modifier);
    const b = Math.floor(convertedRgb & 0x0000FF * modifier);
    return "#" + (r << 16 | g << 8 | b).toString(16);
}

export function genderToString(gender: Gender) {
    switch (gender) {
        case Gender.male: return "Male";
        case Gender.female: return "Female";
    }
}

export function baseStatToString(basestat: BaseStats) {
    switch (basestat) {
        case BaseStats.accuracy: return "Accuracy";
        case BaseStats.evasion: return "Evasion";
        case BaseStats.luck: return "Luck";
        case BaseStats.movement: return "Movement";
        case BaseStats.speed: return "Speed";
        case BaseStats.strength: return "Strength";
    }
}

export function defenseStatToString(defenseStat: DefenseStats) {
    switch (defenseStat) {
        case DefenseStats.brain: return "Brain";
        case DefenseStats.head: return "Head";
        case DefenseStats.arms: return "Arms";
        case DefenseStats.body: return "Body";
        case DefenseStats.waist: return "Waist";
        case DefenseStats.legs: return "Legs";
        case DefenseStats.survival: return "Survival";
    }
}
