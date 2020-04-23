const merge = require("webpack-merge");
const path = require("path");

module.exports = async ({ config }) =>
  merge(config, {
    node: {
      fs: "empty"
    },
    resolve: {
      alias: {
        JurCommon: path.resolve(__dirname, "../src/components/common/")
      }
    }
  });
