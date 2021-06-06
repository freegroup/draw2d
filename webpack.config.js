/* global __dirname, require, module*/

const path = require('path');
const pkg = require('./package.json');



let libraryName = pkg.name;

let plugins = [], outputFile;


outputFile = libraryName + '.js';

let outputPath = process.env.DIR || '/dist'
const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
//  mode: 'development',
  mode: 'production', // by FR 210515
  output: {
    libraryTarget: 'umd', // make the bundle export
    path: __dirname + outputPath,
    filename: outputFile,
    library: 'draw2d'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
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
  plugins: plugins
};

module.exports = config;
