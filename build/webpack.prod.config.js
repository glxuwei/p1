const path = require('path');
const config = require('../config');
const utils = require('./utils');
const webpack = require('webpack');
const Md5Hash = require('webpack-md5-hash');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;


const webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new Md5Hash(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:8].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // split vendor js into its own file
    /* new webpack.optimize.CommonsChunkPlugin({ */
      // name: 'vendor',
      // minChunks: function (module, count) {
        // // any required modules inside node_modules are extracted to vendor
        // return (
          // module.resource &&
          // /\.js$/.test(module.resource) &&
          // module.resource.indexOf(
            // path.join(__dirname, '../node_modules')
          // ) === 0
        // )
      // }
    /* }), */
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    /* new webpack.optimize.CommonsChunkPlugin({ */
      // name: 'manifest',
      // chunks: ['vendor']
    /* }) */
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig;
