const NO_TRANSLATION = "(no translation)";
const SHARED_TRANSLATE = {
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
      const map = { ...languagesMap, ...SHARED_TRANSLATE };
      for (let key in map) {
        if (!map[key]) {
          result[key] = NO_TRANSLATION;
          continue;
        }
        if (map[key]["all"]) {
          result[key] = map[key]["all"];
          continue;
        }
        result[key] = map[key][countryCode] || "(no translation)";
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
