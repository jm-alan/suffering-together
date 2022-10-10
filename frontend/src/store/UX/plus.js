const ENABLE = 'plus/ENABLE';
const DISABLE = 'plus/DISABLE';
const SHOW = 'plus/SHOW';
const HIDE = 'plus/HIDE';
const SET_ACTION = 'plus/SET_ACTION';
const CLEAR_ACTION = 'plus/CLEAR_ACTION';
const SET_CONTROLLER = 'plus/SET_CONTROLLER';
const CLEAR_CONTROLLER = 'plus/CLEAR_CONTROLLER';

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

export const setPlusController = controller => ({
  type: SET_CONTROLLER,
  controller
});

export const clearPlusController = () => ({
  type: CLEAR_CONTROLLER
});

export default function reducer (
  state = {
    enabled: false,
    show: false,
    action: null,
    controller: null
  },
  { type, action, controller }
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
    case SET_CONTROLLER:
      return {
        ...state,
        controller
      };
    case CLEAR_CONTROLLER:
      return {
        ...state,
        controller: null
      };
    default:
      return state;
  }
}
