import csrfetch from '../utils/csrfetch';
import $ from '../utils/silcenceErrors';
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

export const signup = ({ firstName, email, password }) => async dispatch => {
  dispatch(clearErrors());

  await $(async () => {
    const { data: { user } } = await csrfetch.post('/api/users', {
      body: {
        firstName,
        email,
        password
      }
    });
    dispatch(setSession(user));
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
  } catch {
    dispatch(clearSession());
  }
};

export const logout = () => async dispatch => {
  await csrfetch.delete('/api/session');
  dispatch(clearSession());
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
