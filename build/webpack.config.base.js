// 用于放公共的配置
const path = require('path')

const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  // entry: path.join(__dirname, '../client/index.js'),
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    // path: path.join(__dirname, '../dist'),
    path: path.join(__dirname, '../public'), // 若命令行执行的是 npm run practice，下面的publicPath需改成'http://localhost:8080/public/'。在浏览器端输入http://localhost:8080/public/就可以访问。
    // / 是根目录
    publicPath: 'http://127.0.0.1:8000/public/' // 页面访问文件时的路径，默认是访问根目录，此处是访问根目录下的public文件夹，这个根目录是页面的url的根，也就是项目运行的地址。这个路径和path没有关系。
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        // \.是对.转义
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/

      },
      {
        test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 文件小于1024字节，转换成base64编码，写入文件里面
              limit: 1024,
              // webpack在编译图片的时候，会生成path，name，hash，ext变量，可以通过 [xx] 来引用
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
