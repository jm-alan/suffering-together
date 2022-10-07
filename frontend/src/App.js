import React, { lazy, useEffect, useRef, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LoadingLock from './components/paint/Loading/LoadingLock';
import Houses from './components/paint/Houses';
import throttle from './utils/throttle';
import { restore } from './store/session';
import { hidePlus, showPlus } from './store/UX';

import './index.css';
import TempLoadingPruner from './components/logic/TempLoadingPruner';

const AuthMonitor = lazy(() => import('./components/logic/AuthMonitor'));
const Home = lazy(() => import('./components/paint/Home'));
const NavBar = lazy(() => import('./components/paint/NavBar'));
const LoginForm = lazy(() => import('./components/paint/Auth/LoginForm'));
const SignupForm = lazy(() => import('./components/paint/Auth/SignupForm'));

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
    dispatch(restore());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
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
              <Route
                path='/residences/:houseID'
                element={
                  <Suspense fallback={<LoadingLock name='residences' />}>
                    <Houses houseSelected />
                  </Suspense>
              }
              />
            </Routes>
          </div>
          <Suspense fallback={<LoadingLock name='navbar' />}>
            <NavBar />
          </Suspense>
        </div>
        <Suspense fallback={<LoadingLock name='rebound monitor' />}>
          <ReboundMonitor />
        </Suspense>
      </BrowserRouter>
      <Suspense fallback={<LoadingLock name='auth monitor' />}>
        <AuthMonitor />
      </Suspense>
      <TempLoadingPruner />
    </>
  );
}
