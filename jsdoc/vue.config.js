console.log(process.env.NODE_ENV)
module.exports = {
  publicPath: process.env.PUBLIC_URL || (process.env.NODE_ENV === 'production' ? 'https://freegroup.github.io/draw2d/' : '/'),
  'transpileDependencies': [
    'vuetify'
  ]
}
