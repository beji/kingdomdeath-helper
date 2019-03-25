const nodeExternals = require('webpack-node-externals');
const path = require('path');
const env = process.env.NODE_ENV;
const webpack = require('webpack');

module.exports = 
    {
        name: 'client',
        entry: ['./src/client.tsx', `webpack-hot-middleware/client`],
        devtool: 'inline-source-map',
        mode: 'development',
        output: {
            path: path.join(__dirname, '..', 'public'),
            filename: 'bundle.js',
            publicPath: `/assets/`
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                data: path.resolve(__dirname, "..", "data")
            }
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
                    loader: 'awesome-typescript-loader'
                }
            ],
        },
        target: 'web',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            })
        ]
    }
