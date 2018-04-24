import uuid from "uuid/v4";
import { Gender, IComplexStat, ISettlement, ISurvivor } from "./interfaces";
import { IStats } from "./interfaces/survivor";

const getComplexStat = (label: string): IComplexStat => ({
    gear: 0,
    label,
    permanent: 0,
    token: 0,
});

const getBaseStats = (): IStats => ({
    accuracy: getComplexStat("Accuracy"),
    evasion: getComplexStat("Evasion"),
    luck: getComplexStat("Luck"),
    movement: getComplexStat("Movement"),
    speed: getComplexStat("Speed"),
    strength: getComplexStat("Strength"),
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
