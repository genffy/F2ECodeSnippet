const path = require('path')
const webpack = require('webpack')
module.exports = {
    devtool: 'cheap-eval-source-map',
    context: path.resolve(__dirname, 'src'),
    entry: [
        // 开启 React 代码的模块热替换(HMR)
        'react-hot-loader/patch',
        // 为 webpack-dev-server 的环境打包代码
        // 然后连接到指定服务器域名与端口
        'webpack-dev-server/client?http://localhost:8081',
        // 为热替换(HMR)打包好代码
        // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
        'webpack/hot/only-dev-server',
        './app.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
        publicPath: '/'
    },
    devServer: {
        // 开启服务器的模块热替换(HMR)
        hot: true,
        // 输出文件的路径
        contentBase: path.resolve(__dirname, 'dist'),
        // 和上文 output 的“publicPath”值保持一致
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: [ 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
        ],
    },
    plugins: [
        // 开启全局的模块热替换(HMR)
        new webpack.HotModuleReplacementPlugin(),
        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        })
    ],
}