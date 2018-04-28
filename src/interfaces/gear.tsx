import { ID } from "./generics";
import { BaseStats, DefenseStats } from "./survivor";

enum Affinity {
    red = "red",
    green = "green",
    blue = "blue",
}

enum ItemType {
    armor,
    generic,
    rawhide,
    set,
    weapon,
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
    readonly id: ID;
    readonly name: string;
    readonly desc: string;
    readonly types?: ReadonlyArray<ItemType>;
    readonly stats?: ReadonlyArray<{
        readonly amount: number,
        readonly showOnCard: boolean;
        readonly type: DefenseStats | BaseStats;
    }>;
    readonly affinity?: {
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
}

export { Affinity, IGearGrid, IGridSlot, IItem, ItemType };
