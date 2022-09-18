/* eslint-disable no-extend-native */

window.WebSocket.prototype.serialize = function (internalName = 'message', payload = {}) {
  this.send(JSON.stringify({ internalName, payload }));
};
