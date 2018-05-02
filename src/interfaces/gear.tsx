import { ID } from "./generics";
import { BaseStats, DefenseStats, StatType } from "./survivor";

enum Affinity {
    red = "red",
    green = "green",
    blue = "blue",
}

const enum AffinityTypes {
    card,
    grid,
    connect,
}

enum ItemType {
    armor,
    generic,
    rawhide,
    set,
    weapon,
    unique,
    irreplaceable,
    accessory,
    jewelry,
    item,
    bone,
    amber,
    metal,
    heavy,
    gormskin,
    other,
    mask,
    cursed,
    gorm,
    leather,
}

enum Item {
    bone_sword,
    founding_stone,
    antelope_mask,
    apostle_crown,
    armor_spikes,
    beacon_shield,
    beetle_eye_shield,
    blast_shield,
    blue_ring,
    cloth,
    cycloid_scale_hood,
    cycloid_scale_jacket,
    cycloid_scale_shoes,
    cycloid_scale_skirt,
    cycloid_scale_sleeves,
    death_mask,
    dragon_belt,
    dragon_boots,
    dragon_gloves,
    dragon_mantle,
    dragonskull_helm,
    feather_shield,
    fetorsaurus,
    flower_knight_helm,
    forsaker_mask,
    god_mask,
    gorment_boots,
    gorment_mask,
    gorment_sleeves,
    gorment_suit,
    green_boots,
    green_faulds,
    green_gloves,
    green_helm,
    green_plate,
    grinning_visage,
    hazmat_shield,
    hideous_disguise,
    knuckle_shield,
    lantern_cuirass,
    lantern_gauntlets,
    lantern_greaves,
    lantern_helm,
    lantern_mail,
    leather_boots,
    leather_bracers,
    leather_cuirass,
    leather_mask,
    leather_skirt,
    lion_headdress,
    lion_skin_cloak,
    man_mask,
    phoenix_faulds,
    phoenix_gauntlets,
    phoenix_greaves,
    phoenix_helm,
    phoenix_mask,
    phoenix_plackart,
    pirahna_helm,
    rawhide_boots,
    rawhide_gloves,
    rawhide_headband,
    rawhide_pants,
    rawhide_vest,
    regal_faulds,
    regal_gauntlet,
    regal_greaves,
    regal_helm,
    regal_plackart,
    regeneration_suit,
    round_leather_shield,
    scouts_tunic,
    scrap_shield,
    screaming_bracers,
    screaming_coat,
    screaming_horns,
    screaming_leg_warmers,
    screaming_skirt,
    silk_body_suit,
    silk_boots,
    silk_robes,
    silk_sash,
    silk_turban,
    silk_wraps,
    skull_helm,
    steel_shield,
    white_lion_boots,
    white_lion_coat,
    white_lion_gauntlets,
    white_lion_helm,
    white_lion_mask,
    white_lion_skirt,
}

interface IGearGrid {
    readonly id: ID;
    readonly survivorId?: ID;
    readonly slots: ReadonlyArray<IGridSlot>;
}

interface IGridSlot {
    readonly content?: Item;
    readonly id: ID;
    readonly affinityActive: boolean;
    readonly setActive: boolean;
}

interface IItemStat {
    readonly amount: number;
    readonly showOnCard: boolean;
    readonly type: StatType;
    readonly stat: DefenseStats | BaseStats;
}

interface IWeapon {
    readonly speed: number;
    readonly accuracy: number;
    readonly strength: number;
}

interface IItem {
    readonly id: Item;
    readonly name: string;
    readonly desc: string;
    readonly material?: string; // maybe later: ReadonlyArray<{ materialType: sting, amount: number }>
    readonly obtained?: string;
    readonly stats?: ReadonlyArray<IItemStat>;
    readonly types?: ReadonlyArray<ItemType>;
    readonly weapon?: IWeapon;
    readonly affinity?: {
        readonly [key: string]: Affinity | any;
        readonly top?: Affinity;
        readonly right?: Affinity;
        readonly bottom?: Affinity;
        readonly left?: Affinity;
        readonly bonus?: {
            readonly desc: string;
            readonly affOwn?: ReadonlyArray<Affinity>;
            readonly affGrid?: ReadonlyArray<Affinity>;
            readonly stats?: ReadonlyArray<IItemStat>;
        }
    };
    readonly set?: {
        readonly bonus?: {
            readonly desc: string;
            readonly stats?: ReadonlyArray<IItemStat>;
        };
    };
}

export { Affinity, AffinityTypes, IGearGrid, IGridSlot, IItem, Item, ItemType };
