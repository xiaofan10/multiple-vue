const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   localIdentName: '[path]-[name]-[hash:base64:5]', // class前缀 目前不生效 15.xvue-loader以后只能在局部配置
            //   camelCase: true,
            // }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'sass-loader',
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: path.resolve(__dirname, '../src/asset/global.sass')
          //   }
          // }
        ]
      }
    ]
  },
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: '8001',
    // host: '0.0.0.0',// 可以通过127.0.0.0.1来访问，也可以通过内网ip来访问
    overlay: {
      errors: true, // 如果webpack出现什么错误会直接显示到网页上。
    },
    // historyApiFallback: {
    //   index: '/dist/index.html'
    // },
    proxy: {
      '/api': 'http://127.0.0.1:3333',
      '/user': 'http://127.0.0.1:3333'
    },
    open: true, // 自动打开浏览器
    hot: true, // 启动要配合下面两个插件的启用，不然不会生效
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
