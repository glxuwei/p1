require('shelljs/global')
const config = require('../config');
const Title = require('../config/title');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _toString = Object.prototype.toString; 
let cssLinks = '';
let scripts = '';
if (_toString.call(config.scripts) === '[object Array]') {
  config.scripts.forEach( item => {
    scripts = `${scripts}<script src="${item}"></script>`;
  });
};
if(_toString.call(config.styles) === '[object Array]') {
  config.styles.forEach( item => {
    cssLinks = `${cssLinks}<link rel="stylesheet" href="${item}"/>`;
  });
}; 

const devConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // vue: {
  //   loaders: {
  //     js: 'url_replace?env=development!babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false'
  //   }
  // },
  // eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
});
const globalDir = path.resolve(__dirname, '../config/global.js');
let globalStr = '';
if (fs.existsSync(globalDir)) {
  globalStr = fs.readFileSync(globalDir, 'utf-8');
} else {
  touch(globalDir);
}
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach( name => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
  // https://github.com/ampedandwired/html-webpack-plugin
  devConfig.plugins.push(new HtmlWebpackPlugin({
    filename: `${name}.html`,
    chunks: [name],
    templateContent() {
      let template = fs.readFileSync(path.join(__dirname, '../src/pages/layout/template.html'),'utf-8');
      return template.replace(/<!--title-->/, Title[name] || '').replace(/<!--buildcss-->/, cssLinks).replace(/<!--buildjs-->/, scripts).replace(/<!--globalvar-->/, `<script>${globalStr}</script>`);
    },
    inject: true
  }));
});

module.exports = devConfig;
