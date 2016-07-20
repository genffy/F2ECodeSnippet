/**
 * Created by genffy on 16/7/20.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vanilla: "./resource/vanilla/imgview.js",
        react: "./resource/react/imgview.js",
        // ng2: "./resource/angular2/app.ts",
        // vue: "./resource/vue/app.js"
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        path: path.join(__dirname, 'debug'),
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'resource')
            },
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                query: {
                    presets:  ["react", "es2015", "stage-0", "react-hmre"]
                },
                include: path.join(__dirname, 'resource')
            },
            // {
            //     test: /\.css/,
            //     include: path.join(__dirname, 'resource'),
            //     loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            // },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.vue$/,
                loader: 'vue',
                include: path.join(__dirname, 'resource')
            },
            {
                test: /\.ts$/,
                // loader: 'ts-loader'
                loader: 'awesome-typescript-loader',
                include: path.join(__dirname, 'resource')
            }
        ]
    }
}