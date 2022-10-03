/* eslint-disable no-extend-native */
RegExp.prototype.concat = function (pattern) {
  if (!pattern || !(pattern instanceof RegExp)) return this;
  return new RegExp(this.source + pattern.source);
};
