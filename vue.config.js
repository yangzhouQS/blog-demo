// vue.config.js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')


module.exports = {
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.21.48.71:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/wddm-api'
        }
      }
    }
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
}
