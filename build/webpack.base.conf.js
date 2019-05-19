const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(process.env.NODE_ENV)
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),    // 入口文件
  output: {   // 出口文件
    path: path.resolve(__dirname, '../dist/static/'),
    // chunkFilename: 'js/[id].js',
    filename: 'js/[name].js'
  },
  resolve: {
    modules: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../src')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      // babel
      {
        test: /\.js$/,
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      // 图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 100,    // 大小，单位 B。小于该大小会被转为 base64，大于该大小会以 url 的方式存在
            name: 'img/[name].[ext]'
          }
        }
      },
      // 字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,    // 大小，单位 B。小于该大小会被转为 base64，大于该大小会以 url 的方式存在
            name: 'font/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: isDev ? 'index.html':path.resolve(__dirname, '../dist/index.html')
    })
  ]
}