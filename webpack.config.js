module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: "[path][name].[ext]?[hash]"
          }
        }],
      }
    ]
  }
}
