import { useContext, useEffect } from 'react';

import { SocketContext } from '.';

export default function Listener ({ eventName, children }) {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const messageHandler = ({ data }) => {
      try {
        const { internalName, payload } = JSON.parse(data);
        if (eventName === internalName) children(payload, socket);
      } catch {}
    };
    socket.addEventListener('message', messageHandler);
    return () => socket.removeEventListener('message', messageHandler);
  }, [socket, eventName, children]);

  return null;
}
