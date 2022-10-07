import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import Rebound from '../components/logic/Rebound';
import LoadingLock from '../components/paint/Loading/LoadingLock';

/**
 *
 * @param {string} path
 * @param {JSX.Element | JSX.Element[]} children
 */
export default function protect (path, children) {
  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);

  return (
    <Route
      path={path}
      element={loaded
        ? user
          ? children
          : <Rebound from={path} to='/login' />
        : <LoadingLock name={`${path} pending session restore`} />}
    />
  );
}
