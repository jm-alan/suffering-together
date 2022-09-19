import React from 'react';
import { useSelector } from 'react-redux';

import './plus.css';

export default function FloatingPlusButton () {
  const showPlus = useSelector(state => state.UX.showPlus);

  return (
    <button className={`new-item-floater${showPlus ? ' show' : ' hide'}`}>
      <span className='material-symbols-outlined'>
        add
      </span>
    </button>
  );
}
