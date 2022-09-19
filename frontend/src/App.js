import React, { lazy, useEffect, useRef, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoadingLock from './components/Loading/LoadingLock';
import csrfetch from './utils/csrfetch';
import { restore } from './store/session';

import './index.css';
import Houses from './components/Houses';
import throttle from './utils/throttle';
import { hidePlus, showPlus } from './store/UX';

const Home = lazy(() => import('./components/Home'));
const NavBar = lazy(() => import('./components/NavBar'));
const LoginForm = lazy(() => import('./components/Auth/LoginForm'));
const SignupForm = lazy(() => import('./components/Auth/SignupForm'));

export default function App () {
  const dispatch = useDispatch();

  const mutableScrollTracker = useRef(0);

  const handleScroll = throttle('handleScroll', ({ target: { scrollTop } }) => {
    if (scrollTop > mutableScrollTracker.current) {
      dispatch(hidePlus());
    } else if (scrollTop < mutableScrollTracker.current) {
      dispatch(showPlus());
    }
    mutableScrollTracker.current = scrollTop;
  }, 50);

  useEffect(() => {
    csrfetch.captureDispatch(dispatch);
    dispatch(restore());
  }, [dispatch]);

  return (
    <div id='main'>
      <div id='router-container' onScroll={handleScroll}>
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/home' />}
          />
          <Route
            path='/home'
            element={(
              <Suspense fallback={<LoadingLock name='home' />}>
                <Home />
              </Suspense>
            )}
          />
          <Route
            path='/login'
            element={(
              <Suspense fallback={<LoadingLock name='login' />}>
                <LoginForm />
              </Suspense>
            )}
          />
          <Route
            path='/signup'
            element={(
              <Suspense fallback={<LoadingLock name='signup' />}>
                <SignupForm />
              </Suspense>
            )}
          />
          <Route
            path='/residences'
            element={
              <Suspense fallback={<LoadingLock name='residences' />}>
                <Houses />
              </Suspense>
            }
          />
        </Routes>
      </div>
      <NavBar />
    </div>
  );
}
