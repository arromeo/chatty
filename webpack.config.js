var path = require('path')

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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        include: [/node_modules/, path.join(__dirname, 'styles')],
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
