import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import loadingLockable from '../../../utils/renderControls/loadingLockable';
import LoadingLock from '../Loading/LoadingLock';
import { getAllhouses } from '../../../store/houses';
import { clearPlusAction, hidePlus, setPlusAction, showPlus } from '../../../store/UX/plus';
import { clearModal, hideModal, setModal, setOnClose, showModal } from '../../../store/UX/modal';

import './houses.css';
import { useLogger } from '../../../utils/logging';

const SlidingHouseContainer = lazy(() => import('./SlidingHouseContainer'));
const NewHouse = lazy(() => import('../NewHouse'));

export default function NavigableHouses ({ adding = false, creating = false, joining = false, selected }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (adding || creating || joining) {
      const onClose = () => navigate('/residences');
      dispatch(setOnClose(onClose));
      dispatch(setModal(() => loadingLockable(NewHouse, 'new house modal', { adding, creating, joining })));
      dispatch(showModal());
    }
    return () => {
      if (!adding && !creating && !joining) {
        dispatch(clearModal());
        dispatch(hideModal());
      }
    };
  }, [adding, creating, joining, dispatch]);

  useLogger({ adding, creating, joining });

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
