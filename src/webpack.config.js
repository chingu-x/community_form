const path = require('path');
// clones app/index.html and inserts bundle script
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // target file to bundle
    // if using component modules import / export them from this file?
    entry: './app/index.js',

    // output directory and filename
    output: {
        path: path.resolve('..', 'public'),
        filename: 'index_bundle.js'
    },

    // what is a module in this context?
    module: {
        // rules to apply to specific files / filetypes
        rules: [
            // babel-loader transformations defined in package.json["babel"]
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.(css)$/, use: ['style-loader', 'css-loader'] }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            // target dev index.html to be cloned
            template: 'app/index.html'
        })
    ],

    // how to not get bundled code using webpack-dev-server (better error messages)?
    mode: 'production'   
}