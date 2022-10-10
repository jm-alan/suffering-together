const SHOW = 'modal/SHOW';
const HIDE = 'modal/SHOW';
const SET = 'modal/SET';
const CLEAR = 'modal/CLEAR';
const MOORING = 'modal/MOORING';

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

export default function reducer (
  state = { current: null, show: false, mooring: null },
  { type, mooring, current }
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
    default:
      return state;
  }
}
