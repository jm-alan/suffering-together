import * as types from './sessionActionTypes';

export default function reducer (
  state = { user: null, loaded: false },
  { type, user }
) {
  switch (type) {
    case types.SET:
      return {
        user,
        loaded: true
      };
    case types.CLEAR:
      return {
        user: null,
        loaded: true
      };
    default:
      return state;
  }
}
