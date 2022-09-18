const { verify } = require('jsonwebtoken');
const { WebSocketServer } = require('ws');

const cookieKVParser = require('../utils/processing/cookieKVParser');
const extractSymbolKey = require('../utils/processing/extractSymbolKey');
const eventHandlers = require('./eventHandlers');
const { jwtConfig: { secret } } = require('../config/server');
const { User } = require('../db/models');

const wss = new WebSocketServer({ noServer: true });
wss.on('connection', (socket, req, user) => {
  socket.serialize('something');
  eventHandlers.forEach(([event, fn]) => {
    socket.addEventListener('message', (messageObj) => {
      const dataKey = extractSymbolKey('kData', messageObj);
      if (!dataKey) return;
      try {
        const { internalName, payload } = JSON.parse(messageObj[dataKey].toString());
        if (internalName === event) fn(user, payload);
      } catch {}
    });
  });
});

module.exports = async (req, socket, head) => {
  const headers = req.rawHeaders;
  if (!headers || !headers.length) {
    socket.destroy();
    return;
  }
  const cookies = headers[headers.indexOf('Cookie') + 1];
  if (!cookies) {
    socket.destroy();
    return;
  }
  const { token } = cookieKVParser(cookies);
  if (!token) {
    socket.destroy();
    return;
  }
  try {
    const { userID } = verify(token, secret);
    const user = await User.findByPk(+userID);
    wss.handleUpgrade(req, socket, head, (upSocket) => {
      wss.emit('connection', upSocket, req, user);
    });
  } catch {
    socket.destroy();
  }
};
