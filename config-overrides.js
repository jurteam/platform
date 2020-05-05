const merge = require("webpack-merge");
const path = require("path");

module.exports = function override(config, env) {
  console.log("config-overrides");
  return merge(config, {
    node: {
      fs: "empty"
    },
    resolve: {
      alias: {
        JurCommon: path.resolve(__dirname, "src/components/common/")
      }
    }
  });
};
