const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    content: './src/content.ts',
    contact: './src/contact.ts'
  },
  module: {
    rules: [
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
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  }
}
