const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            // {
            //     test: /\.(html|svg|jpe?g|png|ttf|woff2?)$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: 'static/[name]-[hash:8].[ext]',
            //         },
            //     },
            // },
            // {
            //     test: /\.scss$/,
            //     exclude: /node_modules/,
            //     use: cssLoader,
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'

            },
        ],
    },
}