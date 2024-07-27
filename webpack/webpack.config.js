const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './packages/server/src/main.ts', // Adjust the entry point as needed
  output: {
    path: path.resolve(__dirname, '../packages/server/dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@bank/server': path.resolve(__dirname, '../packages/server/src')
    },
    fallback: {
      crypto: false
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /dist/, /test/, /__tests__/]
      },
      { test: /\.mjs$/, type: 'javascript/auto' },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]]
          }
        }
      }
    ]
  },
  externals: ['mongodb']
};
