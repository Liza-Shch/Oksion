const path = require('path');
const src = path.resolve(__dirname, '..', 'public');
const build = path.resolve(__dirname, '..', 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(src, 'index.js'),
    output: {
        path: build,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // {
            //     enforce: "pre",
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader"
            // },

            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //       loader: 'babel-loader',
            //       options: {
            //         presets: ['@babel/preset-env'],
            //         plugins: ['@babel/plugin-proposal-object-rest-spread']
            //       }
            //     }
            // },

            {
                test: /\.html$/,
                use: [{loader: "html-loader"}]
            },
            
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                  ],
            },

            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(src, 'index.pug')
        }),
        new MiniCssExtractPlugin('bundle.css'),
    ]
};