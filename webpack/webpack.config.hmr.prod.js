const nodeExternals = require('webpack-node-externals');
const path = require('path');
const env = process.env.NODE_ENV;
const webpack = require('webpack');

module.exports = 
    {
        name: 'server',
        mode: 'production',
        entry: './src/hmr.ts',
        output: {
            path: path.join(__dirname, '..', 'src'),
            filename: 'hmr.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                data: path.resolve(__dirname, "..", "data")
            }              
        },
        // Add the loader for .ts files.
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
                    loader: 'ts-loader'
                }
            ],
        },
        target: 'node',
        node: {
            __dirname: false,
        },        
        externals: [nodeExternals()]
    }
