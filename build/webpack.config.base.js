
// node js 路径模块
const path = require('path')
// node js 文件模块
const glob = require('glob')
const webpack = require('webpack')
// 消除冗余的css
const PurifyCssWebpack = require('purifycss-webpack')
// html模板
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 静态资源输出
const CopyWebpackPlugin = require('copy-webpack-plugin')

// vue loader正常使用插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 判断开发环境
const isDev = process.env.NODE_ENV === 'development'

// 获取html-webpack-plugin参数的方法
const getHtmlConfig = (name, chunks) => {
  return {
    template: `./src/pages/${name}/index.html`,
    filename: `${name}.html`,
    // favicon: './favicon.ico',
    // title: title,
    inject: true,
    hash: true, // 开启hash  ?[hash]
    chunks: chunks,
    minify: isDev ? false : {
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true, // 去除属性引用
    },
  }
}

function getEntry() {
  var entry = {}
  // 读取src目录所有page入口
  glob.sync('./src/pages/**/*.js')
    .forEach(function(name) {
      var start = name.indexOf('src/') + 4
      var end = name.length - 3
      var eArr = []
      var n = name.slice(start, end)
      n = n.slice(0, n.lastIndexOf('/')) // 保存各个组件的入口
      n = n.split('/')[1]
      eArr.push(path.resolve(__dirname, '.' + name))
      entry[n] = eArr
    })
  return entry
}
// webpack 配置
const config = {
  mode: isDev ? 'development' : 'production',
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.[hash:8].js', // dev环境使用chunkHash会报错
    // chunkFilename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', ' .vue', '.jsx', '.json'],
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  // 提取公共代码
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      minSize: 30000,
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: { // 抽离自己写的公共代码，common这个名字可以随意起
          chunks: 'initial',
          name: 'common', // 任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    // 全局暴露统一入口
    // new webpack.ProvidePlugin({

    // }),
    // 静态资源输出
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/assets'),
      to: './assets',
      ignore: ['.*']
    }]),
    // 消除冗余的css代码
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, '../src/pages/*/*.html'))
    })
  ],
}

// 配置页面
const entryObj = getEntry()
const htmlArray = []
Object.keys(entryObj).forEach(element => {
  htmlArray.push({
    _html: element,
    title: '',
    chunks: ['vendor', 'common', element]
  })
})

// 自动生成html模板
htmlArray.forEach((element) => {
  config.plugins.push(new HTMLWebpackPlugin(getHtmlConfig(element._html, element.chunks)))
})

module.exports = config
