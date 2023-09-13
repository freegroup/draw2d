/* global __dirname, require, module*/
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    //libraryTarget: 'umd', // make the bundle export
    path: __dirname + '/dist',
    filename: 'draw2d.js',
    library: 'draw2d'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['modern-browsers'],
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.exec\.js$/,
        use: [ 'script-loader' ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.css']
  },
  plugins: [ ]
};

module.exports = config;
