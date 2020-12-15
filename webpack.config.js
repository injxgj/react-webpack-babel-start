const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      { // 1
        test: /\.(js|jsx)$/, // 빌드할 파일 정규식
        exclude: /node_modules/, // 제외할 파일 정규식
        use: {
          loader: 'babel-loader', // 사용할 로더이름
        },
      },
      { // 2
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {  // 로더 옵션
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // npm i -D file-loader
      {
        test: /\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]' // 이미지 이름을 동적으로 설정해주도록
            //publicPath: '../dist' //이미지를 가져올 때는 dist 폴더에 있는 거를 가져와야함. (이거는 htmlwebpackplugin 설정 이전에 해준거고 설정 이후에는 자동으로 해줘서 필요 없음)
          }
        }]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
      : []),
  ],
  devServer: {
    host: "localhost",
    overlay: true,
    port: 8081,
    hot: true,
    open: true, // dev sever 구동 후 브라우저 열기
  },
  devtool: 'inline-source-map',
  mode: 'development'
}