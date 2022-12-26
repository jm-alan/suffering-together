import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import LoadingLock from '../Loading/LoadingLock';
import { getAllhouses } from '../../../store/houses';
import { clearModal, hideModal, setModal, setOnClose, showModal } from '../../../store/UX/modal';
import {
  clearPlusAction,
  hidePlus,
  setPlusAction,
  showPlus
} from '../../../store/UX/plus';

import './houses.css';
import { useLogger } from '../../../utils/logging';

const SlidingHouseContainer = lazy(() => import('./SlidingHouseContainer'));

export default function NavigableHouses ({ adding = false, creating = false, joining = false, selected }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);
  const housesLoaded = useSelector(state => state.houses.allLoaded);

  useEffect(() => {
    if (sessionLoaded && user) dispatch(getAllhouses());
  }, [dispatch, sessionLoaded, user]);

  useEffect(() => {
    dispatch(setPlusAction(() => navigate('/residences/add')));
    dispatch(showPlus());
    return () => {
      dispatch(hidePlus());
      dispatch(clearPlusAction());
    };
  }, [dispatch]);

  useEffect(() => {
    if (adding) {
      dispatch(setOnClose(() => navigate('/residences')));
      dispatch(setModal(lazy(() => import('../NewHouse'))));
      dispatch(showModal());
    }
    return () => {
      dispatch(clearModal());
      dispatch(hideModal());
    };
  }, [adding, dispatch]);

  useLogger({
    adding,
    creating,
    joining,
    selected,
    location
  });

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
