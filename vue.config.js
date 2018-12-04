process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_AUTHOR = require("./package.json").author;
process.env.VUE_APP_TITLE = "Hermes App";
process.env.VUE_APP_CAPTCHA_SCRIPT =
  "<script src='https://www.google.com/recaptcha/api.js'></script>";
process.env.VUE_APP_RECAPTCHA_KEY = "6LdaZHwUAAAAAOC1Y5cGv3txLONB41AwmyrTuJ19";

module.exports = {
  configureWebpack: {
    performance: {
      maxEntrypointSize: 1280000,
      maxAssetSize: 1280000
    }
  }
};
