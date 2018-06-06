/**
 * Webpack打包配置
 * @author  jessica(gujing_hy@163.com)
 */

const path = require('path');

module.exports = {
    entry: [path.resolve(__dirname, 'web/js/app.jsx'), 'whatwg-fetch'],
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'app.js'
    },
    module: {
        loaders: [{
                test: /.jsx?$/,
                loader: 'babel-loader',
                query: {
                    compact: false,
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.less$/,
                loaders: ["style", "css", "less"]
            }, {
                test: /\.json$/, 
                loader: 'json-loader'
            }]
    }
};
