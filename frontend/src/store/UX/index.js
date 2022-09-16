import * as types from './uxActionTypes';

export default function reducer (
  state = {
    showModal: false,
    currentModal: null,
    modalMooring: null,
    loadingLock: 0
  },
  {
    type,
    currentModal,
    modalMooring
  }
) {
  switch (type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        showModal: true
      };
    case types.HIDE_MODAL:
      return {
        ...state,
        showModal: false
      };
    case types.SET_MODAL:
      return {
        ...state,
        currentModal
      };
    case types.CLEAR_MODAL:
      return {
        ...state,
        currentModal: null
      };
    case types.SET_MOORING:
      return {
        ...state,
        modalMooring
      };
    default:
      return state;
  }
}
