const { override, addLessLoader, addWebpackAlias, fixBabelImports } = require('customize-cra')
const path = require('path')

const resolve = dir => path.join(__dirname, '.', dir)

const rewiredSourceMap = () => (config) => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}

const rewiredGraphQLTag = () => (config) => {
  const gqlExtension = /\.(graphql|gql)$/
  const flatten = (array) => array.reduce((a, b) =>
      a.concat(Array.isArray(b) ? flatten(b) : b), []);
  const fileLoader = flatten(config.module.rules.map((rule) => rule.oneOf || rule))
      .find((rule) => rule.loader && rule.loader.indexOf("file-loader")!==-1);
  fileLoader && fileLoader.exclude.push(gqlExtension);
  const gqlTagRule = {
      test: gqlExtension,
      loader: 'graphql-tag/loader',
      exclude: /node_modules/
  }
  config.module.rules.push(gqlTagRule);
  return config;
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      'hack': `true; @import "${resolve("src/styles/index.less")}";`,
    }
  }),
  addWebpackAlias({
    '~': resolve('src'),
    '@components': resolve('src/components'),
    '@redux': resolve('src/redux'),
    '@utils': resolve('src/utils'),
    '@assets': resolve('src/assets'),
    '~styles': resolve('src/styles')
  }),
  rewiredSourceMap(),
  rewiredGraphQLTag(),

)

