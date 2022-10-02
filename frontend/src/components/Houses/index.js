import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import FloatingPlusButton from '../FloatingPlusButton';
import LoadingLock from '../Loading/LoadingLock';
import NewHouse from '../NewHouse';
import { getAllhouses } from '../../store/houses';
import { setModal, showModal } from '../../store/UX';

import './houses.css';

export default function Houses () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);
  const loaded = useSelector(state => state.houses.loaded);
  const houses = useSelector(state => state.houses.all);

  const popNewHouse = () => {
    dispatch(setModal(NewHouse));
    dispatch(showModal());
  };

  useEffect(() => {
    if (sessionLoaded && user) dispatch(getAllhouses());
  }, [dispatch, sessionLoaded, user]);

  if (sessionLoaded && !user) {
    return <Navigate to='/login' />;
  }

  return loaded
    ? (
      <>
        <FloatingPlusButton onClick={popNewHouse} />
        {Object.values(houses).filter($ => $).map(house => (
          <div className='house-entry' key={house.id}>
            {house.name}
          </div>
        ))}
      </>
      )
    : <LoadingLock name='houses list' />;
}
