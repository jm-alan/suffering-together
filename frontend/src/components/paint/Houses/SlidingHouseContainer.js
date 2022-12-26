import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import UUIDpattern from '../../../utils/UUIDpattern';
import AllHouses from './AllHouses';
import CurrentHouse from './CurrentHouse';
import EnablePlus from '../../logic/EnablePlus';

export default function SlidingHouseContainer ({ selected = false }) {
  const { houseID } = useParams();

  const isUUID = !!selected && !!houseID && !!houseID.match(UUIDpattern);

  if (selected && !isUUID) {
    return <Navigate to='/residences' />;
  }

  return (
    <div id='residence-scroll-control'>
      <div
        id='residence-sliding-container'
        className={selected ? 'reveal' : 'hide'}
      >
        <AllHouses />
        <CurrentHouse />
        {selected ? null : <EnablePlus />}
      </div>
    </div>
  );
}
