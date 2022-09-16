import * as types from './uxActionTypes';

export const showModal = () => ({
  type: types.SHOW_MODAL
});

export const hideModal = () => ({
  type: types.HIDE_MODAL
});

export const setModal = currentModal => ({
  type: types.SET_MODAL,
  currentModal
});

export const clearModal = () => ({
  type: types.CLEAR_MODAL
});

export const setMooring = modalMooring => ({
  type: types.SET_MOORING,
  modalMooring
});

export const lockLoading = () => ({
  type: types.LOCK_LOADING
});

export const unlockLoading = () => ({
  type: types.UNLOCK_LOADING
});
