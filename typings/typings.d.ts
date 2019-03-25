declare module "public/stats.json" {
    const webpackStats: {
        assetsByChunkName: {
            main: string
        }
    };
    export default webpackStats;
}

