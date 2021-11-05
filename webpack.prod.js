const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackPwaManifest = require("webpack-pwa-manifest");
const manifest = require("./site.webmanifest.json");
const {InjectManifest} = require("workbox-webpack-plugin");
const path = require("path");
const CnameWebpackPlugin = require("cname-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    entry: {
        sw_registration: "./src/sw_registration.ts"
    },
    plugins: [
        new WebpackPwaManifest(manifest),
        new InjectManifest({
            swSrc: path.resolve(__dirname, "src/sw.js"),
            swDest: "sw.js",
            exclude: [/CNAME/]
        }),
        new CnameWebpackPlugin({
            domain: "race.present.kim",
        })
    ]
});