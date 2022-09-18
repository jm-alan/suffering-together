import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { setMooring } from './store/UX';
import App from './App';
import ErrorBanner from './components/ErrorBanner';
import store from './store';
import csrfetch from './utils/csrfetch';
import Modal from './components/Modal';
import PageLoading from './components/Loading/PageLoading';

import './utils/prototypes';

if (process.env.NODE_ENV === 'development') {
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
      <ErrorBanner />
      <App />
      <Modal />
      <PageLoading />
      <div ref={mooringRef} id='mooring' />
    </>
  );
};

const concurrentRoot = createRoot(document.getElementById('react-root'));
concurrentRoot.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>
);
