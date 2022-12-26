import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LoadingLock from '../Loading/LoadingLock';
import { getAllhouses } from '../../../store/houses';
import { setModal, showModal } from '../../../store/UX/modal';
import {
  clearPlusAction,
  hidePlus,
  setPlusAction,
  showPlus
} from '../../../store/UX/plus';

import './houses.css';

const SlidingHouseContainer = lazy(() => import('./SlidingHouseContainer'));

export default function Houses ({ creating, joining, selected }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);
  const housesLoaded = useSelector(state => state.houses.allLoaded);

  useEffect(() => {
    if (sessionLoaded && user) dispatch(getAllhouses());
  }, [dispatch, sessionLoaded, user]);

  useEffect(() => {
    const popNewHouse = () => {
      dispatch(setModal(lazy(() => import('../NewHouse'))));
      dispatch(showModal());
    };
    dispatch(setPlusAction(popNewHouse));
    dispatch(showPlus());
    return () => {
      dispatch(hidePlus());
      dispatch(clearPlusAction());
    };
  }, [dispatch]);

  if (sessionLoaded && !user) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {housesLoaded
        ? (
          <Suspense fallback={<LoadingLock name='residences sliding container' />}>
            <SlidingHouseContainer selected={selected} />
          </Suspense>
          )
        : <LoadingLock name='houses list fetch' />}
    </>
  );
}
