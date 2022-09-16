import * as types from './userActionTypes';

export default function reducer (
  state = { all: {}, current: null, loaded: false },
  { type, all, user, userID }
) {
  switch (type) {
    case types.SET_ALL:
      return {
        ...state,
        all,
        loaded: true
      };
    case types.ADD_USER:
      return {
        ...state,
        all: {
          ...state.all,
          [user.id]: user
        }
      };
    case types.REMOVE_USER:
      return {
        ...state,
        all: {
          ...state.all,
          [userID]: undefined
        }
      };
    case types.EDIT_USER:
      return {
        ...state,
        all: {
          ...state.all,
          [user.id]: user
        }
      };
    case types.SET_CURRENT:
      return {
        ...state,
        current: state.all[userID]
      };
    case types.CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
}
