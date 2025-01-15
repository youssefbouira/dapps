const path = require('path');

module.exports = {
  mode: 'development',
  // Source file to compile and pack
  entry: './client/index.js',
  // Destination path & name to store the packaged file
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js', // string
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080
  }
};