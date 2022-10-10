import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LoadingLock from '../Loading/LoadingLock';
import { getAllhouses } from '../../../store/houses';
import { disablePlus, enablePlus } from '../../../store/UX/plus';
import { setModal, showModal } from '../../../store/UX/modal';

import './houses.css';

const SlidingHouseContainer = lazy(() => import('./SlidingHouseContainer'));

export default function Houses ({ houseSelected }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);
  const housesLoaded = useSelector(state => state.houses.allLoaded);

  const popNewHouse = async () => {
    dispatch(setModal(await import('../NewHouse')));
    dispatch(showModal());
  };

  useEffect(() => {
    if (sessionLoaded && user) dispatch(getAllhouses());
  }, [dispatch, sessionLoaded, user]);

  useEffect(() => {
    if (houseSelected) dispatch(disablePlus());
    else dispatch(enablePlus());
  }, [dispatch, houseSelected]);

  if (sessionLoaded && !user) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {housesLoaded
        ? (
          <Suspense fallback={<LoadingLock name='residences sliding container' />}>
            <SlidingHouseContainer houseSelected={houseSelected} />
          </Suspense>
          )
        : <LoadingLock name='houses list fetch' />}
    </>
  );
}
