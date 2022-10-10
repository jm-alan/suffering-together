import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hidePlus, showPlus } from '../../../store/UX/plus';

import throttle from '../../../utils/throttle';

import './plus.css';

export default function FloatingPlusButton () {
  const dispatch = useDispatch();

  const enabled = useSelector(state => state.UX.plus.enabled);
  const show = useSelector(state => state.UX.plus.show);
  const action = useSelector(state => state.UX.plus.action);
  const controller = useSelector(state => state.UX.plus.controller);

  const mutableScrollTracker = useRef(0);

  useEffect(() => {
    const handleScroll = throttle('handleScroll', ({ target: { scrollTop } }) => {
      if (scrollTop > mutableScrollTracker.current) {
        dispatch(hidePlus());
      } else if (scrollTop < mutableScrollTracker.current) {
        dispatch(showPlus());
      }
      mutableScrollTracker.current = scrollTop;
    }, 50);
    controller?.addEventListener('scroll', handleScroll);
    return () => {
      controller?.removeEventListener('scroll', handleScroll);
    };
  }, [controller, mutableScrollTracker]);

  if (enabled && show && !action) {
    throw new Error('Floating plus praxis disrespected; button mounted with no action');
  }

  if (enabled && show && !controller) {
    throw new Error('Floating plus praxis disrespected; button mounted with no controller');
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
