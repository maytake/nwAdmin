var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// var nodeModulesPath = path.resolve(__dirname, 'node_modules')
// console.log(process.env.NODE_ENV)

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: path.resolve(__dirname, 'app/index.jsx'),//cd __dirname, cd 'app/index.jsx'
    output: {
        path: __dirname + "/build",
        filename: "bundle.js",
        chunkFilename: '[name]_[chunkhash:8]_chunk.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {

        loaders: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    plugins: [
                        ["import", {
                            libraryName: "antd",
                            style: "css"
                        }]
                    ]
                }
            },

            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            }, {
                test: /\.css$/,
                loader: 'style!css!postcss'
            }, {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                loader: 'url-loader?limit=8192&name=./[name].[ext]?[hash]'
            }, // 限制大小5kb
            {
                test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                loader: 'url-loader?limit=5000'
            }, // 限制大小小于5k
            // 限制大小5kb
            {
                test: /\.(xlsx)($|\?)/i,
                loader: 'file-loader?limit=8192&name=./[name].[ext]'
            }
        ]
    },


    postcss: [
        require('autoprefixer') 
    ],
    plugins: [
    
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),


        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),


        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],

    devServer: {
        proxy: [{

            context: ['/ebeim-api', '/erp', '/home', '/api'],
            target: 'http://localhost:3000',
              /*target: 'http://192.168.1.56:8080/',*/
            changeOrigin: true,
            secure: false
        }],

        contentBase: "./public", 
        colors: true, 
        historyApiFallback: true, //不跳转
        disableHostCheck: true,
        inline: true, 
        hot: true // 使用热加载插件 HotModuleReplacementPlugin
    }
}