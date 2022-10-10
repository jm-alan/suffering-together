import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import UUIDpattern from '../../../utils/UUIDpattern';
import AllHouses from './AllHouses';
import CurrentHouse from './CurrentHouse';
import EnablePlus from '../../logic/EnablePlus';

export default function SlidingHouseContainer ({ houseSelected = false }) {
  const { houseID } = useParams();

  const isUUID = !!houseSelected && !!houseID && !!houseID.match(UUIDpattern);

  if (houseSelected && !isUUID) {
    return <Navigate to='/residences' />;
  }

  return (
    <div id='residence-scroll-control'>
      <div
        id='residence-sliding-container'
        className={houseSelected ? 'reveal' : 'hide'}
      >
        <AllHouses />
        <CurrentHouse />
        {houseSelected ? null : <EnablePlus />}
      </div>
    </div>
  );
}
