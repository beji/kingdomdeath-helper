/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
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
      data: path.resolve(__dirname, '..', 'data'),
    },
  },
  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: [/\.tsx?$/, /\.ts?$/],
        loader: 'awesome-typescript-loader',
        options: {
          getCustomTransformers: path.join(__dirname, './ts-styled-transformer.js'),
        },
      },
      {
        test: [/\.tsx?$/, /\.ts?$/],
        loader: 'eslint-loader',
        options: { failOnHint: true },
        exclude: /node_modules/,
      },
      {
        test: [/\.tsx?$/, /\.ts?$/],
        loader: 'stylelint-custom-processor-loader',
        options: { failOnHint: true },
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
}
