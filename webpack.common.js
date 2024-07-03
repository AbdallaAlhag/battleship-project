const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: `./src/asset/BattleshipFavicon.png`,
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html', // Use a single HTML template
    //   filename: 'index.html', // Output filename (can be index.html or any other name)
    //   favicon: `./src/assets/favicon.png`,
    //   chunks: ['app', 'card'], // Include both index and card chunks
    // }),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        // generator: {
        //   filename: (pathData) => {
        //     const { filename } = pathData;
        //     if (filename.includes('feelslike')) {
        //       return 'assets/feelslike.png';
        //     } else if (filename.includes('humidity')) {
        //       return 'assets/humidity.png';
        //     } else if (filename.includes('rain')) {
        //       return 'assets/rain.png';
        //     } else if (filename.includes('wind')) {
        //       return 'assets/wind.png';
        //     }
        //     return 'assets/[name][ext]';
        //   },
        // },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
