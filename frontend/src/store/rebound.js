const SET_INTERIM = 'rebound/SET_INTERIM';
const SET_FINAL = 'rebound/SET_FINAL';
const LOCK = 'rebound/LOCK';
const UNLOCK = 'rebound/UNLOCK';
const ENABLE_INTERIM = 'rebound/ENABLE_INTERIM';
const DISABLE_INTERIM = 'rebound/DISABLE_INTERIM';
const ENABLE_FINAL = 'rebound/ENABLE_FINAL';
const DISABLE_FINAL = 'rebound/DISABLE_FINAL';

export const setInterimURL = (interimURL = null) => ({
  type: SET_INTERIM,
  interimURL
});

export const setFinalURL = (finalURL = null) => ({
  type: SET_FINAL,
  finalURL
});

export const enableInterim = () => ({
  type: ENABLE_INTERIM
});

export const disableInterim = () => ({
  type: DISABLE_INTERIM
});

export const enableFinal = () => ({
  type: ENABLE_FINAL
});

export const disableFinal = () => ({
  type: DISABLE_FINAL
});

export const lockRebound = () => ({
  type: LOCK
});

export const unlockRebound = () => ({
  type: UNLOCK
});

export default function reducer (
  state = {
    interimURL: null,
    finalURL: null,
    interimEnabled: false,
    finalEnabled: false,
    locked: false
  },
  {
    type,
    interimURL,
    finalURL
  }
) {
  switch (type) {
    case SET_INTERIM:
      return {
        ...state,
        interimURL
      };
    case SET_FINAL:
      return {
        ...state,
        finalURL
      };
    case LOCK:
      return {
        ...state,
        locked: true
      };
    case UNLOCK:
      return {
        ...state,
        locked: false
      };
    case ENABLE_INTERIM:
      return {
        ...state,
        interimEnabled: true
      };
    case DISABLE_INTERIM:
      return {
        ...state,
        interimEnabled: false
      };
    case ENABLE_FINAL:
      return {
        ...state,
        finalEnabled: true
      };
    case DISABLE_FINAL:
      return {
        ...state,
        finalEnabled: false
      };
    default:
      return state;
  }
}
