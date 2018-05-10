import { IGearGrid } from "./gear";
import { ID } from "./generics";
import { ISurvivor } from "./survivor";

interface ISettlement {
    readonly id: ID;
    readonly name: string;
    readonly survivalLimit: number;
    readonly survivors: ReadonlyArray<ISurvivor>;
    readonly geargrids: ReadonlyArray<IGearGrid>;
}

export { ISettlement };
