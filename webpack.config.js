let Encore  = require('@symfony/webpack-encore');
let path    = require('path');

const assets_path   = path.resolve('./src');
const output_path   = (Encore.isProduction()) ?
    path.resolve('./build') :
    path.resolve('./build')
;
const public_path   = (Encore.isProduction()) ?
    '/build' :
    '/build'
;
const sass_path     = path.join(assets_path, './sass');
const js_path       = path.join(assets_path, './js');

Encore
    // empty the outputPath dir before each build
    //.cleanupOutputBeforeBuild()

    // directory where all compiled assets will be stored
    .setOutputPath(output_path)

    // what's the public path to this directory (relative to your project's document root dir)
    .setPublicPath(public_path)

    // will output as build/app.js
    .addEntry('app', path.join(js_path, '/app.js'))

    .enableVueLoader()

    .enableSourceMaps(!Encore.isProduction())

    // create hashed filenames (e.g. app.abc123.css)
    .enableVersioning(false)
;

let config = Encore.getWebpackConfig();
config.watchOptions = { poll: true, ignored: /node_modules/ };
if (config.devServer) {
    // config.devServer.watchContentBase = true;
}

// export the final configuration
module.exports = config;