import uuid from "uuid/v4";
import { Gender, ISettlement, ISurvivor } from "./interfaces";
import { IStats } from "./interfaces/survivor";

const getBaseStats = (): IStats => ({
    accuracy: 0,
    evasion: 0,
    luck: 0,
    movement: 0,
    speed: 0,
    strength: 0,
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
