export default {
  install(Vue) {
    // Convert from { key: { value: [value] } } to { key: [value] }
    Vue.prototype.$translate = (languagesMap, value) => {
      let map = {};
      for (let key in languagesMap) {
        map[key] =
          languagesMap[key] && languagesMap[key][value]
            ? languagesMap[key][value]
            : "(no translation)";
      }
      return map;
    };
  }
};
