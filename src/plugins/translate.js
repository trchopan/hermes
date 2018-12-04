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
    Vue.prototype.$format = (str, inputs) => {
      if (
        typeof str !== "string" ||
        !inputs ||
        !inputs.hasOwnProperty("length")
      ) {
        return str;
      }
      let result = str;
      inputs.forEach(
        (input, index) => (result = result.replace(`{${index}}`, input))
      );
      return result;
    };
  }
};
