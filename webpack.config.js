// const webpack = require('webpack');
import webpack from 'webpack'

module.exports = {
  // ... other configurations
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};