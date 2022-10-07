export const devlog = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

export const deverr = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args);
  }
};
