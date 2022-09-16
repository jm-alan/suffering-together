import * as types from './errorActionTypes';

export const setErrors = current => ({
  type: types.SET_CURRENT,
  current
});

export const clearErrors = () => ({
  type: types.CLEAR_ERRORS
});

export const oops = () => ({
  type: types.SET_CURRENT,
  current: [
    'Sorry, something went wrong',
    'Please refresh the page and try again'
  ]
});
