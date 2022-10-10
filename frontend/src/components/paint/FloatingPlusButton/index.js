import React from 'react';
import { useSelector } from 'react-redux';

import './plus.css';

export default function FloatingPlusButton ({ onClick }) {
  const enabled = useSelector(state => state.UX.plus.enabled);
  const show = useSelector(state => state.UX.plus.show);

  return (
    <button
      className={`new-item-floater${(enabled && show) ? ' show' : ' hide'}`}
      onClick={onClick}
    >
      <span className='material-symbols-outlined'>
        add
      </span>
    </button>
  );
}
