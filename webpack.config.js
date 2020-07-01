const path      = require("path");
const hwp       = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    pages: ["notfound.pug", "settings.pug"]
  },
  context: path.resolve(__dirname, "src"),
  module: {
    rules: [
      {test: /\.pug$/, loader: "pug-loader"}
    ],
  },
  output: {
    filename: "[name].html",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new hwp()
  ]
}
