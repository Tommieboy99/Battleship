const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', //entry point
  output: {
    filename: 'bundle.js', //output file
    path: path.resolve(__dirname, 'dist'),
    clean: true, //cleans old dist files before build
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // your base HTML file
      filename: 'index.html', // output in /dist
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // order matters! right-to-left. Optional: For production, consider mini-css-extract-plugin to output a separate CSS file instead of embedding in JS.
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
