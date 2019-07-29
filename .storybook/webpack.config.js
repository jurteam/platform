const merge = require('webpack-merge');

module.exports = async ({ config }) => merge(config, {
    node: {
      fs: 'empty'
    }
  });