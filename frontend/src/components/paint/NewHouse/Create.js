import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Checkbox from '../Checkbox';
import LoadingLock from '../Loading/LoadingLock';
import csrfetch from '../../../utils/csrfetch';
import { addHouse } from '../../../store/houses';

export default function Create () {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shouldGetRandomJoinCode, setShouldGetRandomJoinCode] = useState(false);
  const [randomJoinCode, setRandomJoinCode] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addHouse({
      name,
      joinCode,
      password
    }));
  };

  useEffect(() => {
    if (shouldGetRandomJoinCode) {
      setLoading(true);
      (async () => {
        const { code } = await csrfetch.get(
          '/api/utils/random',
          { name }
        );
        setRandomJoinCode(code);
        setShouldGetRandomJoinCode(false);
        setLoading(false);
      })();
    }
  }, [shouldGetRandomJoinCode, setRandomJoinCode, setShouldGetRandomJoinCode]);

  useEffect(() => {
    if (name && name.length >= 5 && randomJoinCode && !joinCode) {
      setJoinCode(randomJoinCode);
    }
  }, [randomJoinCode, joinCode, setJoinCode]);

  return (
    <>
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
        <div className='password-visibility-organizer'>
          <input
            className='new-item-input'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <Checkbox
            className='password-visibility-toggle'
            disableLabel
            disableOutline
            label='Show password'
            value={showPassword}
            valueSetter={setShowPassword}
            customIndicator={['visibility', 'visibility_off']}
          />
        </div>
        <button className='new-item-button submit' type='submit'>
          Create Residence
        </button>
      </form>
      {loading && <LoadingLock name='join code' />}
    </>
  );
}
