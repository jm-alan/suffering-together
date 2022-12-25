import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LoadingLock from '../Loading/LoadingLock';
import { login } from '../../../store/session';
import { onAny, onSuccess } from '../../../store/afterAuth';
import { enableFinal, enableInterim, setInterimURL } from '../../../store/rebound';

import './auth.css';

export default function LoginForm () {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.session.user);

  const handleSignupNavigate = () => {
    dispatch(setInterimURL('/signup'));
    dispatch(enableInterim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    dispatch(onAny(() => setLoading(false)));
    dispatch(onSuccess(() => {
      console.log('enabling final navigation in login');
      dispatch(enableFinal());
    }));
    dispatch(login({ email, password }));
  };

  if (user) return <Navigate to='/home' />;

  return (
    <>
      <form
        className='auth-form login'
        onSubmit={handleSubmit}
      >
        <input
          required
          name='login-form-email'
          className='auth-input email'
          type='email'
          placeholder='email@website.com'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          required
          name='login-form-password'
          className='auth-input password'
          type='password'
          placeholder='password'
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <button
          className='auth-submit login'
          type='submit'
        >
          Log In
        </button>
        <button
          className='auth-submit switch'
          type='button'
          onClick={handleSignupNavigate}
        >
          Don't have an account?<br />Sign up here
        </button>
      </form>
      {loading && <LoadingLock name='login' />}
    </>
  );
}
