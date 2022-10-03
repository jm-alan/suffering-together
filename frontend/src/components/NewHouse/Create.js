import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Checkbox from '../Checkbox';
import csrfetch from '../../utils/csrfetch';
import { addHouse } from '../../store/houses';
import { lockLoading, unlockLoading } from '../../store/UX';

export default function Create () {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [password, setPassword] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shouldGetRandomJoinCode, setShouldGetRandomJoinCode] = useState(false);
  const [randomJoinCode, setRandomJoinCode] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addHouse({
      name,
      joinCode,
      password: hasPassword ? password : null
    }));
  };

  useEffect(() => {
    if (shouldGetRandomJoinCode) {
      dispatch(lockLoading('joincode'));
      (async () => {
        const { code } = await csrfetch.get(
          '/api/utils/random',
          { name }
        );
        setRandomJoinCode(code);
        setShouldGetRandomJoinCode(false);
        dispatch(unlockLoading('joincode'));
      })();
    }
  }, [shouldGetRandomJoinCode, setRandomJoinCode, setShouldGetRandomJoinCode]);

  useEffect(() => {
    if (name && name.length >= 5 && randomJoinCode && !joinCode) {
      setJoinCode(randomJoinCode);
    }
  }, [randomJoinCode, joinCode, setJoinCode]);

  return (
    <form className='new-item-form houses' onSubmit={handleSubmit}>
      <input
        className='new-item-input'
        type='text'
        placeholder='Residence Name'
        minLength={5}
        value={name}
        onChange={({ target: { value } }) => {
          setName(value);
          if (value && (value.length >= 5) && !joinCode) {
            setShouldGetRandomJoinCode(true);
          }
        }}
        required
      />
      <input
        className='new-item-input'
        type='text'
        placeholder='Join Code'
        value={joinCode}
        onChange={({ target: { value } }) => setJoinCode(value)}
      />
      <Checkbox
        label='Set a password?'
        value={hasPassword}
        valueSetter={setHasPassword}
      />
      {hasPassword
        ? (
          <>
            <input
              className='new-item-input'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
            <Checkbox
              label='Show password'
              value={showPassword}
              valueSetter={setShowPassword}
            />
          </>
          )
        : null}
      <button className='new-item-button submit' type='submit'>
        Create Residence
      </button>
    </form>
  );
}
