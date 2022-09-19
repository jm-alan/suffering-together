const SHOW_MODAL = 'UX/SHOW_MODAL';
const HIDE_MODAL = 'UX/SHOW_MODAL';
const SET_MODAL = 'UX/SET_MODAL';
const CLEAR_MODAL = 'UX/CLEAR_MODAL';
const SET_MOORING = 'UX/SET_MOORING';
const LOCK_LOADING = 'UX/LOCK_LOADING';
const UNLOCK_LOADING = 'UX/UNLOCK_LOADING';
const SHOW_PLUS = 'UX/SHOW_PLUS';
const HIDE_PLUS = 'UX/HIDE_PLUS';

export const showModal = () => ({
  type: SHOW_MODAL
});

export const hideModal = () => ({
  type: HIDE_MODAL
});

export const setModal = currentModal => ({
  type: SET_MODAL,
  currentModal
});

export const clearModal = () => ({
  type: CLEAR_MODAL
});

export const setMooring = modalMooring => ({
  type: SET_MOORING,
  modalMooring
});

export const lockLoading = () => ({
  type: LOCK_LOADING
});

export const unlockLoading = () => ({
  type: UNLOCK_LOADING
});

export const showPlus = () => ({
  type: SHOW_PLUS
});

export const hidePlus = () => ({
  type: HIDE_PLUS
});

export default function reducer (
  state = {
    showModal: false,
    currentModal: null,
    modalMooring: null,
    loadingLock: 0,
    showPlus: true
  },
  {
    type,
    currentModal,
    modalMooring
  }
) {
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false
      };
    case SET_MODAL:
      return {
        ...state,
        currentModal
      };
    case CLEAR_MODAL:
      return {
        ...state,
        currentModal: null
      };
    case SET_MOORING:
      return {
        ...state,
        modalMooring
      };
    case SHOW_PLUS:
      return {
        ...state,
        showPlus: true
      };
    case HIDE_PLUS:
      return {
        ...state,
        showPlus: false
      };
    default:
      return state;
  }
}
