const sharedTranslate = {
  unknownError: {
    vi: "Lỗi không xác định. Vui lòng liên hệ admin.",
    en: "Unknown Error. Please contact admin."
  }
};

export default {
  install(Vue) {
    // Convert from { key: { value: [value] } } to { key: [value] }
    Vue.prototype.$translate = (languagesMap, countryCode) => {
      let result = {};
      const map = { ...languagesMap, ...sharedTranslate };
      for (let key in map) {
        result[key] =
          map[key] && map[key][countryCode]
            ? map[key][countryCode]
            : "(no translation)";
      }

      return result;
    };
    Vue.prototype.$format = (str, inputs) => {
      if (
        typeof str !== "string" ||
        typeof inputs === "string" ||
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
