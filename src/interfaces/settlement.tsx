import { IGearGrid } from "./gear";
import { ID } from "./generics";
import { ISurvivor } from "./survivor";

interface ISettlement {
    id: ID;
    name: string;
    survivors: ISurvivor[];
    geargrids: IGearGrid[];
}

export { ISettlement };
