import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlusController } from '../../../store/UX/plus';

import HouseEntry from './HouseEntry';

export default function AllHouses () {
  const dispatch = useDispatch();

  const houses = useSelector(state => state.houses.all);

  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(setPlusController(scrollRef.current));
  }, [dispatch]);

  return (
    <div className='residence-subcontainer left' ref={scrollRef}>
      {Object.values(houses).filter($ => $).map(house => (
        <HouseEntry key={house.id} house={house} />
      ))}
      {(new Array(1000)).fill('').map((_, idx) => (
        <div
          key={idx}
          className='house-entry'
        >
          Fake house {idx}
        </div>))}
    </div>
  );
}
