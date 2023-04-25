const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');

module.exports = {
    mode: 'development',
    entry: __dirname + '/src/index.js',
    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',
                    target: 'es2015',
                    minify: false
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '/src/index.html'
        })
    ]
}
