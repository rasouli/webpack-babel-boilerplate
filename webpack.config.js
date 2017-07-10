var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

//webpack configuration for bundleing backend code.
var serverSourceEntry = path.resolve(__dirname, 'src/app.js');
var serverBuildPath = path.resolve(__dirname, 'dist/');
var serverConfig = {
    entry: ["babel-polyfill", serverSourceEntry],
    output: {
        path: serverBuildPath,
        filename: "server.js"
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'stage-0'] }
            }]
        }]
    },

    devtool: 'source-map'
};


// webpack configuration for generating
// front bundle
var frontSourceEntry = path.resolve(__dirname, 'src/app.js');
var frontBuildPath = path.resolve(__dirname, 'dist/www/js/');
var frontConfig = {
    entry: ["babel-polyfill", frontSourceEntry],
    target: "web",
    output: {
        path: frontBuildPath,
        filename: "app.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'stage-0', 'react'] }
            }]
        }],
    },
    devtool: 'source-map',
}

// here decide whether you want to bundle for the front
// or backend. include whatever you need.
module.exports = [serverConfig, frontConfig];