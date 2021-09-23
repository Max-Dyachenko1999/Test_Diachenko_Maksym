const  path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		},{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: "css-loader",
				},{
					loader: "postcss-loader",
					options: {config: { path: 'src/js/postcss.config.js'}}
				},{
					loader: "sass-loader",
				}
			]
		},{
				test: /\.(png|svg|jpe?g|gif)$/,
				include: /img/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '../img/',
							publicPath: '../img/'
						}
					}
				]
			}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].css"
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'src/assets/img', to: 'img' },
			],
			options: {
				concurrency: 100,
			},
		}),
	],
};
