import Vue from "vue";

export const filters = {
  titleCase: str =>
    str
      .toLowerCase()
      .split(" ")
      .map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ")
};

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
