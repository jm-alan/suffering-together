import React, { lazy, useEffect, useRef, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LoadingLock from './components/paint/Loading/LoadingLock';
import TempLoadingPruner from './components/logic/TempLoadingPruner';
import throttle from './utils/throttle';
import protect from './utils/protect';
import { restore } from './store/session';
import { hidePlus, showPlus } from './store/UX';

import './index.css';

const Home = lazy(() => import('./components/paint/Home'));
const Houses = lazy(() => import('./components/paint/Houses'));
const NavBar = lazy(() => import('./components/paint/NavBar'));
const AuthMonitor = lazy(() => import('./components/logic/AuthMonitor'));
const ReboundMonitor = lazy(() => import('./components/logic/ReboundMonitor'));
const LoginForm = lazy(() => import('./components/paint/Auth/LoginForm'));
const SignupForm = lazy(() => import('./components/paint/Auth/SignupForm'));
const FloatingPlusButton = lazy(() => import('./components/paint/FloatingPlusButton'));

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
              {protect('/home', (
                <Suspense fallback={<LoadingLock name='home' />}>
                  <Home />
                </Suspense>
              ))}
              {protect('/me', (
                <Suspense fallback={<LoadingLock name='me' />}>
                  <h1>Coming Soon!</h1>
                </Suspense>
              ))}
              {protect('/residences', (
                <Suspense fallback={<LoadingLock name='residences' />}>
                  <Houses />
                </Suspense>
              ))}
              {protect('/residences/:houseID', (
                <Suspense fallback={<LoadingLock name='residences' />}>
                  <Houses houseSelected />
                </Suspense>
              ))}
              <Route path='*' element={<Navigate to='/home' />} />
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
      <Suspense fallback={<LoadingLock name='residences floating plus' />}>
        <FloatingPlusButton />
      </Suspense>
      <Suspense fallback={<LoadingLock name='auth monitor' />}>
        <AuthMonitor />
      </Suspense>
      <TempLoadingPruner />
    </>
  );
}
