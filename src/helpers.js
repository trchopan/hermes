import Vue from "vue";

export const logger = className => (message, ...objects) => {
  process.env.NODE_ENV === "development" &&
    console.log(
      `%c${className}`,
      "background: #eeeeee, color: white;",
      message,
      ...objects
    );
};

export const translate = (languagesMap, code) => {
  let map = {};
  for (let key in languagesMap) {
    map[key] =
      languagesMap[key] && languagesMap[key][code]
        ? languagesMap[key][code]
        : "(no translation)";
  }
  return map;
};

export function debounce(func, delay) {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}

export function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

Vue.prototype.$helpers = {
  logger,
  translate,
  debounce,
  shuffle
};
