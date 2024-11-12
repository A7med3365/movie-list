const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
require('dotenv').config(); // Add this line

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/Backend-nest'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
