import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import CurrentResidents from './CurrentResidents';
import { clearCurrent, setCurrent } from '../../../store/houses';

export default function CurrentHouse () {
  const dispatch = useDispatch();
  const { houseID } = useParams();

  const currentHouse = useSelector(state => state.houses.current);
  const currentLoaded = useSelector(state => state.houses.currentLoaded);

  useEffect(() => {
    if (houseID && !currentLoaded) {
      dispatch(setCurrent(houseID));
    } else if (!houseID) {
      setTimeout(() => {
        dispatch(clearCurrent());
      }, 500);
    }
  }, [dispatch, houseID, currentLoaded]);

  if (houseID && currentLoaded && !currentHouse) {
    return <Navigate to='/residences' />;
  }

  return currentHouse && (
    <div className='residence-subcontainer right'>
      <div id='current-residence-title-container'>
        <h1>{currentHouse.name}</h1>
      </div>
      <CurrentResidents />
    </div>
  );
}
