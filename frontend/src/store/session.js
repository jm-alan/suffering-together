import csrfetch from '../utils/csrfetch';
import silenceErrors from '../utils/silcenceErrors';
import { clearModal, hideModal } from './UX';
import { clearErrors } from './errors';

export const SET = 'session/SET';
export const CLEAR = 'session/CLEAR';

const setSession = (user = null) => ({
  type: SET,
  user
});

const clearSession = () => ({
  type: CLEAR
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

export default function reducer (
  state = { user: null, loaded: false },
  { type, user }
) {
  switch (type) {
    case SET:
      return {
        user,
        loaded: true
      };
    case CLEAR:
      return {
        user: null,
        loaded: true
      };
    default:
      return state;
  }
}
