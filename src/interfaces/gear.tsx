import { ID, UUID } from "./generics";
import { Item, ItemType, Set } from "./ItemEnums";
import { BaseStats, DefenseStats, StatType } from "./survivor";

enum Affinity {
    red,
    green,
    blue,
}

const enum AffinityTypes {
    card,
    grid,
    connect,
}

interface IGearGrid {
    readonly affinities: Affinity[];
    readonly id: ID;
    readonly playername?: string;
    readonly survivorId?: UUID;
    readonly slots: ReadonlyArray<IGridSlot>;
}

interface IGridSlot {
    readonly content?: Item;
    readonly id: ID;
    readonly affinities?: ReadonlyArray<Affinity>;
    readonly affinityActive: boolean;
    readonly setActive: boolean;
    readonly sets?: ReadonlyArray<Set>;
}

interface IItemStat {
    readonly amount: number;
    readonly type: StatType;
    readonly stat: DefenseStats | BaseStats;
}

interface IWeapon {
    readonly speed: number;
    readonly accuracy: number;
    readonly strength: number;
}

interface IAffinity {
    readonly color: Affinity;
    readonly connection: AffinityTypes;
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
            readonly require: ReadonlyArray<IAffinity>
            readonly stats?: ReadonlyArray<IItemStat>;
        }
    };
    readonly set?: {
        readonly id: Set;
    };
}

interface ISet {
    readonly id: Set;
    readonly bonus?: {
        readonly desc: string;
        readonly stats?: ReadonlyArray<IItemStat>;
    };
    readonly name: string;
}

export { Affinity, AffinityTypes, IAffinity, IGearGrid, IGridSlot, IItem, IItemStat, Item, ItemType, ISet, Set };
