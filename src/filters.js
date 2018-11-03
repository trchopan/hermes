import Vue from "vue";

export const filters = {
  titleCase: str => {
    if (typeof str !== "string") {
      return "";
    }
    return str
      .toLowerCase()
      .split(" ")
      .map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  },
  format: (str, inputs) => {
    if (typeof str !== "string" || inputs.length === undefined) {
      return "";
    }
    let result = str;
    inputs.forEach(
      (input, index) => (result = result.replace(`{${index}}`, input))
    );
    return result;
  }
};

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
