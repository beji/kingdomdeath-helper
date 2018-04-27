import { ID } from "./generics";
import { BaseStats, DefenseStats } from "./survivor";

enum Affinity {
    red = "red",
    green = "green",
    blue = "blue",
}

interface IGearGrid {
    id: ID;
    survivorId?: ID;
    slots: IGridSlot[];
}

interface IGridSlot {
    content?: string;
    id: ID;
}

interface IItem {
    id: ID;
    name: string;
    desc: string;
    stats?: Array<{
        amount: number,
        type: DefenseStats | BaseStats;
        showOnCard: boolean;
    }>;
    affinity?: {
        top?: Affinity;
        right?: Affinity;
        bottom?: Affinity;
        left?: Affinity;
    };
}

export { IGearGrid, IGridSlot, IItem };
