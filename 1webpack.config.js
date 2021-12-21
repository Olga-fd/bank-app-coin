/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const postcss = require('postcss');
//const postcssPresetEnv = require('postcss-preset-env');
// eslint-disable-next-line no-undef
module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    clean: true,
    filename: 'main.[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
        ],
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Coin',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets/images/visa.png',
          to: '../dist/[contenthash].png',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
          { loader: 'source-map-loader' },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: true },
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     //autoprefixer: { grid: true },
          //     postcssOptions: {
          //       plugins: [postcssPresetEnv],
          //     },
          //   },
          // },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|woff|woff2)$/i,
        type: 'asset',
      },
    ],
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});