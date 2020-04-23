module.exports = {
  presets: [
    '@vue/app'
  ]
  ,
  proxyTable: {
    '/login': {
      target: 'http://localhost:9090', //源地址
      changeOrigin: true, //改变源
    }
}
}
