import uuid from "uuid/v4";
import { Gender, IComplexStat, ISettlement, ISurvivor } from "./interfaces";
import { BaseStats, IStats } from "./interfaces/survivor";

const getComplexStat = (label: BaseStats): IComplexStat => ({
    gear: 0,
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

const survivors: ISurvivor[] = Array.apply(null, { length: 8 }).map(Number.call, Number).map((n: number) => {
    return {
        alive: n < 4 || n % 3 === 0,
        baseStats: getBaseStats(),
        gender: n % 2 === 0 ? Gender.Male : Gender.Female,
        hunting: n < 4,
        id: uuid(),
        name: `Survivor ${n}`,
    };
});

const initialState: ISettlement = {
    id: uuid(),
    name: "Everybody-will-die-town",
    survivors,
};

export default initialState;
