const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        index: path.join(__dirname, "src/index.ts"),
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};