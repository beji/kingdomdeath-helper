import { ID } from "./generics";

export enum Gender {
    male,
    female,
}

export enum StatType {
    defense,
    base,
    special,
}

export enum BaseStats {
    accuracy,
    evasion,
    luck,
    movement,
    speed,
    strength,
}

export enum DefenseStats {
    brain,
    head,
    arms,
    body,
    waist,
    legs,
    survival,
}

export enum SpecialStats {
    huntxp,
    weapon_proficiency,
    courage,
    understanding,
}

export enum WeaponArt {
    abyssal_sadist,
    acanthus_doctor,
    ageless_apprentice,
    altered_destiny,
    ambidextrous,
    bard,
    beetle_strength,
    berserker,
    blotted_out,
    burning_ambition,
    burning_focus,
    call_shadow_tentacles,
    carapace_of_will,
    clarity_of_darkness,
    clutch_fighter,
    combo_master,
    courtly_screenwriter,
    crazed,
    crossarm_block,
    death_touch,
    defender,
    double_dash,
    eternal_will,
    extra_sense,
    fencing,
    final_fighting_art,
    frozen_star,
    hardened,
    harvestman,
    headliner,
    hellfire,
    heroic,
    immovable_object,
    impatient_fighter,
    iron_skin,
    king_of_a_thousand_battles,
    kings_step,
    last_man_standing,
    leader,
    legendary_lungs,
    lure_epilepsy,
    mammoth_hunting,
    mighty_strike,
    monster_claw_style,
    multitasker,
    necromancer,
    orator_of_death,
    otherworldly_luck,
    phantom_friend,
    propulsion_drive,
    purpose,
    red_fist,
    rhythm_chaser,
    ruthless,
    seasoned_hunter,
    silk_surgeon,
    sneak_attack,
    strategist,
    sun_eater,
    suppressed_shadow,
    swordsmans_promise,
    tenacious,
    thrill_seeker,
    timeless_eye,
    tough,
    trailblazer,
    transcended_masochist,
    trapfinder,
    trick_attack,
    true_blade,
    tumble,
    unconscious_fighter,
    unrelenting,
    vengeance,
    wardrobe_expert,
    whipmaster,
    wielder_of_giants,
    zero_presence,
}
export interface IWeaponArt {
    readonly id: WeaponArt;
    readonly name: string;
    readonly description: string;
}

export interface IDefenseStat {
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

export interface IBaseStat {
    readonly [key: string]: number | string;
    readonly gear: number;
    readonly permanent: number;
    readonly token: number;
    readonly type: StatType.base;
    readonly stat: BaseStats;
}

export interface ISpecialStat {
    readonly stat: SpecialStats;
    readonly value: number;
    readonly type: StatType.special;
}

export interface ISurvivor {
    readonly id: ID;
    readonly gridId: string | undefined;
    readonly name: string;
    readonly gender: Gender;
    readonly hunting: boolean;
    readonly alive: boolean;
    readonly baseStats: ReadonlyArray<IBaseStat>;
    readonly defenseStats: ReadonlyArray<IDefenseStat>;
    readonly huntxp: number;
    readonly specialstats: ReadonlyArray<ISpecialStat>;
    readonly weaponArts?: ReadonlyArray<IWeaponArt>;
}
