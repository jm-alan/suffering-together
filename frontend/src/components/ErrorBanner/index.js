import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearErrors } from '../../store/errors';

import './errorBanner.css';

export default function ErrorBanner () {
  const dispatch = useDispatch();

  const currentErrors = useSelector(state => state.errors.current);

  const clearAndClose = () => {
    dispatch(clearErrors());
  };

  return currentErrors.length
    ? (
      <div id='error-banner'>
        <div id='scrolling-error-container'>
          {currentErrors.map((err, idx) => (
            <div
              className='error'
              key={idx}
            >
              {err}
            </div>
          ))}
        </div>
        <div
          id='error-banner-close'
          onClick={clearAndClose}
        >
          X
        </div>
      </div>
      )
    : null;
}
