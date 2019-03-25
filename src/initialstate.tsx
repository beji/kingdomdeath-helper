import { Innovations } from "interfaces/innovations";
import uuid from "uuid/v4";
import { BaseStats, DefenseStats, Gender, IBaseStat, ID, IDefenseStat, IGearGrid, ISpecialStat, IState, ISurvivor, SpecialStats, StatType } from "./interfaces";

export const DEFAULT_SURVIVOR_NAME = "Rename me to get +1 Survival";

const getSurvivorBaseStat = (stat: BaseStats): IBaseStat => ({
    gear: 0,
    permanent: stat === BaseStats.movement ? 5 : 0,
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
    getHitLocation(DefenseStats.head, true),
    getHitLocation(DefenseStats.legs, false),
    getHitLocation(DefenseStats.survival, false, true),
    getHitLocation(DefenseStats.waist, false),
]).sort((a, b) => (a.stat - b.stat));

const getSpecialStat = (stat: SpecialStats): ISpecialStat => ({
    stat,
    type: StatType.special,
    value: 0,
});

const getSpecialStats = (): ISpecialStat[] => ([
    getSpecialStat(SpecialStats.bleed_token),
    getSpecialStat(SpecialStats.courage),
    getSpecialStat(SpecialStats.huntxp),
    getSpecialStat(SpecialStats.understanding),
    getSpecialStat(SpecialStats.weapon_proficiency),
]).sort((a, b) => (a.stat - b.stat));

const initialSurvivorCount = process.env.NODE_ENV === "production" ? 4 : 8;

const survivors: ReadonlyArray<ISurvivor> = Array.apply(null, { length: initialSurvivorCount }).map(Number.call, Number).map((n: number) => {
    return {
        alive: n < 4 || n % 3 === 0,
        baseStats: getBaseStats(),
        defenseStats: getDefense(),
        gender: n % 2 === 0 ? Gender.male : Gender.female,
        gridId: n < 4 ? n : undefined,
        hunting: n < 4,
        huntxp: 0,
        id: n,
        lifetimeReroll: false,
        name: process.env.NODE_ENV === "production" ? DEFAULT_SURVIVOR_NAME : `Survivor ${n}`,
        skipNextHunt: false,
        specialstats: getSpecialStats(),
    } as ISurvivor;
});

const huntingSurvivors: ID[] = survivors.filter((survivor) => survivor.hunting).map((survivor) => survivor.id);

const geargrids: ReadonlyArray<IGearGrid> = Array.apply(null, { length: 4 }).map(Number.call, Number).map((n: number) => {
    return {
        affinities: [],
        gearSets: [],
        id: n,
        playername: `Slot ${n + 1}`,
        slots: Array.apply(null, { length: 9 }).map(Number.call, Number).map((x: number) => {
            return {
                id: x,
            };
        }),
        survivorId: huntingSurvivors[n],
    } as IGearGrid;
});

const initialState: IState = {
    interface: {
        layer: undefined,
    },
    settlement: {
        geargrids,
        id: uuid(),
        innovations: [Innovations.language],
        name: "Everybody-will-die-town",
        survivalLimit: 1,
        survivors,
    },
};

export function newSurvivor(id: number): ISurvivor {
    return {
        alive: true,
        baseStats: getBaseStats(),
        defenseStats: getDefense(),
        gender: Gender.male,
        gridId: undefined,
        hunting: false,
        huntxp: 0,
        id,
        lifetimeReroll: false,
        name: DEFAULT_SURVIVOR_NAME,
        skipNextHunt: false,
        specialstats: getSpecialStats(),
    };
}

export default initialState;
