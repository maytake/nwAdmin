var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: false,

  entry: {
    app: path.resolve(__dirname, 'app/index.jsx'),

    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'es6-promise',
      'whatwg-fetch',
      'immutable'
    ]
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].[chunkhash:8].js",
    publicPath: '/',
    chunkFilename: '[name]_[chunkhash:8]_chunk.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
    }, {
      test: /\.(png|gif|jpg|jpeg|bmp)$/i,
      loader: 'url-loader?limit=8192&name=./[name].[ext]?[hash]'
    }, {
      test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
      loader: 'url-loader?limit=8192&name=./[name].[ext]?[hash]'
    }, {
      test: /\.(xlsx)($|\?)/i,
      loader: 'file-loader?limit=8192&name=./[name].[ext]'
    }]
  },
  postcss: [
    require('autoprefixer')
  ],

  plugins: [

 
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html'
    }),


    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false, // remove all comments
      },
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),

    // 分离CSS和JS文件
    new ExtractTextPlugin('[name].[chunkhash:8].css'),

    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash:8].js'
    }),

    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
          /* 'NODE_ENV': JSON.stringify(process.env.NODE_ENV)*/
      }
    })
  ]
}