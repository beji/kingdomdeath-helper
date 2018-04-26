import uuid from "uuid/v4";
import { Gender, ID, ISettlement, ISurvivor, ISurvivorBaseStat } from "./interfaces";
import { IGearGrid } from "./interfaces/gear";
import { BaseStats, DefenseStats, IBaseStats, IDefenseStats, IHitLocation } from "./interfaces/survivor";

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

const getHitLocation = (label: DefenseStats, onlyHeavyWound: boolean): IHitLocation => ({
    armor: 0,
    heavyWound: false,
    id: uuid(),
    label,
    lightWound: false,
    onlyHeavyWound,
});

const getDefense = (): IDefenseStats => ({
    arms: getHitLocation(DefenseStats.arms, false),
    body: getHitLocation(DefenseStats.body, false),
    brain: getHitLocation(DefenseStats.brain, true),
    head: getHitLocation(DefenseStats.head, false),
    legs: getHitLocation(DefenseStats.legs, false),
    waist: getHitLocation(DefenseStats.waist, false),
});

const survivors: ISurvivor[] = Array.apply(null, { length: 8 }).map(Number.call, Number).map((n: number) => {
    return {
        alive: n < 4 || n % 3 === 0,
        baseStats: getBaseStats(),
        defenseStats: getDefense(),
        gender: n % 2 === 0 ? Gender.Male : Gender.Female,
        gridId: n < 4 ? n : undefined,
        hunting: n < 4,
        id: uuid(),
        name: `Survivor ${n}`,
        survival: 0,
    };
});

const huntingSurvivors: ID[] = survivors.filter((survivor) => survivor.hunting).map((survivor) => survivor.id);

const geargrids: IGearGrid[] = Array.apply(null, { length: 4 }).map(Number.call, Number).map((n: number) => {
    return {
        id: uuid(),
        slots: Array.apply(null, { length: 9 }).map(Number.call, Number).map((x: number) => {
            return {
                id: x,
            };
        }),
        survivorId: huntingSurvivors[n],
    };
});
const initialState: ISettlement = {
    geargrids,
    id: uuid(),
    name: "Everybody-will-die-town",
    survivors,
};

export default initialState;
