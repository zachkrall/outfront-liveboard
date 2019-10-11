const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve( __dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: path.join(__dirname),
      compress: true,
      port: 3000,
      hot: true,
      writeToDisk: true,
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
    		inlineSource: '.(js|css)$',
        inject: true,
        template: path.resolve( __dirname, 'index.html')
    	}),
      new HtmlWebpackInlineSourcePlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    node: {
      fs: 'empty'
    }
};
