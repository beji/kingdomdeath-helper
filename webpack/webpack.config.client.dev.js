/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  name: 'client',
  entry: ['./src/client.tsx', `webpack-hot-middleware/client`],
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: 'bundle.js',
    publicPath: `/assets/`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      data: path.resolve(__dirname, '..', 'data'),
    },
  },
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
        exclude: /node_modules/,
      },
      {
        test: [/\.tsx?$/, /\.ts?$/],
        loader: 'stylelint-custom-processor-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    }),
  ],
}
