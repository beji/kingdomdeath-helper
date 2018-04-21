declare module "public/stats.json" {
    const webpackStats: {
        assetsByChunkName: {
            main: string
        }
    };
    export default webpackStats;
}

declare module "*.json" {
    const value: any;
    export default value;
}