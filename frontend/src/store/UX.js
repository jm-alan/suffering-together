const SHOW_MODAL = 'UX/SHOW_MODAL';
const HIDE_MODAL = 'UX/SHOW_MODAL';
const SET_MODAL = 'UX/SET_MODAL';
const CLEAR_MODAL = 'UX/CLEAR_MODAL';
const SET_MOORING = 'UX/SET_MOORING';
const SHOW_ERRORS = 'UX/SHOW_ERRORS';
const HIDE_ERRORS = 'UX/HIDE_ERRORS';
const LOCK_LOADING = 'UX/LOCK_LOADING';
const UNLOCK_LOADING = 'UX/UNLOCK_LOADING';
const SHOW_PLUS = 'UX/SHOW_PLUS';
const HIDE_PLUS = 'UX/HIDE_PLUS';
const ENABLE_PLUS = 'UX/ENABLE_PLUS';
const DISABLE_PLUS = 'UX/DISABLE_PLUS';
const SET_REBOUND = 'UX/SET_REBOUND';
const CLEAR_REBOUND = 'UX/CLEAR_REBOUND';

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

export const lockLoading = (unlockKey, onUnlock) => ({
  type: LOCK_LOADING,
  unlockKey,
  onUnlock
});

export const unlockLoading = unlockKey => ({
  type: UNLOCK_LOADING,
  unlockKey
});

export const showPlus = () => ({
  type: SHOW_PLUS
});

export const hidePlus = () => ({
  type: HIDE_PLUS
});

export const enablePlus = () => ({
  type: ENABLE_PLUS
});

export const disablePlus = () => ({
  type: DISABLE_PLUS
});

export const showErrors = () => ({
  type: SHOW_ERRORS
});

export const hideErrors = () => ({
  type: HIDE_ERRORS
});

export const setRebound = reboundLocation => ({
  type: SET_REBOUND,
  reboundLocation
});

export const clearRebound = () => ({
  type: CLEAR_REBOUND
});

export default function reducer (
  state = {
    showModal: false,
    showErrors: false,
    currentModal: null,
    modalMooring: null,
    loadingLock: 0,
    onUnlock: {},
    showPlus: true,
    enablePlus: true,
    reboundLocation: null
  },
  {
    type,
    currentModal,
    modalMooring,
    unlockKey,
    onUnlock,
    reboundLocation
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
    case SHOW_ERRORS:
      return {
        ...state,
        showErrors: true
      };
    case HIDE_ERRORS:
      return {
        ...state,
        showErrors: false
      };
    case LOCK_LOADING:
      return {
        ...state,
        onUnlock: {
          ...state.onUnlock,
          [unlockKey]: onUnlock
        },
        loadingLock: state.loadingLock + 1
      };
    case UNLOCK_LOADING:
      state.onUnlock[unlockKey] && state.onUnlock[unlockKey]();
      return {
        ...state,
        onUnlock: {
          ...state.onUnlock,
          [unlockKey]: null
        },
        loadingLock: state.loadingLock > 0 ? state.loadingLock - 1 : 0
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
    case ENABLE_PLUS:
      return {
        ...state,
        enablePlus: true
      };
    case DISABLE_PLUS:
      return {
        ...state,
        enablePlus: false
      };
    case SET_REBOUND:
      return {
        ...state,
        reboundLocation
      };
    case CLEAR_REBOUND:
      return {
        ...state,
        reboundLocation: null
      };
    default:
      return state;
  }
}
