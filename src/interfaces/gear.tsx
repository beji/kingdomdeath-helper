import { ID } from "./generics";

interface IGearGrid {
    id: ID;
    survivorId?: ID;
    slots: IGridSlot[];
}

interface IGridSlot {
    content?: string;
    id: ID;
}

export { IGearGrid, IGridSlot };
