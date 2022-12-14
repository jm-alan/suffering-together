import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';

import LoadingLock from './components/paint/Loading/LoadingLock';
import store from './store';
import csrfetch from './utils/csrfetch';
import { setMooring } from './store/UX/modal';

import './utils/prototypes';

const App = lazy(() => import('./App'));
const PageLoading = lazy(() => import('./components/paint/Loading/PageLoading'));
const ErrorBanner = lazy(() => import('./components/paint/ErrorBanner'));

if (process.env.NODE_ENV === 'development') {
  window.store = store;
  window.csrfetch = csrfetch;
}

const Root = () => {
  const dispatch = useDispatch();

  const mooringRef = useRef(null);

  useEffect(() => {
    dispatch(setMooring(mooringRef.current));
  }, [dispatch, mooringRef]);

  return (
    <>
      <Suspense fallback={<LoadingLock name='error banner' />}>
        <ErrorBanner />
      </Suspense>
      <Suspense fallback={<LoadingLock name='core app' />}>
        <App />
      </Suspense>
      <PageLoading />
      <div ref={mooringRef} id='mooring' />
    </>
  );
};

const concurrentRoot = createRoot(document.getElementById('react-root'));
concurrentRoot.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
