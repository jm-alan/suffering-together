const SHOW = 'modal/SHOW';
const HIDE = 'modal/SHOW';
const SET = 'modal/SET';
const CLEAR = 'modal/CLEAR';
const MOORING = 'modal/MOORING';
const ON_CLOSE = 'modal/ON_CLOSE';

export const showModal = () => ({
  type: SHOW
});

export const hideModal = () => ({
  type: HIDE
});

export const setModal = current => ({
  type: SET,
  current
});

export const clearModal = () => ({
  type: CLEAR
});

export const setMooring = mooring => ({
  type: MOORING,
  mooring
});

export const setOnClose = (onClose = null) => ({
  type: ON_CLOSE,
  onClose
});

export default function reducer (
  state = { current: null, show: false, mooring: null, onClose: null },
  { type, mooring, current, onClose }
) {
  switch (type) {
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
    case SET:
      return {
        ...state,
        current
      };
    case CLEAR:
      return {
        ...state,
        current: null
      };
    case MOORING:
      return {
        ...state,
        mooring
      };
    case ON_CLOSE:
      return {
        ...state,
        onClose
      };
    default:
      return state;
  }
}
