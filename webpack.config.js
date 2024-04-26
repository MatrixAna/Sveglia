// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "web",
  mode: "production",
  entry: ["./tests/alarm.spec.js"],
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       template: "./src/index.html",
  //     }),
  //   ],

  //   module: {
  //     rules: [
  //       {
  //         test: /\.css$/,
  //         use: ["style-loader", "css-loader"],
  //       },
  //     ],
  //   },
  // Additional configuration goes here
};
