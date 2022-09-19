import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllhouses } from '../../store/houses';
import FloatingPlusButton from '../FloatingPlusButton';
import LoadingLock from '../Loading/LoadingLock';

import './houses.css';

export default function Houses () {
  const dispatch = useDispatch();

  const loaded = useSelector(state => state.houses.loaded);
  const houses = useSelector(state => state.houses.all);

  useEffect(() => {
    dispatch(getAllhouses());
  }, [dispatch]);

  return loaded
    ? (
      <>
        <FloatingPlusButton />
        {Object.values(houses).filter($ => $).map(house => (
          <div key={house.id}>
            {house.name}
          </div>
        ))}
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
        <div className='house-entry'>
          Shmingy
        </div>
      </>
      )
    : <LoadingLock name='houses list' />;
}
