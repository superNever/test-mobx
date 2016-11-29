const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    index:'./src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]'
  },
  devtool:'source-map', 
  module:{
    loaders: [
      {
        'test': /\.jsx?$/,
        'loader': 'babel',
        'exclude': ['node_modules',path.resolve(__dirname,'../node_modules/')]
      },
      {
        test: /\.css/,
        include:[path.resolve(__dirname,'/src/')],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less/,
        include:[path.resolve(__dirname,'/src/')],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
 ]
};