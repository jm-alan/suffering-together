import React, { useEffect, useRef, useState } from 'react';

import Join from './Join';
import Create from './Create';

import './newHouse.css';

export default function NewHouse ({ creating, joining }) {
  const [shouldShowCreate, setShouldShowCreate] = useState(creating);
  const [shouldShowJoin, setShouldShowJoin] = useState(joining);

  const backButtonRef = useRef(null);
  const slidingContainerRef = useRef(null);

  let modeTimeout;

  const forward = () => {
    backButtonRef.current.classList.remove('hidden');
    slidingContainerRef.current.classList.add('slide');
  };

  const backward = () => {
    backButtonRef.current.classList.add('hidden');
    slidingContainerRef.current.classList.remove('slide');
    window.history.pushState(null, '', '/residences/add');
    modeTimeout = setTimeout(() => {
      setShouldShowCreate(false);
      setShouldShowJoin(false);
    }, 500);
  };

  const showCreate = () => {
    clearTimeout(modeTimeout);
    window.history.pushState(null, '', '/residences/new');
    setShouldShowJoin(false);
    setShouldShowCreate(true);
    forward();
  };

  const showJoin = () => {
    clearTimeout(modeTimeout);
    window.history.pushState(null, '', '/residences/join');
    setShouldShowCreate(false);
    setShouldShowJoin(true);
    forward();
  };

  useEffect(() => {
    if (creating || joining) {
      forward();
    }
  }, [creating, joining]);

  return (
    <>
      <button
        ref={backButtonRef}
        className='modal-floater top-left hidden'
        onClick={backward}
      >
        {'<'}
      </button>
      <div id='new-house-scroll-control'>
        <div ref={slidingContainerRef} id='new-house-sliding-container'>
          <div className='new-house-sliding-subcontainer'>
            <div id='new-house-mode-select-container'>
              <button
                className='new-house-mode-select'
                onClick={showJoin}
              >
                Join a Residence
              </button>
              <button
                className='new-house-mode-select'
                onClick={showCreate}
              >
                Create a New Residence
              </button>
            </div>
          </div>
          <div className='new-house-sliding-subcontainer'>
            {shouldShowCreate && <Create />}
            {shouldShowJoin && <Join />}
          </div>
        </div>
      </div>
    </>
  );
}
