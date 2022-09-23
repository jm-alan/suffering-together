import React, { useEffect, useState } from 'react';

import Join from './Join';
import Create from './Create';

import './newHouse.css';

export default function NewHouse () {
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState(null);

  const forward = () => {
    setPage(prev => prev + 1);
  };

  const backward = () => {
    setPage(prev => prev - 1);
    setTimeout(setMode, 500, null);
  };

  const showJoin = () => {
    setMode('join');
    forward();
  };

  const showCreate = () => {
    setMode('create');
    forward();
  };

  useEffect(() => () => {
    setPage(0);
    setMode(null);
  }, [setPage, setMode]);

  return (
    <>
      {page
        ? (
          <button className='modal-floater top-left' onClick={backward}>
            {'<'}
          </button>
          )
        : null}
      <div id='new-house-scroll-control'>
        <div
          id='new-house-sliding-container'
          style={{
            left: `-${80 * page}vw`
          }}
        >
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
            {(() => {
              switch (mode) {
                case 'join':
                  return <Join />;
                case 'create':
                  return <Create />;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
