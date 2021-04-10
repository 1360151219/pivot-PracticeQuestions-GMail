const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "source-map",
  // 进阶用法 入口与出口 ：出口中的name是在入口处定义的路径
  entry: { "js/app": path.join(__dirname, "./src/app.js") },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "app.js",
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
      inject: true,
    }),
    new copyPlugin({
      patterns: [
        {
          // from: path.join(__dirname, "./public/*.ico"),
          from: "./public/*.ico",
          to: path.resolve(__dirname, "./dist/favicon.ico"),
          context: "./",
        },
        {
          from: "./public/libs",
          to: path.resolve(__dirname, "./dist/libs"),
        },
      ],
    }),
    new CleanWebpackPlugin({}),
  ],
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.art$/,
        use: {
          loader: "art-template-loader",
        },
      },
    ],
  },
};
