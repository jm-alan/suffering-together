import React from 'react';
import { useSelector } from 'react-redux';

import './plus.css';

export default function FloatingPlusButton () {
  const enabled = useSelector(state => state.UX.plus.enabled);
  const show = useSelector(state => state.UX.plus.show);
  const action = useSelector(state => state.UX.plus.action);

  if (enabled && show && !action) {
    throw new Error('Floating plus praxis disrespected; button mounted with no action');
  }

  return (
    <button
      className={`new-item-floater${(enabled && show) ? ' show' : ' hide'}`}
      onClick={action}
    >
      <span className='material-symbols-outlined'>
        add
      </span>
    </button>
  );
}
