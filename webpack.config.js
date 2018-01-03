
const webpack = require('webpack');

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
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    devServer: {
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),

    ]
}
module.exports = option