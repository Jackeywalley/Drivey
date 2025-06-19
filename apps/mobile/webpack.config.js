const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@drivemate/ui', '@drivemate/types']
    }
  }, argv);

  // Add aliases for workspace packages
  config.resolve.alias = {
    ...config.resolve.alias,
    '@drivemate/ui': path.resolve(__dirname, '../../packages/ui'),
    '@drivemate/types': path.resolve(__dirname, '../../packages/types')
  };

  return config;
}; 