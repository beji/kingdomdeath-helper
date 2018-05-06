import { BaseStats, DefenseStats, Gender, ISpecialStat, SpecialStats } from "./interfaces";

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

export function capitalize(input: string) {
    if (input.length <= 1) {
        return input.toUpperCase();
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export function specialStatToString(stat: SpecialStats) {
    switch (stat) {
        case SpecialStats.huntxp: return "Hunt XP";
        case SpecialStats.weapon_proficiency: return "Weapon Proficiency";
        default: return capitalize(SpecialStats[stat]);
    }
}
