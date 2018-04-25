import { ID } from "./generics";

interface IGearGrid {
    id: ID;
    survivorId?: ID;
    slots: IGridSlot[];
}

interface IGridSlot {
    id: ID;
    content: string | null;
}

export { IGearGrid, IGridSlot };
