import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import UX from './UX';
import session from './session';
import errors from './errors';
import users from './users';
import houses from './houses';

export default configureStore({
  middleware: [thunk],
  reducer: {
    UX,
    session,
    errors,
    users,
    houses
  }
});
