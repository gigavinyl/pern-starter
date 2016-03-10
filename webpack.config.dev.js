const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: ['webpack-hot-middleware/client',
    './client/index.js',
  ],

  output: {
    path: `${__dirname}/dist/`,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css?modules',
    }, {
      test: /\.jsx*$/,
      exclude: [/node_modules/, /.+\.config.js/],
      loader: 'babel',
      query: {
        babelrc: false,
        presets: ['react-hmre', 'react', 'es2015-webpack', 'stage-0', 'async-to-bluebird'],
        cacheDirectory: true,
      },
    }],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
