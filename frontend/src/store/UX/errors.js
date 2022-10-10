const SET = 'errors/SET';
const CLEAR = 'errors/CLEAR';
const SHOW = 'errors/SHOW';
const HIDE = 'errors/HIDE';

export const setErrors = current => ({
  type: SET,
  current
});

export const clearErrors = () => ({
  type: CLEAR
});

export const showErrors = () => ({
  type: SHOW
});

export const hideErrors = () => ({
  type: HIDE
});

export const oops = () => ({
  type: SET,
  current: [
    'Sorry, something went wrong',
    'Please refresh the page and try again'
  ]
});

export default function reducer (
  state = { current: [], show: false },
  { type, current }
) {
  switch (type) {
    case SET:
      return {
        ...state,
        current
      };
    case CLEAR:
      return {
        ...state,
        current: []
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
    default:
      return state;
  }
}
