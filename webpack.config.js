const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let env = process.env.WEBPACK_ENV;
let plugins = [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new ExtractTextPlugin("[name][hash:8].css")
]

if(env==="dev"){
  plugins.push(
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dist/react-manifest.json'),
        name:'react_library'
    }))
}else{
    plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin,
      new webpack.optimize.UglifyJsPlugin({
        mangle:   true,
        compress: {
            warnings: false, // Suppress uglification warnings
        },
        except: ['exports', 'require']
      })
    )
}
console.log(plugins)
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  },
  plugins:plugins
};