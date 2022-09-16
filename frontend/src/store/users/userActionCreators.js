import csrfetch from '../../utils/csrfetch';
import silenceErrors from '../../utils/silcenceErrors';
import * as types from './userActionTypes';

const setAll = all => ({
  type: types.SET_ALL,
  all
});

const addUser = user => ({
  type: types.ADD_USER,
  user
});

const removeUser = userID => ({
  type: types.REMOVE_USER,
  userID
});

const editUser = user => ({
  type: types.EDIT_USER,
  user
});

export const selectUser = userID => ({
  type: types.SET_CURRENT,
  userID
});

export const clearSelectedUser = () => ({
  type: types.CLEAR_CURRENT
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
