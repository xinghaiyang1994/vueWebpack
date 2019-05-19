const merge = require('webpack-merge')
const portfinder = require('portfinder')

process.env.NODE_ENV = 'development'
const baseWebpackConfig = require('./webpack.base.conf')


let port = 9000 

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader'
        ]
      },
      // scss
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },  
  devServer: {
    port,
    disableHostCheck: true,   // 绕过主机检查
    hot: true,    // 热替换。即有修改会部分热重载，而不是整体热重载
    open: true,    // 自动打开浏览器
    overlay: {    // 出现错误或警告是否在页面显示
      warnings: false,
      errors: true
    }
  },
  devtool: 'cheap-eval-source-map',   // 调试显示源码
  stats: 'errors-only'    // 只有错误才在控制台显示
})

module.exports = new Promise(function (resolve, reject) {
  // 端口占用自增
  portfinder.getPort({port}, (err, newPort) => {
    if (err) {
      console.log(err)
      return reject(err)
    }
    devWebpackConfig.devServer.port = newPort
    resolve(devWebpackConfig)
  })
})

