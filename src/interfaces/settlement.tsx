import { IGearGrid, IItem } from "./gear";
import { ID } from "./generics";
import { ISurvivor } from "./survivor";

interface ISettlement {
    readonly id: ID;
    readonly name: string;
    readonly survivors: ReadonlyArray<ISurvivor>;
    readonly geargrids: ReadonlyArray<IGearGrid>;
    readonly items: ReadonlyArray<IItem>;
}

export { ISettlement };
