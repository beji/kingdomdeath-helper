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

const enum ItemType {
    armor = "armor",
    generic = "generic",
    rawhide = "rawhide",
    set = "set",
    weapon = "weapon",
}

const enum Item {
    rawhide_gloves = 1, // starting at 0 renders no card for rawhide_gloves
    rawhide_vest,
    rawhide_headband,
    rawhide_pants,
    rawhide_boots,
    bone_sword,
    founding_stone,
    cloth,
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

interface IItem {
    readonly id: Item;
    readonly name: string;
    readonly desc: string;
    readonly types?: ReadonlyArray<ItemType>;
    readonly stats?: ReadonlyArray<IItemStat>;
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
