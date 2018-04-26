import uuid from "uuid/v4";
import { Gender, IComplexStat, ID, ISettlement, ISurvivor } from "./interfaces";
import { IGearGrid } from "./interfaces/gear";
import { BaseStats, DefenceStats, IDefence, IHitLocation, IStats } from "./interfaces/survivor";

const getComplexStat = (label: BaseStats): IComplexStat => ({
    gear: 0,
    id: uuid(),
    label,
    permanent: 0,
    token: 0,
});

const getBaseStats = (): IStats => ({
    accuracy: getComplexStat(BaseStats.accuracy),
    evasion: getComplexStat(BaseStats.evasion),
    luck: getComplexStat(BaseStats.luck),
    movement: getComplexStat(BaseStats.movement),
    speed: getComplexStat(BaseStats.speed),
    strength: getComplexStat(BaseStats.strength),
});

const getHitLocation = (label: DefenceStats, onlyHeavyWound: boolean): IHitLocation => ({
    armor: 0,
    heavyWound: false,
    id: uuid(),
    label,
    lightWound: false,
    onlyHeavyWound,
});

const getDefence = (): IDefence => ({
    arms: getHitLocation(DefenceStats.arms, false),
    body: getHitLocation(DefenceStats.body, false),
    brain: getHitLocation(DefenceStats.brain, true),
    head: getHitLocation(DefenceStats.head, false),
    legs: getHitLocation(DefenceStats.legs, false),
    waist: getHitLocation(DefenceStats.waist, false),
});

const survivors: ISurvivor[] = Array.apply(null, { length: 8 }).map(Number.call, Number).map((n: number) => {
    return {
        alive: n < 4 || n % 3 === 0,
        baseStats: getBaseStats(),
        defenceStats: getDefence(),
        gender: n % 2 === 0 ? Gender.Male : Gender.Female,
        gridId: n < 4 ? n : null,
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
