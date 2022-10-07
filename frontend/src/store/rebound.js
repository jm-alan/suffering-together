const SET_ORIGINAL = 'rebound/SET_ORIGINAL';
const SET_NEW = 'rebound/SET_NEW';
const CLEAR_ORIGINAL = 'rebound/CLEAR_ORIGINAL';
const CLEAR_NEW = 'rebound/CLEAR_NEW';
const ENABLE = 'rebound/ENABLE';
const DISABLE = 'rebound/DISABLE';

export const setReboundOrigin = originalDestination => ({
  type: SET_ORIGINAL,
  originalDestination
});

export const clearReboundOrigin = () => ({
  type: CLEAR_ORIGINAL
});

export const setReboundDestination = newDestination => ({
  type: SET_NEW,
  newDestination
});

export const clearReboundDestination = () => ({
  type: CLEAR_NEW
});

export const enableRebound = () => ({
  type: ENABLE
});

export const disableRebound = () => ({
  type: DISABLE
});

export default function reducer (
  state = {
    originalDestination: null,
    newDestination: null,
    enabled: false
  },
  {
    type,
    originalDestination,
    newDestination
  }
) {
  switch (type) {
    case SET_ORIGINAL:
      return {
        ...state,
        originalDestination
      };
    case CLEAR_ORIGINAL:
      return {
        ...state,
        originalDestination: null
      };
    case SET_NEW:
      return {
        ...state,
        newDestination
      };
    case CLEAR_NEW:
      return {
        ...state,
        newDestination
      };
    case ENABLE:
      return {
        ...state,
        enabled: true
      };
    case DISABLE:
      return {
        ...state,
        enabled: false
      };
    default:
      return state;
  }
}
