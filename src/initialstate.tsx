import uuid from "uuid/v4";
import { Affinity, Gender, ID, IGearGrid, IItem, ISettlement, ISurvivor, ISurvivorBaseStat, Item, ItemType } from "./interfaces";
import { BaseStats, DefenseStats, IBaseStats, IDefenseStats, IHitLocation } from "./interfaces/survivor";

export const DEFAULT_SURVIVOR_NAME = "Rename me to get +1 Survival";

const getSurvivorBaseStat = (label: BaseStats): ISurvivorBaseStat => ({
    gear: 0,
    id: uuid(),
    label,
    permanent: 0,
    token: 0,
});

const getBaseStats = (): IBaseStats => ({
    accuracy: getSurvivorBaseStat(BaseStats.accuracy),
    evasion: getSurvivorBaseStat(BaseStats.evasion),
    luck: getSurvivorBaseStat(BaseStats.luck),
    movement: getSurvivorBaseStat(BaseStats.movement),
    speed: getSurvivorBaseStat(BaseStats.speed),
    strength: getSurvivorBaseStat(BaseStats.strength),
});

const getHitLocation = (label: DefenseStats, onlyHeavyWound: boolean, noWounds: boolean = false): IHitLocation => ({
    armor: 0,
    heavyWound: false,
    id: uuid(),
    label,
    lightWound: false,
    noWounds,
    onlyHeavyWound,
});

const getDefense = (): IDefenseStats => ({
    arms: getHitLocation(DefenseStats.arms, false),
    body: getHitLocation(DefenseStats.body, false),
    brain: getHitLocation(DefenseStats.brain, true),
    head: getHitLocation(DefenseStats.head, false),
    legs: getHitLocation(DefenseStats.legs, false),
    survival: getHitLocation(DefenseStats.survival, false, true),
    waist: getHitLocation(DefenseStats.waist, false),
});

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
const items: ReadonlyArray<IItem> = [
    {
        desc: "Fancy Sword that breaks",
        id: Item.bone_sword,
        name: "Bone Sword",
        types: [
            ItemType.weapon,
        ],
    },
    {
        desc: "Survivor Lendenschurz",
        id: Item.cloth,
        name: "Cloth",
        stats: [
            {
                amount: 1,
                showOnCard: true,
                type: DefenseStats.waist,
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
                type: DefenseStats.head,
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
                type: DefenseStats.body,
            },
            {
                amount: 1,
                showOnCard: true,
                type: DefenseStats.waist,
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
                type: DefenseStats.arms,
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
                type: DefenseStats.waist,
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
                type: DefenseStats.legs,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.rawhide,
        ],
    },
];

const initialState: ISettlement = {
    geargrids,
    id: uuid(),
    items,
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
