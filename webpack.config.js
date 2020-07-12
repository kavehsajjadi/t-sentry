const SentryPlugin = require("@sentry/webpack-plugin");
const path = require("path");

const sentryPlugin = new SentryPlugin({
  release: "test-release",
  include: "./build"
});

module.exports = {
  entry: {
    index: "./index.ts"
  },
  target: "node",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".ts", ".tsx"]
  },
  plugins: [sentryPlugin],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"]
      },
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"]
      }
    ]
  }
};
