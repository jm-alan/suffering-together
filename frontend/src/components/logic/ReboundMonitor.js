import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { devlog } from '../../utils/logging';
import { disableRebound } from '../../store/rebound';

export default function ReboundMonitor () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const origin = useSelector(state => state.rebound.originalDestination);
  const destination = useSelector(state => state.rebound.newDestination);
  const enabled = useSelector(state => state.rebound.enabled);

  useEffect(() => {
    if (enabled && (pathname !== origin)) {
      devlog(`disabling rebound because ${pathname} !== ${origin}`);
      dispatch(disableRebound());
      if (origin) {
        devlog(`rebounding to ${origin}`);
        navigate(origin);
      }
    } else if (destination && (pathname !== destination)) {
      devlog(`rebound intercept initiated, navigating to ${destination}`);
      navigate(destination);
    }
    return () => enabled && dispatch(disableRebound());
  }, [dispatch, enabled, navigate, pathname, origin, destination]);

  return null;
}
