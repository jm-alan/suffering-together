import csrfetch from '../utils/csrfetch';
import { clearErrors } from './UX/errors';
import { enableAfterAuth } from './afterAuth';

const SET = 'session/SET';

const setSession = (user = null) => ({
  type: SET,
  user
});

export const signup = ({ firstName, email, password }) => async dispatch => {
  dispatch(clearErrors());
  const { user } = await csrfetch.post('/api/users', {
    firstName,
    email,
    password
  });
  dispatch(setSession(user));
  dispatch(enableAfterAuth());
};

export const login = ({ email, password }) => async dispatch => {
  dispatch(clearErrors());
  const { user } = await csrfetch.post('/api/session', {
    email,
    password
  });
  dispatch(setSession(user));
  dispatch(enableAfterAuth());
};

export const logout = () => async dispatch => {
  await csrfetch.delete('/api/session');
  dispatch(setSession());
  dispatch(enableAfterAuth());
};

export const restore = () => async dispatch => {
  const { user } = await csrfetch.get('/api/session');
  dispatch(setSession(user));
  dispatch(enableAfterAuth());
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
