import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { disableFinal, disableInterim, lockRebound, setFinalURL, setInterimURL, unlockRebound } from '../../store/rebound';

export default function ReboundMonitor () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [params, setParams] = useSearchParams();

  const primaryInterimURL = params.get('interimURL');
  const primaryFinalURL = params.get('finalURL');

  const secondaryInterimURL = useSelector(state => state.rebound.interimURL);
  const secondaryFinalURL = useSelector(state => state.rebound.finalURL);
  const interimEnabled = useSelector(state => state.rebound.interimEnabled);
  const finalEnabled = useSelector(state => state.rebound.finalEnabled);

  useEffect(() => {
    if (primaryInterimURL) {
      dispatch(lockRebound());
      dispatch(setInterimURL(primaryInterimURL));
    } else if (secondaryInterimURL) {
      dispatch(lockRebound());
      setParams(prev => {
        prev.set('interimURL', secondaryInterimURL);
        return prev;
      });
    }
  }, [primaryInterimURL, secondaryInterimURL, setParams, dispatch]);

  useEffect(() => {
    if (primaryFinalURL) {
      dispatch(lockRebound());
      dispatch(setFinalURL(primaryFinalURL));
    } else if (secondaryFinalURL) {
      dispatch(lockRebound());
      setParams(prev => {
        prev.set('finalURL', secondaryFinalURL);
        return prev;
      });
    }
  }, [primaryFinalURL, secondaryFinalURL, setParams, dispatch]);

  useEffect(() => {
    if (secondaryInterimURL && interimEnabled) {
      dispatch(disableInterim());
      navigate(secondaryInterimURL);
    } else if (finalEnabled) {
      dispatch(disableFinal());
      dispatch(unlockRebound());
      if (secondaryFinalURL) navigate(secondaryFinalURL);
      else navigate('/home');
    }
  }, [secondaryInterimURL, secondaryFinalURL, interimEnabled, finalEnabled, setParams]);

  useEffect(() => {
    if (pathname === secondaryInterimURL) {
      dispatch(setInterimURL());
      setParams(prev => {
        prev.delete('interimURL');
        return prev;
      });
    }
  }, [pathname, secondaryInterimURL, setParams, dispatch]);

  useEffect(() => {
    if (pathname === secondaryFinalURL && !primaryInterimURL && !secondaryInterimURL) {
      dispatch(setFinalURL());
      setParams(prev => {
        prev.delete('finalURL');
        return prev;
      });
    }
  }, [pathname, secondaryFinalURL, setParams, dispatch]);
  return null;
}
