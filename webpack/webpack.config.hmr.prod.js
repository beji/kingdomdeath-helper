/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  name: 'server',
  mode: 'production',
  entry: './src/hmr.ts',
  output: {
    path: path.join(__dirname, '..', 'src'),
    filename: 'hmr.js',
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
    ],
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
}
