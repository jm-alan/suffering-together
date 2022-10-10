const ENABLE = 'plus/ENABLE';
const DISABLE = 'plus/DISABLE';
const SHOW = 'plus/SHOW';
const HIDE = 'plus/HIDE';
const SET_ACTION = 'plus/SET_ACTION';
const CLEAR_ACTION = 'plus/CLEAR_ACTION';

export const enablePlus = () => ({
  type: ENABLE
});

export const disablePlus = () => ({
  type: DISABLE
});

export const showPlus = () => ({
  type: SHOW
});

export const hidePlus = () => ({
  type: HIDE
});

export const setPlusAction = action => ({
  type: SET_ACTION,
  action
});

export const clearPlusAction = () => ({
  type: CLEAR_ACTION
});

export default function reducer (
  state = { enabled: false, show: false, action: null },
  { type, action }
) {
  switch (type) {
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
    case SHOW:
      return {
        ...state,
        show: true
      };
    case HIDE:
      return {
        ...state,
        show: false
      };
    case SET_ACTION:
      return {
        ...state,
        action
      };
    case CLEAR_ACTION:
      return {
        ...state,
        action: null
      };
    default:
      return state;
  }
}
