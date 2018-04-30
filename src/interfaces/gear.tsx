import { ID } from "./generics";
import { BaseStats, DefenseStats } from "./survivor";

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
    rawhide_gloves,
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
    readonly content?: string;
    readonly id: ID;
}

interface IItem {
    readonly id: Item;
    readonly name: string;
    readonly desc: string;
    readonly types?: ReadonlyArray<ItemType>;
    readonly stats?: ReadonlyArray<{
        readonly amount: number;
        readonly showOnCard: boolean;
        readonly type: DefenseStats | BaseStats;
    }>;
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
        }
    };
    readonly set?: {
        readonly bonus?: {
            readonly desc: string;
        };
    };
}

export { Affinity, AffinityTypes, IGearGrid, IGridSlot, IItem, Item, ItemType };
