import { ID } from "./generics";
import { GearSet, Item, ItemType } from "./ItemEnums";
import { BaseStats, DefenseStats, StatType } from "./survivor";

export enum Affinity {
    red,
    green,
    blue,
}

export const enum AffinityTypes {
    card,
    grid,
    connect,
}

export interface IGearGrid {
    readonly affinities: ReadonlyArray<Affinity>;
    readonly gearSets?: ReadonlyArray<GearSet>;
    readonly id: ID;
    readonly playername?: string;
    readonly survivorId?: ID;
    readonly slots: ReadonlyArray<IGridSlot>;
}

export interface IGridSlot {
    readonly content?: Item;
    readonly id: ID;
    readonly affinities?: ReadonlyArray<Affinity>;
    readonly affinityActive?: boolean;
    readonly setActive?: boolean;
    readonly sets?: ReadonlyArray<GearSet>;
}

export interface IItemStat {
    readonly amount: number;
    readonly type: StatType;
    readonly stat: DefenseStats | BaseStats;
}

export interface IWeapon {
    readonly speed: number;
    readonly accuracy: number;
    readonly strength: number;
}

export interface IAffinity {
    readonly color: Affinity;
    readonly connection: AffinityTypes;
}

export interface IItem {
    readonly id: Item;
    readonly name: string;
    readonly desc: string;
    readonly material?: string; // maybe later: ReadonlyArray<{ materialType: sting, amount: number }>
    readonly obtained?: string;
    readonly stats?: ReadonlyArray<IItemStat>;
    readonly types?: ReadonlyArray<ItemType>;
    readonly weapon?: IWeapon;
    readonly affinity?: {
        readonly [key: string]: Affinity | any;
        readonly top?: Affinity;
        readonly right?: Affinity;
        readonly bottom?: Affinity;
        readonly left?: Affinity;
        readonly bonus?: {
            readonly desc: string;
            readonly require: ReadonlyArray<IAffinity>
            readonly stats?: ReadonlyArray<IItemStat>;
        }
    };
    readonly set?: {
        readonly id: GearSet;
    };
}

export interface IGearSet {
    readonly id: GearSet;
    readonly bonus?: IGearSetBonus;
    readonly name: string;
}

export interface IGearSetBonus {
  readonly desc: string;
  readonly stats?: ReadonlyArray<IItemStat>;
}

export { Item, ItemType, GearSet };
