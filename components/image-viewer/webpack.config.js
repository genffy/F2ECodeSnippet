/**
 * Created by genffy on 16/7/20.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        // vanilla: "./resource/vanilla/imgview.js",
        react: "./resource/react/imgview.jsx",
        demo: "./example/index.jsx",
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
        extensions: ['', '.js', '.jsx', '.ts']
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
                loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
                /*loader: 'babel-loader',
                query: {
                    presets:  ["react", "es2015", "stage-0", "react-hmre"]
                },*/
                exclude: /node_modules/,
                // include: path.join(__dirname, 'resource')
            },
            // {
            //     test: /\.css/,
            //     include: path.join(__dirname, 'resource'),
            //     loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            // },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.vue$/,
                loader: 'vue',
                exclude: /node_modules/,
                include: path.join(__dirname, 'resource')
            },
            {
                test: /\.ts$/,
                // loader: 'ts-loader'
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                include: path.join(__dirname, 'resource')
            }
        ]
    }
}