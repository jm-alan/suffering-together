import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Rebound from './Rebound';

export default function ProtectedRoute ({ path, children }) {
  const user = useSelector(state => state.session.user);

  return (
    <Route
      path={path}
      element={(
        user
          ? children
          : <Rebound from={path} to='/login' />
      )}
    />
  );
}
