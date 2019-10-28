const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin }   = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Home Page: Webpack 4 Starter Package',
			template: './src/index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			title: 'Inner Page: Webpack 4 Starter Package',
			template: './src/error.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			filename: 'error.html'
		}),
		// new MiniCssExtractPlugin({
		// 	filename: 'stylesheet.css'
		// }),
		new MiniCssExtractPlugin({
			filename: 'style.[chunkhash].css'
		}),
		new CopyWebpackPlugin([{
			from: './src/images',
			to: './assets/images'
		}]),
		new ImageminPlugin({
			// disable: process.env.NODE_ENV !== 'production', // Disable during development
			options: {
				optimizationLevel: 7
			}
		})
	],
	module: {
		rules: [
			{
				test: [/.js$/],
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						]
					}
				}
			},
			{
				test: [/.css$|.scss$/],
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets/images',
						limit: 8192
					}
				}]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/fonts/'
						}
					}
				]
			}
		]
	}
};