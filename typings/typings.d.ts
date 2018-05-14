declare module "public/stats.json" {
    const webpackStats: {
        assetsByChunkName: {
            main: string
        }
    };
    export default webpackStats;
}

declare module "data/raw/*.json" {
    const items: [{
        "#": number,
        "name": string;
        "stats.head": number | string,
        "Stats.arms": number | string,
        "stats.body": number | string,
        "stats.waist": number | string,
        "stats.legs": number | string,
        "desc": string,
        "obtained": string,
        "material": string,
        "types": string
    }];
    export default items;
}

declare module "data/final/fightingarts.json" {
    import { IFightingArt } from "src/interfaces";
    const arts: [IFightingArt];
    export default arts;
}

declare module "data/final/disorder.json" {
    import { IDisorder } from "src/interfaces";
    const disorders: [IDisorder];
    export default disorders;
}

declare module "*.json" {
    const value: any;
    export default value;
}
