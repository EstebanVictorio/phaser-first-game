let path = require('path');
let webpack = require('webpack');
const HWP = require('html-webpack-plugin');
const BABEL_TRANSFORM_OBJECT_REST_SPREAD = require("babel-plugin-transform-object-rest-spread");
const BABEL_TRANSFORM_CLASS_PROPERTIES = require("babel-plugin-transform-class-properties");
const BABEL_DYNAMIC_IMPORT = require("babel-plugin-syntax-dynamic-import");
const BABEL_TRANSFORM_RUNTIME = require("babel-plugin-transform-runtime");
let config = {
  mode: "development",
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    new HWP({
      title: "Phaser First Game",
      template: "index.ejs",
      inject: "body",
      filename: "../index.html"
    }),
  ],
  entry:{
    main: path.resolve(__dirname,"") + "/index.js"
  },
  output: {
    publicPath: "/phaser-first-game/dist/"
  },
  resolve: {
    extensions: [".js"],
    alias:{
      Settings: path.resolve(__dirname,"") + "/Settings",
      Lifespan: path.resolve(__dirname,"") + "/Lifespan",
      Enum: path.resolve(__dirname,"") + "/Settings/Enum",
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"],
            plugins: [
              BABEL_TRANSFORM_OBJECT_REST_SPREAD,
              BABEL_TRANSFORM_CLASS_PROPERTIES,
              BABEL_DYNAMIC_IMPORT,
              BABEL_TRANSFORM_RUNTIME
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

module.exports = config;