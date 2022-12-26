import React, { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import TempLoadingPruner from './components/logic/TempLoadingPruner';
import protectedRoute from './utils/renderControls/protectedRoute';
import { restore } from './store/session';

import './index.css';
import loadingLockable from './utils/renderControls/loadingLockable';
import NavigableHouses from './components/paint/Houses/NavigableHouses';

const Home = lazy(() => import('./components/paint/Home'));
const Modal = lazy(() => import('./components/paint/Modal'));
const Houses = lazy(() => import('./components/paint/Houses'));
const NavBar = lazy(() => import('./components/paint/NavBar'));
const AuthMonitor = lazy(() => import('./components/logic/AuthMonitor'));
const ReboundMonitor = lazy(() => import('./components/logic/ReboundMonitor'));
const LoginForm = lazy(() => import('./components/paint/Auth/LoginForm'));
const SignupForm = lazy(() => import('./components/paint/Auth/SignupForm'));
const FloatingPlusButton = lazy(() => import('./components/paint/FloatingPlusButton'));

export default function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restore());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div id='main'>
          <div id='router-container'>
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='login' element={loadingLockable(LoginForm, 'login form')} />
              <Route path='signup' element={loadingLockable(SignupForm, 'signup form')} />
              {protectedRoute('home', loadingLockable(Home, 'home'))}
              {protectedRoute('me', loadingLockable(() => <h1>Coming Soon!</h1>, 'me'))}
              {protectedRoute('residences', loadingLockable(Houses, 'residences'), [
                protectedRoute(undefined, loadingLockable(NavigableHouses, 'residenses::index'), [], true),
                protectedRoute('add', loadingLockable(NavigableHouses, 'residences::add', { adding: true })),
                protectedRoute('new', loadingLockable(NavigableHouses, 'residences::new', { creating: true })),
                protectedRoute('join', loadingLockable(NavigableHouses, 'residences::join', { joining: true })),
                protectedRoute(':houseID', loadingLockable(Houses, 'residences::id'))
              ])}
              <Route path='*' element={<Navigate to='home' />} />
            </Routes>
          </div>
          {loadingLockable(NavBar, 'navbar')}
        </div>
        {loadingLockable(ReboundMonitor, 'rebound monitor')}
        {loadingLockable(Modal, 'modal')}
      </BrowserRouter>
      {loadingLockable(FloatingPlusButton, 'plus')}
      {loadingLockable(AuthMonitor, 'auth monitor')}
      <TempLoadingPruner />
    </>
  );
}
