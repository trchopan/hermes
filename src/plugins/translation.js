import Vue from "vue";

const TranslationPlugin = {
  install(Vue) {
    let _language = "en";
    Vue.prototype.$t = function() {
      console.log("translation");
      return _language;
    };
    Vue.prototype.$t.changeLanguage = function(language) {
      console.log(this);
      _language = language;
    };
  }
};

Vue.use(TranslationPlugin);
