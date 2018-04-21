import { ID } from "./generics";
import { ISurvivor } from "./survivor";

interface ISettlement {
    id: ID;
    name: string;
    survivors: ISurvivor[];
}

export { ISettlement };
