import { ID } from "./generics";
import { BaseStats, DefenseStats } from "./survivor";

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
    stats?: {
        amount: number,
        type: BaseStats | DefenseStats;
    };
}

export { IGearGrid, IGridSlot, IItem };
