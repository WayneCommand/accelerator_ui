module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      "/login": {
        target: "http://127.0.0.1:9090",
        changeOrigin: false,
        pathRewrite: {}
      },
      "/user": {
        target: "http://127.0.0.1:9090",
        changeOrigin: false,
        pathRewrite: {}
      },
      "/device": {
        target: "http://127.0.0.1:9090",
        changeOrigin: false,
        pathRewrite: {}
      }
    }
  }
}