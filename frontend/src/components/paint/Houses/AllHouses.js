import React from 'react';
import { useSelector } from 'react-redux';

import HouseEntry from './HouseEntry';

export default function AllHouses () {
  const houses = useSelector(state => state.houses.all);

  return (
    <div className='residence-subcontainer left'>
      {Object.values(houses).filter($ => $).map(house => (
        <HouseEntry key={house.id} house={house} />
      ))}
    </div>
  );
}
