var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: ['webpack-dev-server/client?http://localhost:3000', './src/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        include: [/node_modules/, path.join(__dirname, 'styles')],
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
