console.log(process.env.NODE_ENV)
module.exports = {
  publicPath: process.env.PUBLIC_URL || (process.env.NODE_ENV === 'production' ? 'https://freegroup.github.io/draw2d/' : '/'),
  'transpileDependencies': [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          quietDeps: true,
          silenceDeprecations: ['slash-div', 'global-builtin', 'import', 'legacy-js-api', 'if-function']
        }
      },
      scss: {
        sassOptions: {
          quietDeps: true,
          silenceDeprecations: ['slash-div', 'global-builtin', 'import', 'legacy-js-api', 'if-function']
        }
      }
    }
  }
}