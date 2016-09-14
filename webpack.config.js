var webpack = require('webpack')
var path = require('path')

module.exports = {
	plugins: [new webpack.HotModuleReplacementPlugin()],
    entry: path.join(__dirname, 'index.js'),
    output: {
		path: path.resolve(__dirname, './static/js'),
		filename: 'bundle.js',
    },
    resolve: {
		extensions: ['', '.js', '.jsx'],
    },
    externals: {
    	'react': 'window.React',
    	'react-dom': 'window.ReactDOM',
    	'jquery': 'jQuery',
    },
    module: {
		loaders: [{
		    test: /\.js$/,
		    exclude: /node_modules/,
		    loader: 'babel-loader?presets[]=es2015,presets[]=react',
			
		},{
		    test: /\.jsx$/,
		    exclude: /node_modules/,
		    loader: 'babel-loader!jsx-loader?harmony',
		},{
		    test: /\.css$/,
		    loader: 'style-loader!css-loader',
		},{
		    test: /\.less$/,
		    loader: 'style!css!less',
		},
		{
		    test: /\.(png|jpg)$/,
		    loader: 'url?limit=25000'
		}]
    }	
}
