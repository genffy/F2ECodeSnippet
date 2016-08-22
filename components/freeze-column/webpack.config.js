/**
 * Created by genffy on 16/7/20.
 */
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './demo/demo.jsx',
    output: {
        filename: "bundle.js",
        chunkFilename: "chunk.js",
        path: path.join(__dirname, 'debug'),
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'resource')
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'],
                /*loader: 'babel-loader',
                query: {
                    presets:  ["react", "es2015", "stage-0", "react-hmre"]
                },*/
                exclude: /node_modules/,
                // include: path.join(__dirname, 'resource')
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};