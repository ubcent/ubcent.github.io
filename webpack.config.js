let { resolve } = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/index.jsx`,
  output: {
    path: `${__dirname}/build`,
    publicPath: '/build/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      components: resolve(__dirname, 'src/components'),
      pages: resolve(__dirname, 'src/pages'),
      styles: resolve(__dirname, 'src/styles')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]'
            } 
          },
          { loader: 'postcss-loader' },
          { 
            loader: 'sass-loader',
            options: {
              includePaths: [resolve(__dirname, 'src')]
            }
          }
        ],
        exclude: /node_modules/
      },
      { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=15000&name=[name]-[hash].[ext]' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ],
  },

  devServer: {
    index: 'template.html'
  },

  plugins: process.argv.indexOf('-p') === -1 ? [
    new HtmlWebpackPlugin({
      template: `${__dirname}/template.html`,
      filename: '../index.html',
      inject: 'body',
    })
  ] : [
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        },
      }),
      new FaviconsWebpackPlugin({
        logo: resolve(__dirname, 'src', 'styles', 'logo.png'),
        prefix: 'icons-[hash]/',
        emitStats: false,
        statsFilename: 'iconstats-[hash].json',
        persistentCache: true,
        inject: true,
        background: '#1c1c1c',
        title: 'Dmitry Bondarchuk',
    
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }),
      new HtmlWebpackPlugin({
        template: `${__dirname}/template.html`,
        filename: '../index.html',
        inject: 'body',
      }),
      new ExtractTextPlugin({ filename: 'app-[hash].css', disable: false, allChunks: true })
    ],
};
