const nodeExternals = require('webpack-node-externals');
const path = require('path');
const env = process.env.NODE_ENV;
const webpack = require('webpack');
const glob = require("glob");

module.exports = 
    {
        name: "test",
        mode: "development",
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                data: path.resolve(__dirname, "..", "data")
            }
        },
        entry: glob.sync("./src/**/*.test.ts"),
        output: {
            path: path.join(__dirname, '..', 'test'),
            filename: "[name].test.js"
          },        
        module: {
            rules: [            
                {
                    test: [/\.tsx?$/, /\.ts?$/],
                    loader: 'ts-loader'
                }
            ],
        },
        target: 'node',
        externals: [nodeExternals()],
        devtool: "inline-cheap-module-source-map",
    }
