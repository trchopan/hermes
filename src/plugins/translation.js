export default {
  install(Vue) {
    Vue.prototype.$translate = (languagesMap, code) => {
      let map = {};
      for (let key in languagesMap) {
        map[key] =
          languagesMap[key] && languagesMap[key][code]
            ? languagesMap[key][code]
            : "(no translation)";
      }
      return map;
    };
  }
};
