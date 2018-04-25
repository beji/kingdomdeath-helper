import { ID } from "./generics";
import { ISurvivor } from "./survivor";
import { IGearGrid } from "./gear";

interface ISettlement {
    id: ID;
    name: string;
    survivors: ISurvivor[];
    geargrids: IGearGrid[];
}

export { ISettlement };
