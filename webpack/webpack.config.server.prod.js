const nodeExternals = require('webpack-node-externals');
const path = require('path');
const env = process.env.NODE_ENV;
const webpack = require('webpack');

module.exports = 
    {
        name: 'server',
        mode: 'production',
        entry: './src/server.tsx',
        output: {
            path: path.join(__dirname, '..', 'dist'),
            filename: 'server.js',
            libraryTarget: 'commonjs2',
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
                    enforce: 'pre',
                    loader: 'stylelint-custom-processor-loader',
                    options: { failOnHint: true },
                    exclude: /node_modules/
                },                              
                {
                    test: [/\.tsx?$/, /\.ts?$/],
                    loader: 'awesome-typescript-loader'
                }
            ],
        },
        target: 'node',
        externals: [nodeExternals()]
    }
