import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllResidents } from '../../../store/houses';

export default function CurrentResidents () {
  const dispatch = useDispatch();

  const { id: houseID } = useSelector(state => state.houses.current);
  const currentResidents = useSelector(state => state.houses.currentResidents);
  const residentsLoaded = useSelector(state => state.houses.residentsLoaded);

  useEffect(() => {
    if (!residentsLoaded) {
      dispatch(getAllResidents(houseID));
    }
  }, [dispatch, houseID, residentsLoaded]);
  return (
    <div className='current-residence-subcontainer top'>
      {Object.values(currentResidents).filter($ => $).map(({ id, firstName }) => (
        <div key={id} className='residence-subcontainer-entry resident'>
          {firstName}
        </div>
      ))}
    </div>
  );
}
