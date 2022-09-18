import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import getApp from '../../utils/getApp';

export const SocketContext = createContext();

export default function Socket ({ children }) {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new window.WebSocket(getApp('ws'));
    setSocket(ws);
    return () => ws.close();
  }, [dispatch, setSocket]);

  return socket && (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
