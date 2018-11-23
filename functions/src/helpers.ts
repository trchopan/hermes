export const logger = className => (message, ...objects) => {
  console.log(className, message, ...objects);
};
