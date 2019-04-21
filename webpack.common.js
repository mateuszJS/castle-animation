"use strict";
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "7777";

const _ROW_QUANTITY_ = 21,
	 _QUANTITY_ = _ROW_QUANTITY_ * _ROW_QUANTITY_;

module.exports = {
	entry: {
		index: `${__dirname}/src/index.js`,
		vendor: ['pixi.js'],
	},
	output: {
		path: `${__dirname}/docs`,
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			},
			{
				test: /\.(png|jpg|woff|woff2|eot|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000
						}
					}
				]
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {loader: 'html-loader'}
			},
		]
	},
	devServer: {
		contentBase: "./docs",
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.DefinePlugin({
			_QUANTITY_: _QUANTITY_,
			_ROW_QUANTITY_: _ROW_QUANTITY_
		}),
		new UglifyJSPlugin({
			compress: true
		}),
		new DashboardPlugin(),
	  new HtmlWebpackPlugin({
	    template: 'src/template.html'
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets/export/*', to: './', flatten: true }
		])
	]
}
