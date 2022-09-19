import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import getApp from '../../utils/getApp';

export const SocketContext = createContext();

export default function Socket ({ children }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) return;
    const ws = new window.WebSocket(getApp('ws'));
    setSocket(ws);
    return () => ws.close();
  }, [dispatch, setSocket, user]);

  return user && socket && (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
