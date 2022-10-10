const ENABLE = 'plus/ENABLE';
const DISABLE = 'plus/DISABLE';
const SHOW = 'plus/SHOW';
const HIDE = 'plus/HIDE';
const ACTION = 'plus/ACTION';

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
  type: ACTION,
  action
});

export default function reducer (
  state = { enabled: false, show: false, action () {} },
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
    case ACTION:
      return {
        ...state,
        action
      };
    default:
      return state;
  }
}
