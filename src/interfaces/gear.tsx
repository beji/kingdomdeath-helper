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
    content?: string;
    id: ID;
}

interface IItem {
    id: ID;
    name: string;
    desc: string;
    types?: ItemType[];
    stats?: Array<{
        amount: number,
        showOnCard: boolean;
        type: DefenseStats | BaseStats;
    }>;
    affinity?: {
        top?: Affinity;
        right?: Affinity;
        bottom?: Affinity;
        left?: Affinity;
        bonus?: {
            desc: string;
            affOwn?: Affinity[];
            affGrid?: Affinity[];
        }
    };
}

export { Affinity, IGearGrid, IGridSlot, IItem, ItemType };
