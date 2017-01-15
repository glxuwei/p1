var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const assetsPath = _path => path.posix.join(config.build.assetsSubDirectory, _path);

const cssLoaders = (options = {}) => {
  // generate loader string to be used with extract text plugin
  const generateLoaders = loaders => {
    const sourceLoader = loaders.map(loader => {
      let extraParamChar = '?';
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader = `${loader}-loader`;
      }
      return loader + (options.sourceMap ? `${extraParamChar}sourceMap` : '');
    }).join('!')

    if (options.extract) {
      // return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
      return ExtractTextPlugin.extract(sourceLoader);
    } else {
      // return ['vue-style-loader', sourceLoader].join('!');
      return sourceLoader;
    }
  };

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),  
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus']),
  }
}

// Generate loaders for standalone style files (outside of .vue)
const styleLoaders = (options = {}) => {
  let output = [];
  const loaders = cssLoaders(options);
  for (let extension in loaders) {
    let loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader,
    })
  }
  return output;
}

module.exports = {
  assetsPath,
  cssLoaders,
  styleLoaders,
};
