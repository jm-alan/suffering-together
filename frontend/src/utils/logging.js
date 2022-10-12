export const devlog = process.env.NODE_ENV === 'development' ? console.log.bind(window.console) : () => {};

export const devwarn = process.env.NODE_ENV === 'development' ? console.warn.bind(window.console) : () => {};

export const deverr = process.env.NODE_ENV === 'development' ? console.error.bind(window.console) : () => {};
