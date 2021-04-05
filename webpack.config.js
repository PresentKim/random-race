const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackNoModulePlugin = require("webpack-nomodule-plugin").WebpackNoModulePlugin;
const CnameWebpackPlugin = require("cname-webpack-plugin");

module.exports = {
    entry: {
        polyfill: "core-js/stable",
        index: "./src/index.ts",
        styles: "./src/styles/index.ts"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "~": path.resolve(__dirname, "assets/sprite"),
            "%": path.resolve(__dirname, "assets/audio")
        }
    },
    output: {
        publicPath: "",
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    devServer: {
        hot: true
    },
    target: ["web", "es5"],
    plugins: [
        new HtmlWebpackPlugin({
            title: "Random Race",
            favicon: "./assets/icon/favicon.ico",
            meta: {
                viewport: "width=device-width, initial-scale=1, user-scalable=no",
                description: "Random race game in which several characters run automatically"
            }
        }),
        new WebpackNoModulePlugin({
            filePatterns: ["polyfill.js"]
        }),
        new CnameWebpackPlugin({
            domain: "race.present.kim",
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {test: /\.(js|tsx?|)$/i, use: ["babel-loader"]},
            {test: /\.(css)$/i, use: ["style-loader", "css-loader"]},
            {test: /\.(png)$/i, use: ["file-loader", "image-webpack-loader"]}
        ]
    }
}