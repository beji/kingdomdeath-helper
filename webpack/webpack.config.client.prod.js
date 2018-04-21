const nodeExternals = require('webpack-node-externals');
const path = require('path');
const env = process.env.NODE_ENV;
const webpack = require('webpack');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const Visualizer = require('webpack-visualizer-plugin');

module.exports = 
    {
        name: 'client',
        entry: './src/client.tsx',
        mode: 'production',
        output: {
            path: path.join(__dirname, '..', 'public'),
            filename: 'bundle-[chunkhash].js',
            publicPath: `/assets/`
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: [/\.tsx?$/, /\.ts?$/],
                    enforce: 'pre',
                    loader: 'tslint-loader',
                    options: { failOnHint: true },
                    exclude: /node_modules/
                },
                {
                    test: [/\.tsx?$/, /\.ts?$/],
                    enforce: 'pre',
                    loader: 'stylelint-custom-processor-loader',
                    options: { failOnHint: true },
                    exclude: /node_modules/
                },                
                {
                    test: [/\.tsx?$/, /\.ts?$/],
                    loader: 'ts-loader'
                }
            ],
        },
        target: 'web',
        plugins: [
            new Visualizer(),
            new StatsWriterPlugin({
              filename: "stats.json" // Default
            })
          ]        
    }
