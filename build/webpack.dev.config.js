const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

module.exports = webpackMerge(webpackBaseConfig,
{
    entry: 
    {
        main: "./examples/main",
        vendors: ["vue", "vue-router", "flagwind-core"]
    },
    resolve:
    {
        alias:
        {
            "flagwind-web": "../../src/index"
        }
    },
    output: 
    {
        path: path.join(__dirname, "../examples/dist"),
        publicPath: "",
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    plugins: 
    [
        new FriendlyErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: "vendors", filename: "vendor.bundle.js" }),
        new HtmlWebpackPlugin
        ({
            inject: true,
            filename: path.join(__dirname, "../examples/dist/index.html"),
            template: path.join(__dirname, "../examples/index.html")
        })
    ]
});