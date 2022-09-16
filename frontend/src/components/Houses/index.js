import React from 'react';
import { useSelector } from 'react-redux';
import LoadingLock from '../Loading/LoadingLock';

export default function Houses () {
  const loaded = useSelector(state => state.houses.loaded);
  const houses = useSelector(state => state.houses.all);

  return loaded
    ? (
      <>
        <button className='new-item-floater'>
          <span className='material-symbols-outlined'>
            add
          </span>
        </button>
        {Object.values(houses).filter($ => $).map(house => (
          <div key={house.id}>
            {house.name}
          </div>
        ))}
      </>
      )
    : <LoadingLock />;
}
