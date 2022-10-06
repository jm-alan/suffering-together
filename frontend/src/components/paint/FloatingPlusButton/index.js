import React from 'react';
import { useSelector } from 'react-redux';

import './plus.css';

export default function FloatingPlusButton ({ onClick }) {
  const enablePlus = useSelector(state => state.UX.enablePlus);
  const showPlus = useSelector(state => state.UX.showPlus);

  return (
    <button
      className={`new-item-floater${(enablePlus && showPlus) ? ' show' : ' hide'}`}
      onClick={onClick}
    >
      <span className='material-symbols-outlined'>
        add
      </span>
    </button>
  );
}
