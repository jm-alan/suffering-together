import csrfetch from '../utils/csrfetch';
import { clearErrors } from './errors';

export const SET = 'session/SET';
export const CLEAR = 'session/CLEAR';

const setSession = (user = null) => ({
  type: SET,
  user
});

export const signup = ({ firstName, email, password }) => async dispatch => {
  dispatch(clearErrors());
  const { user } = await csrfetch.post('/api/users', {
    body: {
      firstName,
      email,
      password
    }
  });
  dispatch(setSession(user));
};

export const login = ({ email, password }) => async dispatch => {
  dispatch(clearErrors());
  const { user } = await csrfetch.post('/api/session', {
    body: {
      email,
      password
    }
  });
  dispatch(setSession(user));
};

export const logout = () => async dispatch => {
  await csrfetch.delete('/api/session');
  dispatch(setSession());
};

export const restore = () => async dispatch => {
  const { user } = await csrfetch.get('/api/session');
  dispatch(setSession(user));
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
    default:
      return state;
  }
}
