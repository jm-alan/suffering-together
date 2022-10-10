import { combineReducers } from 'redux';

import modal from './modal';
import loading from './loading';
import errors from './errors';
import plus from './plus';

export default combineReducers({
  modal,
  loading,
  errors,
  plus
});
