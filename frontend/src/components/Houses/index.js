import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import FloatingPlusButton from '../FloatingPlusButton';
import LoadingLock from '../Loading/LoadingLock';
import NewHouse from '../NewHouse';
import { getAllhouses } from '../../store/houses';
import { setModal, showModal } from '../../store/UX';

import './houses.css';
import HouseEntry from './HouseEntry';

export default function Houses () {
  const dispatch = useDispatch();
  const { houseID } = useParams();
  console.log(houseID);
  console.log(!!houseID.match(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/));

  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);
  const housesLoaded = useSelector(state => state.houses.loaded);
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

  return housesLoaded
    ? (
      <>
        <FloatingPlusButton onClick={popNewHouse} />
        <div id='residence-scroll-control'>
          <div
            id='residence-sliding-container'
          >
            <div className='residence-subcontainer left'>
              {Object.values(houses).filter($ => $).map(house => (
                <HouseEntry key={house.id} house={house} />
              ))}
            </div>
            <div className='residence-subcontainer right'>
              <h1>Placeholder right</h1>
            </div>
          </div>
        </div>
      </>
      )
    : <LoadingLock name='houses list' />;
}
