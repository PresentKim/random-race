const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const manifest = require("./site.webmanifest.json")

module.exports = {
    entry: {
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
    target: ["web", "es5"],
    plugins: [
        new HtmlWebpackPlugin({
            title: manifest.name,
            name: manifest.name,
            short_name: manifest.short_name,
            favicon: "./assets/icon/favicon.ico",
            meta: {
                viewport: "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height",
                description: manifest.description
            }
        })
    ],
    module: {
        rules: [
            {test: /\.(js|tsx?|)$/i, use: ["babel-loader"]},
            {test: /\.(css)$/i, use: ["style-loader", "css-loader"]},
            {test: /\.(png)$/i, use: ["file-loader", "image-webpack-loader"]}
        ]
    }
}