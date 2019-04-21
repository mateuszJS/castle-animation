"use strict";
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(common, {
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
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader", "sass-loader"],
				}),
			},
		],
	},
	plugins: [
		new UglifyJSPlugin({
			compress: true,
			sourceMap: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
		}),
		new ExtractTextPlugin({
			filename: '[name].bundle.css',
			allChunks: true,
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new BundleAnalyzerPlugin()
	]
})