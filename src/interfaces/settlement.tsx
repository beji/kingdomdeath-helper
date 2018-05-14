import { IGearGrid } from "./gear";
import { UUID } from "./generics";
import { ISurvivor } from "./survivor";

interface ISettlement {
    readonly id: UUID;
    readonly name: string;
    readonly survivalLimit: number;
    readonly survivors: ReadonlyArray<ISurvivor>;
    readonly geargrids: ReadonlyArray<IGearGrid>;
}

export { ISettlement };
