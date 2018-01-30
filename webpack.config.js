var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/main.js',
  output: { path: __dirname, filename: 'hpoVisuals.js', library:'hpoVisuals', libraryTarget:"window" },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'env']
        }
      }
    ]
  },
};