import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import Rebound from '../../components/logic/Rebound';
import LoadingLock from '../../components/paint/Loading/LoadingLock';

export default function protect (path, elements, subroutes = []) {
  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);

  return (
    <Route
      key={path}
      path={path}
      element={loaded
        ? user
          ? elements
          : <Rebound interimURL='/login' finalURL={path} />
        : <LoadingLock name={`${path} pending session restore`} />}
    >
      {subroutes}
    </Route>
  );
}
