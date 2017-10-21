/**
 * Created by Frimko on 22.10.2017.
 * mailto ccc-car@yandex.ru.
 */
'use strict';
process.env.NODE_ENV = 'production';

var fs = require('fs-extra');

var path = require('path');
var appDirectory = fs.realpathSync(process.cwd());

const webpack = require('webpack');
const config = require('./webpack.production.config.js');

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}
const appBuild = resolveApp('build');
const appPublic = resolveApp('public');
const appHtml = resolveApp('src/index.tpl.html');

fs.emptyDirSync(appBuild);
webpack(config).run((err, stats)=>{
    console.log(stats);
});
copyPublicFolder();

function copyPublicFolder() {
    fs.copySync(appPublic, appBuild, {
        dereference: true,
        filter: file => file !== appHtml
    });
}