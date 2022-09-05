const webpack = require("webpack")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
module.exports = {
  outputDir: "dist",
  assetsDir: "static",
  publicPath: "./",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        css: {
          loaderOptions: {
            postcss: {
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        },
        _: "lodash",
      }),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: "server",
      //   analyzerHost: "127.0.0.1",
      //   analyzerPort: 8889,
      //   reportFilename: "report.html",
      //   defaultSizes: "parsed",
      //   openAnalyzer: false,
      //   generateStatsFile: false,
      //   statsFilename: "stats.json",
      //   statsOptions: null,
      //   logLevel: "info",
      // }),
    ],
  },

  devServer: {
    proxy: {
      "/api": {
        //target: "http://42.193.252.31:8001",
        target: "http://localhost:3100",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
}
