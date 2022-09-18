const { WebSocket: { WebSocket } } = require('ws');

WebSocket.prototype.serialize = function (internalName = 'message', payload = {}) {
  this.send(JSON.stringify({ internalName, payload }));
};
