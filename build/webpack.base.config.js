const path = require("path");
const webpack = require("webpack");

function resolve(dir)
{
    return path.join(__dirname, "..", dir);
}

module.exports =
{
    resolve:
    {
        extensions: [".js", ".vue", ".json", ".ts"],
        alias:
        {
            "vue$": "vue/dist/vue.esm.js",
            "src": resolve("src")
        }
    },
    module:
    {
        rules:
        [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: "pre",
                loader: "tslint-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolve("src"), resolve("test")],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options:
                {
                    loaders:
                    {
                        css: "vue-style-loader!css-loader",
                        less: "vue-style-loader!css-loader!less-loader"
                    },
                    postLoaders:
                    {
                        html: "babel-loader"
                    }
                }
            },
            {
                test: /\.css$/,
                use:
                [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use:
                [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.scss$/,
                use:
                [
                    "style-loader",
                    "css-loader",
                    "sass-loader?sourceMap"
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.(html|tpl)$/,
                loader: "raw-loader"
            }
        ]
    },
    plugins:
    [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};