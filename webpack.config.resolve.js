const path = require('path');

/**
 * Determine the array of extensions that should be used to resolve modules.
 */
module.exports = {
  extensions: ['.js', '.jsx', '.json'],
  modules: [path.join(__dirname, 'app'), 'node_modules'],
  alias: {
    '@app': path.resolve(__dirname, 'app'),
    '@assets': path.resolve(__dirname, 'app/assets'),
    '@components': path.resolve(__dirname, 'app/components'),
    '@config': path.resolve(__dirname, 'app/config'),
    '@constants': path.resolve(__dirname, 'app/constants'),
    '@data': path.resolve(__dirname, 'app/data'),
    '@models': path.resolve(__dirname, 'app/models'),
    '@utils': path.resolve(__dirname, 'app/utils')
  }
};
