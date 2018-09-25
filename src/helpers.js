export function logger(message, value, object) {
  process.env.NODE_ENV === "development" &&
    console.log(
      message,
      object === true
        ? value
        : value !== undefined
          ? JSON.stringify(value, null, 2)
          : ""
    );
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
