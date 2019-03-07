const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// Webpack entry points. Mapping from resulting bundle name to the source file entry.
const entries = {};

// Loop through subfolders in the "pages" folder and add an entry for each one
const pagesDir = path.join(__dirname, "src/pages");
fs.readdirSync(pagesDir).filter(dir => {
    if (dir !== "login") {
        if (fs.statSync(path.join(pagesDir, dir)).isDirectory()) {
            entries[dir] = "./" + path.relative(process.cwd(), path.join(pagesDir, dir, dir));
        }
    }
});

module.exports = {
    entry: entries,
    output: {
        filename: "[name]/[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    stats: {
        warnings: false
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                include: /\.js$/,
                extractComments: "all"
            })
        ]
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "azure-devops-ui/buildScripts/css-variables-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
            {
                test: /\.woff$/,
                use: [{
                    loader: 'base64-inline-loader'
                }]
            },
            {
                test: /\.(html|htm|png|jpg|svg)$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: "**/*.html",
            context: "src/pages"
        }]),
        new MiniCssExtractPlugin({
            filename: "[name]/[name].css",
            chunkFilename: "[id]/[id].css"
        }),
        new OptimizeCSSAssetsPlugin({}),
        new CopyWebpackPlugin([{
            from: "server.js",
            context: "src",
            flatten: true,
            to: "./"
        }])
    ]
};
