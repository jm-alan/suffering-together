import * as types from './sessionActionTypes';
import csrfetch from '../../utils/csrfetch';
import silenceErrors from '../../utils/silcenceErrors';
import { clearModal, hideModal } from '../UX/uxActionCreators';
import { clearErrors } from '../errors/errorActionCreators';

const setSession = (user = null) => ({
  type: types.SET,
  user
});

const clearSession = () => ({
  type: types.CLEAR
});

export const signup = ({ firstName, email, password }, shouldLogin) => async dispatch => {
  dispatch(clearErrors());

  // any failures from destructuring below are the result of errors
  // which will already have been caught by csrfetch error handling;
  // therefore, errors from the destructuring itself can be silenced
  await silenceErrors(async () => {
    const { data: { user } } = await csrfetch.post('/api/users', {
      body: {
        firstName,
        email,
        password
      }
    });
    if (shouldLogin) {
      dispatch(setSession(user));
    }
    dispatch(clearModal());
    dispatch(hideModal());
  });
};

export const login = ({ email, password }) => async dispatch => {
  dispatch(clearErrors());
  try {
    const { data: { user } } = await csrfetch.post('/api/session', {
      body: {
        email,
        password
      }
    });
    dispatch(setSession(user));
    dispatch(clearModal());
    dispatch(hideModal());
  } catch {
    dispatch(clearSession());
  }
};

export const logout = () => async dispatch => {
  await csrfetch.delete('/api/session');
  dispatch(clearSession());
  dispatch(clearModal());
  dispatch(hideModal());
};

export const restore = () => async dispatch => {
  try {
    const { data: { user } } = await csrfetch.get('/api/session');
    dispatch(setSession(user));
  } catch {
    dispatch(clearSession());
  }
  await csrfetch.restoreCSRF();
};
