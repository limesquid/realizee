const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputFolder = path.resolve(__dirname, '../dist');
const templateIndex = path.resolve(__dirname, 'index.html');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    __dirname
  ],
  output: {
    path: outputFolder,
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject : true,
      template : templateIndex
    })
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: 'localhost',
    port: process.env.PORT || 3000,
    contentBase: './src',
    stats: 'minimal'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../../..'),
      'node_modules'
    ],
    extensions: [ '.js' ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
