
const webpack = require('webpack');
const extractText = require('extract-text-webpack-plugin');
const option = {
    entry: {
        vendor: ['react', 'antd'],
        app: ['./src/js/main.js']
    },
    output: {
        filename: "js/[name].js",
        path: __dirname + "/public",
        publicPath: "/public"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    minetype: 'application/font-woff',
                },
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    minetype: 'application/font-woff',
                },
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    minetype: 'application/octet-stream',
                },
            },
            {
                test: /\.(eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    minetype: 'application/vnd.ms-fontobject',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    limit: 2048,
                    outputPath: 'images/'
                }

            },
            {
                test: /\.less$/,
                use: extractText.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        hot: false,
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new extractText('css/style.css')

    ]
}
module.exports = option