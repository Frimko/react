'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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
const appHtml = resolveApp('src/index.tpl.html');
const appBuild = resolveApp('build');
const appPublic = resolveApp('public');

module.exports = {
    bail:    true,
    devtool: 'source-map',
    entry:   [
        path.join(__dirname, 'src/app.jsx')
    ],
    output:  {
        path: appBuild,
        filename: '[name].js',
        publicPath: appPublic,
    },
    resolve: {
        root: [
            path.resolve(__dirname, "src"),
        ],
        fallback: nodePaths,
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
    plugins: [
        new HtmlWebpackPlugin({
            inject:   true,
            template: appHtml,
            minify:   {
                removeComments:                true,
                collapseWhitespace:            true,
                removeRedundantAttributes:     true,
                useShortDoctype:               true,
                removeEmptyAttributes:         true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash:              true,
                minifyJS:                      true,
                minifyCSS:                     true,
                minifyURLs:                    true
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // Try to dedupe duplicated modules, if any:
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings:  false,
            },
            mangle:   {
                screw_ie8: true
            },
            output:   {
                comments:  false,
                screw_ie8: true
            }
        }),
    ],
    module: {
        loaders:    [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
};
