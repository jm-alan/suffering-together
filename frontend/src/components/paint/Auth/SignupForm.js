import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../../../store/session';
import { onAny, onSuccess } from '../../../store/afterAuth';
import { setErrors, showErrors } from '../../../store/UX/errors';
import {
  enableRebound,
  setReboundDestination,
  setReboundOrigin
} from '../../../store/rebound';

import './auth.css';
import LoadingLock from '../Loading/LoadingLock';

export default function SignupForm () {
  const dispatch = useDispatch();

  const reboundOrigin = useSelector(state => state.rebound.originalDestination);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setErrors([
        'Passwords do not match'
      ]));
      dispatch(showErrors());
    } else {
      setLoading(true);
      dispatch(onAny(() => setLoading(false)));
      dispatch(signup({ firstName, email, password }));
    }
  };

  const handleLoginNavigate = () => {
    dispatch(setReboundDestination('/login', true));
  };

  useEffect(() => {
    if (!reboundOrigin) dispatch(setReboundOrigin('/home'));
  }, [dispatch, reboundOrigin]);

  useEffect(() => {
    if (reboundOrigin) dispatch(onSuccess(() => dispatch(enableRebound())));
  }, [dispatch, reboundOrigin]);

  return (
    <>
      <form
        className='auth-form login'
        onSubmit={handleSubmit}
      >
        <input
          required
          name='signup-form-first-name'
          className='auth-input first-name'
          type='text'
          placeholder='First name'
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
        />
        <input
          required
          name='signup-form-email'
          className='auth-input email'
          type='email'
          placeholder='email@website.com'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          required
          name='signup-form-password'
          className='auth-input password'
          type='password'
          placeholder='password'
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <input
          required
          name='signup-form-confirm'
          className='auth-input confirm'
          type='password'
          placeholder='confirm password'
          value={confirmPassword}
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
        <button
          className='auth-submit signup'
          type='submit'
        >
          Sign Up
        </button>
        <button
          className='auth-submit switch'
          type='button'
          onClick={handleLoginNavigate}
        >
          Already have an account?<br />Log in here
        </button>
      </form>
      {loading && <LoadingLock name='signup' />}
    </>
  );
}
