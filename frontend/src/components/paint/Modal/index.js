import React, { Suspense, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clearModal, hideModal } from '../../../store/UX/modal';
import LoadingLock from '../Loading/LoadingLock';

import './modal.css';

export default function Modal () {
  const dispatch = useDispatch();

  const showModal = useSelector(state => state.UX.modal.show);
  const modalMooring = useSelector(state => state.UX.modal.mooring);
  const onClose = useSelector(state => state.UX.modal.onClose);
  const current = useSelector(state => state.UX.modal.current);

  const Component = typeof current === 'function' ? current : () => current;

  const resist = e => {
    e.stopPropagation();
  };

  const clearAndClose = () => {
    onClose && onClose();
    dispatch(clearModal());
    dispatch(hideModal());
  };

  useEffect(() => {
    const handleEscape = ({ keyCode }) => {
      if (keyCode === 27) {
        clearAndClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dispatch]);

  return showModal && Component && createPortal(
    <div
      id='modal-background'
      onClick={clearAndClose}
    >
      <div
        id='modal-content'
        onClick={resist}
      >
        <button
          className='modal-floater top-right'
          onClick={clearAndClose}
        >
          X
        </button>
        <Suspense fallback={<LoadingLock name='modal content' />}>
          <Component />
        </Suspense>
      </div>
    </div>,
    modalMooring
  );
}
