const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //env.test 0r env.development

if(process.env.NODE_ENV === 'test'){
  require('dotenv').config({path: '.env.test'});
}else if(process.env.NODE_ENV === 'development'){
  require('dotenv').config({path: '.env.development'});
}
module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  return {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: CSSExtract.extract({
        use: [
          {
            loader : 'css-loader', 
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader', 
            options: {
              sourceMap: true
            }
          }
      ]})
    }]
  },
  plugins: [CSSExtract,
  new webpack.DefinePlugin({
    'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
    'process.env.FIREBASE_API_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_API_AUTH_DOMAIN),
    'process.env.FIREBASE_API_DATABASE_URL': JSON.stringify(process.env.FIREBASE_API_DATABASE_URL),
    'process.env.FIREBASE_API_PROJECT_ID': JSON.stringify(process.env.FIREBASE_API_PROJECT_ID),
    'process.env.FIREBASE_API_STOREGE_BUCKET': JSON.stringify(process.env.FIREBASE_API_STOREGE_BUCKET),
    'process.env.FIREBASE_API_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_API_MESSAGING_SENDER_ID)
  })
  ],

  devtool: isProduction ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true, //used to serve index.html when 404 eg: /create,
    publicPath: '/dist/'
  }
}
};
