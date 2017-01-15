const path = require('path');
const config = require('../config');
const webpack =require('webpack');
const utils = require('./utils');
const projectRoot = path.resolve(__dirname, '../')
const glob = require("glob");
const entrys_glob = glob.sync(path.join(projectRoot, "src/pages/**/*.entry.js"));
const nodeModulesSrc = path.join(__dirname, '../node_modules');
const entry = {};
entrys_glob.forEach(item => {
  var key = item.replace(/.*\/(\w*)\.entry\.js/, '$1');
  entry[key] = item;
});
module.exports = {
  entry,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // filename: '[name].[chunkHash].js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.less', '.css'],
    fallback: [nodeModulesSrc],
    alias: {
      'src': path.resolve(__dirname, '../src'),
    }
  },
  externals: {
      // 'vue': 'Vue'
  },
  resolveLoader: {
    modulesDirectories: ['custom_loaders', 'node_modules'],
    extensions: ['', '.loader.js', '.js'],
    fallback: [nodeModulesSrc]
  },
  module: {
    /* preLoaders: [ */
      // {
        // test: /\.vue$/,
        // loader: 'eslint',
        // include: projectRoot,
        // exclude: /node_modules/
      // },
      // {
        // test: /\.js$/,
        // loader: 'eslint',
        // include: projectRoot,
        // exclude: /node_modules/
      // }
    /* ], */
    loaders: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue'
      // },
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      // {
      //   test: /\.html$/,
      //   loader: 'vue-html'
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // ...utils.styleLoaders(),
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   'Vue': 'vue'
    // })
  ],
  /* eslint: { */
    // formatter: require('eslint-friendly-formatter')
  /* }, */
  // vue: {
  //   loaders: Object.assign({
  //     js: 'url_replace?env=' + process.env.NODE_ENV+'!babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false'
  //   }, utils.cssLoaders())
  // }
}
