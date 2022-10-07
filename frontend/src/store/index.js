import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import UX from './UX';
import session from './session';
import errors from './errors';
import houses from './houses';
import rebound from './rebound';
import afterAuth from './afterAuth';

export default configureStore({
  middleware: [thunk],
  reducer: {
    UX,
    session,
    errors,
    houses,
    rebound,
    afterAuth
  }
});
