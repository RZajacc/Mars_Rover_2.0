const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    content: './src/content.ts',
    contact: './src/contact.ts'
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    // filename: 'contact.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  }
}
