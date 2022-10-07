const SET_ORIGINAL = 'rebound/SET_ORIGINAL';
const SET_NEW = 'rebound/SET_NEW';
const CLEAR_ORIGINAL = 'rebound/CLEAR_ORIGINAL';
const CLEAR_NEW = 'rebound/CLEAR_NEW';
const ENABLE = 'rebound/ENABLE';
const DISABLE = 'rebound/DISABLE';

/**
 * Sets the location to which the rebound process should navigate
 * once enabled, i.e. after the user has completed some action
 * @param {string} originalDestination
 * @param {boolean} force
 */
export const setReboundOrigin = (originalDestination, force = false) => ({
  type: SET_ORIGINAL,
  originalDestination,
  force
});

export const clearReboundOrigin = () => ({
  type: CLEAR_ORIGINAL
});

/**
 * Sets the location to which the rebound process should navigate
 * while disabled, i.e. while the user completes some action
 * @param {string} newDestination
 * @param {boolean} force
 */
export const setReboundDestination = (newDestination, force = false) => ({
  type: SET_NEW,
  newDestination,
  force
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
    newDestination,
    force
  }
) {
  switch (type) {
    case SET_ORIGINAL:
      if (force || !state.originalDestination) {
        return {
          ...state,
          originalDestination
        };
      } else return state;
    case CLEAR_ORIGINAL:
      return {
        ...state,
        originalDestination: null
      };
    case SET_NEW:
      if (force || !state.newDestination) {
        return {
          ...state,
          newDestination
        };
      } else return state;
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
