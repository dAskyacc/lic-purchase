const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extract css to files
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer') // help tailwindcss to work

const { R, src, dist, pubdir, favicon } = require('../paths')
const { custThemeVariables } = require('../themes/index')
const { BaseResolve, imgExtensions } = require('./resolve-helper')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  // Where webpack looks to start building the bundle
  entry: {
    main: R(src, 'index.js'),
  },

  // Where webpack outputs the assets and bundles
  output: {
    path: dist,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    ...BaseResolve,
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: R(pubdir, 'js'),
          to: 'js',
          globOptions: {
            dot: true,
            ignore: ['*.DS_Store', '.gitkeep'],
          },
        },
        {
          from: R(src, 'assets'),
          to: 'assets',
          globOptions: {
            dot: true,
            ignore: ['*.DS_Store', '.gitkeep'],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'Project Title',
      favicon: favicon,
      template: R(pubdir, 'index.html'), // template file
      filename: 'index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      // {
      //   test: /antd-mobile.*\.less$/, // integrated antd-mobile
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         lessOptions: {
      //           javascriptEnabled: true,
      //           modifyVars: { ...custThemeVariables }, // custom defined antd-mobile styles
      //         },
      //       },
      //     },
      //   ],
      //   include: /node_modules/,
      // },
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(css|scss|sass)$/,
        use: [
          devMode
            ? {
                loader: 'style-loader',
              }
            : {
                loader: MiniCssExtractPlugin.loader,
              },

          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true, debug: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
          {
            loader: 'postcss-loader', // postcss loader needed for tailwindcss
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
      // {
      //   test: new RegExp('.(' + imgExtensions.join('|') + ')$'),
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         limit: 8192,
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
    ],
  },
}
