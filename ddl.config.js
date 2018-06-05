const webpack = require('webpack');

const vendors = [
'react',
'react-dom',
"react-redux",
"redux",
"crypto-js",
'react-router'
];

module.exports = {
    output: {
      path:'static',
      filename: './static/[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
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
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};