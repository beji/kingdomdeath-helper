import armor from "data/final/armor.json";
import items from "data/final/items.json";
import weapon from "data/final/weapon.json";
import uuid from "uuid/v4";
import { Affinity, BaseStats, DefenseStats, Gender, IBaseStat, ID, IDefenseStat, IGearGrid, IItem, ISettlement, ISurvivor, Item, ItemType, StatType } from "./interfaces";

export const DEFAULT_SURVIVOR_NAME = "Rename me to get +1 Survival";

const getSurvivorBaseStat = (stat: BaseStats): IBaseStat => ({
    gear: 0,
    permanent: 0,
    stat,
    token: 0,
    type: StatType.base,
});

const getBaseStats = (): IBaseStat[] => ([
    getSurvivorBaseStat(BaseStats.accuracy),
    getSurvivorBaseStat(BaseStats.evasion),
    getSurvivorBaseStat(BaseStats.luck),
    getSurvivorBaseStat(BaseStats.movement),
    getSurvivorBaseStat(BaseStats.speed),
    getSurvivorBaseStat(BaseStats.strength),
]).sort((a, b) => (a.stat - b.stat));

const getHitLocation = (stat: DefenseStats, onlyHeavyWound: boolean, noWounds: boolean = false): IDefenseStat => ({
    armor: 0,
    heavyWound: false,
    lightWound: false,
    modifier: 0,
    noWounds,
    onlyHeavyWound,
    stat,
    type: StatType.defense,
});

const getDefense = (): IDefenseStat[] => ([
    getHitLocation(DefenseStats.arms, false),
    getHitLocation(DefenseStats.body, false),
    getHitLocation(DefenseStats.brain, true),
    getHitLocation(DefenseStats.head, false),
    getHitLocation(DefenseStats.legs, false),
    getHitLocation(DefenseStats.survival, false, true),
    getHitLocation(DefenseStats.waist, false),
]).sort((a, b) => (a.stat - b.stat));

const survivors: ReadonlyArray<ISurvivor> = Array.apply(null, { length: 8 }).map(Number.call, Number).map((n: number) => {
    return {
        alive: n < 4 || n % 3 === 0,
        baseStats: getBaseStats(),
        defenseStats: getDefense(),
        gender: n % 2 === 0 ? Gender.male : Gender.female,
        gridId: n < 4 ? n : undefined,
        hunting: n < 4,
        id: uuid(),
        name: `Survivor ${n}`,
    };
});

const huntingSurvivors: ID[] = survivors.filter((survivor) => survivor.hunting).map((survivor) => survivor.id);

const geargrids: ReadonlyArray<IGearGrid> = Array.apply(null, { length: 4 }).map(Number.call, Number).map((n: number) => {
    return {
        id: uuid(),
        slots: Array.apply(null, { length: 9 }).map(() => {
            return {
                id: uuid(),
            };
        }),
        survivorId: huntingSurvivors[n],
    };
});
/*const items: ReadonlyArray<IItem> = [
    {
        desc: "Fancy Sword that breaks",
        id: Item.bone_sword,
        name: "Bone Sword",
        types: [
            ItemType.weapon,
        ],
    } as IItem,
    {
        desc: "Survivor Lendenschurz",
        id: Item.cloth,
        name: "Cloth",
        stats: [
            {
                amount: 1,
                showOnCard: true,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
    },
    {
        desc: "Throw to win",
        id: Item.founding_stone,
        name: "Founding Stone",
    },
    {
        affinity: {
            bottom: Affinity.blue,
        },
        desc: "",
        id: Item.rawhide_headband,
        name: "Rawhide Headband",
        stats: [
            {
                amount: 1,
                showOnCard: true,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.rawhide,
        ],
    },
    {
        affinity: {
            bonus: {
                affOwn: [
                    Affinity.blue,
                    Affinity.red,
                ],
                desc: "+1 Evasion",
            },
            right: Affinity.red,
            top: Affinity.blue,
        },
        desc: "",
        id: Item.rawhide_vest,
        name: "Rawhide Vest",
        stats: [
            {
                amount: 1,
                showOnCard: true,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 1,
                showOnCard: true,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.rawhide,
        ],
    },
    {
        affinity: {
            left: Affinity.red,
        },
        desc: "When you depart, gain +1 survival",
        id: Item.rawhide_gloves,
        name: "Rawhide Gloves",
        stats: [
            {
                amount: 1,
                showOnCard: true,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.rawhide,
        ],
    },
    {
        desc: "",
        id: Item.rawhide_pants,
        name: "Rawhide Pants",
        stats: [
            {
                amount: 1,
                showOnCard: true,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.rawhide,
        ],
    },
    {
        desc: "When you depart, gain +1 survival",
        id: Item.rawhide_boots,
        name: "Rawhide Boots",
        stats: [
            {
                amount: 1,
                showOnCard: true,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.rawhide,
        ],
    },
];*/

const initialState: ISettlement = {
    geargrids,
    id: uuid(),
    items: armor.concat(weapon, items),
    name: "Everybody-will-die-town",
    survivors,
};

export function newSurvivor(): ISurvivor {
    return {
        alive: true,
        baseStats: getBaseStats(),
        defenseStats: getDefense(),
        gender: Gender.male,
        gridId: undefined,
        hunting: false,
        id: uuid(),
        name: DEFAULT_SURVIVOR_NAME,
    };
}

export default initialState;
