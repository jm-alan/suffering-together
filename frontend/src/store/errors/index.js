import * as types from './errorActionTypes';

export default function reducer (
  state = { current: [] },
  { type, current }
) {
  switch (type) {
    case types.SET_CURRENT:
      return {
        current
      };
    case types.CLEAR_ERRORS:
      return {
        current: []
      };
    default:
      return state;
  }
}
