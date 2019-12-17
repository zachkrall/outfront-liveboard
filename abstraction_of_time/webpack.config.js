const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    mode: 'production',
    entry: [
      '@babel/polyfill',
      path.resolve( __dirname, 'src', 'index.js')
    ],
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              "presets": [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      "chrome": 52
                    }
                  }
                ]
              ],
              "plugins": [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-arrow-functions",
                "@babel/plugin-transform-classes",
                "@babel/plugin-transform-destructuring",
                "@babel/plugin-transform-spread"
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
    		inlineSource: '.(js|css)$',
        inject: true,
        template: path.resolve( __dirname, 'index.html')
    	}),
      new HtmlWebpackInlineSourcePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      })
    ],
    node: {
      fs: 'empty'
    }
};
