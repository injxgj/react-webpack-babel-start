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