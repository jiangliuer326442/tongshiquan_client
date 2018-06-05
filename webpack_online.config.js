var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app/index',
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
	new webpack.optimize.UglifyJsPlugin({
		output: {
			comments: false,
		},
		compress: {
		  warnings: false
		}
	}),
	new webpack.DllReferencePlugin({
		context: __dirname,
		manifest: require('./manifest.json'),
	}),
    new ExtractTextPlugin("/css/style.css"),
  ],
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loaders: ['babel?presets[]=es2015&presets[]=react'],
        exclude: /node_modules/,
        include: __dirname
      },
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader!css-loader')},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader!css-loader!less-loader')},
  		{test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=819200&name=./img/[name].[ext]'},
      {test: /\.(eot|woff|woff2|svg|ttf|map)$/, loader: "file-loader?&name=./css/[name].[ext]" },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: 'cheap-module-eval-source-map',
};
