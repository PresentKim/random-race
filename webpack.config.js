const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    plugins: [
        new HtmlWebpackPlugin({
            title: "Random Race",
            favicon: "./assets/favicon/favicon.ico",
            meta: {
                viewport: "width=device-width, initial-scale=1",
                description: "Random race game in which several characters run automatically"
            }
        })
    ],
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