// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    templateDir: path.resolve(__dirname, '../dist/static/html'),
    // assetsPublicPath: 'http://common1.qyerstatic.com/pictrip',
    assetsPublicPath: '/',
    // symsLinkDir: '/home/u8qyer/static/pictrip',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/bbs': {
      //   target: 'http://pictrip.qyer.com',
      //   changeOrigin: true
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  // styles: ['/static/css/base.css', '/static/css/common.css', '/static/fonts/css/iconfont.css'],
  // scripts: ['/static/lib/vue.js']
}
