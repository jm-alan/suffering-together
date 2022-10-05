import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { clearCurrent, getAllResidents, setCurrent } from '../../store/houses';

export default function CurrentHouse () {
  const dispatch = useDispatch();
  const { houseID } = useParams();

  const currentHouse = useSelector(state => state.houses.current);
  const currentLoaded = useSelector(state => state.houses.currentLoaded);
  const currentResidents = useSelector(state => state.houses.currentResidents);
  const residentsLoaded = useSelector(state => state.houses.residentsLoaded);

  useEffect(() => {
    if (houseID && !currentLoaded) {
      dispatch(setCurrent(houseID));
    } else if (!houseID) {
      setTimeout(() => {
        dispatch(clearCurrent());
      }, 500);
    }
  }, [dispatch, houseID, currentLoaded]);

  useEffect(() => {
    if (houseID && !residentsLoaded) {
      dispatch(getAllResidents(houseID));
    }
  }, [dispatch, houseID, residentsLoaded]);

  if (houseID && currentLoaded && !currentHouse) {
    return <Navigate to='/residences' />;
  }

  return currentHouse && (
    <div className='residence-subcontainer right'>
      <h1>{currentHouse.name}</h1>
      <h1>Residents</h1>
      <div id='house-residents-container'>
        {Object.values(currentResidents).filter($ => $).map(({ id, firstName }) => (
          <div key={id} className='resident-entry'>
            {firstName}
          </div>
        ))}
      </div>
    </div>
  );
}
