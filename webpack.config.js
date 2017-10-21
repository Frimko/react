'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var findCacheDir = require("find-cache-dir");
var fs = require('fs');
var nodePaths = (process.env.NODE_PATH || '')
    .split(process.platform === 'win32' ? ';' : ':')
    .filter(Boolean)
    .filter(folder => !path.isAbsolute(folder))
    .map(resolveApp);

var appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

const appSrc = resolveApp('src');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'src/app.jsx')
    ],
    resolve: {
        root: [
            path.resolve(__dirname, "src"),
        ],
        fallback:   nodePaths,
        mainFiles: ["index"],
        alias: {
            components: appSrc + '/components',
            containers: appSrc + '/containers',
            actions: appSrc + '/actions',
            constants: appSrc + '/constants',
            reducers: appSrc + '/reducers',
            api: appSrc + '/api.js',
        },
        extensions: ['', '.js', '.jsx', '.css']
    },
    output: {
        path: path.join(__dirname, '/public/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }]
    }
};