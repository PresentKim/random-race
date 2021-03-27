const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        index: "./src/index.js",
        polyfill: "./src/polyfill.js",
        styles: "./src/styles/index.js",
    },
    output: {
        path: __dirname,
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(js)$/i,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css)$/i,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: ["file-loader", "image-webpack-loader"]
            }
        ]
    }
}