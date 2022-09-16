import csrfetch from '../../utils/csrfetch';
import silenceErrors from '../../utils/silcenceErrors';

export const SET_ALL = 'users/SET_ALL';
export const SET_CURRENT = 'users/SET_CURRENT';
export const CLEAR_CURRENT = 'users/CLEAR_CURRENT';
export const ADD_USER = 'users/ADD';
export const REMOVE_USER = 'users/REMOVE';
export const EDIT_USER = 'users/EDIT';

const setAll = all => ({
  type: SET_ALL,
  all
});

const addUser = user => ({
  type: ADD_USER,
  user
});

const removeUser = userID => ({
  type: REMOVE_USER,
  userID
});

const editUser = user => ({
  type: EDIT_USER,
  user
});

export const selectUser = userID => ({
  type: SET_CURRENT,
  userID
});

export const clearSelectedUser = () => ({
  type: CLEAR_CURRENT
});

export const getUsers = () => async dispatch => {
  await silenceErrors(async () => {
    const { data: { users } } = await csrfetch.get('/api/users');
    dispatch(setAll(users));
    // similar to the session reducer, failures which would cause
    // this destructuring pattern to error will already have been
    // handled and presented to the user via csrfetch's internal
    // error handling, and can therefore be silenced here
  });
};

export const createUser = ({ firstName, email, password }) => async dispatch => {
  await silenceErrors(async () => {
    const { data: { user } } = await csrfetch.post('/api/users', {
      body: {
        firstName,
        email,
        password
      }
    });
    dispatch(addUser(user));
  });
};

export const editUserInfo = (userID, { firstName, email, password, admin }) => async dispatch => {
  await silenceErrors(async () => {
    const { data: { user } } = await csrfetch.patch(`/api/users/${userID}`, {
      body: {
        firstName,
        email,
        password,
        admin
      }
    });
    dispatch(editUser(user));
  });
};

export const deleteUser = userID => async dispatch => {
  await csrfetch.delete(`/api/users/${userID}`);
  dispatch(removeUser(userID));
};

export default function reducer (
  state = { all: {}, current: null, loaded: false },
  { type, all, user, userID }
) {
  switch (type) {
    case SET_ALL:
      return {
        ...state,
        all,
        loaded: true
      };
    case ADD_USER:
      return {
        ...state,
        all: {
          ...state.all,
          [user.id]: user
        }
      };
    case REMOVE_USER:
      return {
        ...state,
        all: {
          ...state.all,
          [userID]: undefined
        }
      };
    case EDIT_USER:
      return {
        ...state,
        all: {
          ...state.all,
          [user.id]: user
        }
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.all[userID]
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
}
