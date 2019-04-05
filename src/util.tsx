import { BaseStats, DefenseStats, Gender, ISettlement, ISpecialStat, SpecialStats } from "./interfaces";

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

    return "#" + ((r < 0 ? 0 : r) << 16 | (g < 0 ? 0 : g) << 8 | (b < 0 ? 0 : b)).toString(16);
}

export function lighten(rgb: string, by: number) {
    const convertedRgb = parseInt(rgb.replace("#", ""), 16);
    const modifier = 1 + by;
    const r = Math.floor((convertedRgb >> 16) * modifier);
    const g = Math.floor((convertedRgb >> 8 & 0x00FF) * modifier);
    const b = Math.floor(convertedRgb & 0x0000FF * modifier);
    return "#" + ((r > 255 ? 255 : r) << 16 | (g > 255 ? 255 : g) << 8 | (b > 255 ? 255 : b)).toString(16);
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
        case SpecialStats.bleed_token: return "Bleed Token";
        default: return capitalize(SpecialStats[stat]);
    }
}

export function getNewSurvivorID(state: ISettlement) {
    return state.survivors.length;
}

export function getURLParam(name: string, urlFragment: string = window.location.href) {
    return decodeURIComponent(
        urlFragment.replace(
            new RegExp(
                "^(?:.*[&\\?\\#]" + encodeURI(name).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

export const deduplicate = <T extends any>(arr: ReadonlyArray<T>): ReadonlyArray<T> => (
    arr.filter((item, idx) => idx === arr.indexOf(item))
);
