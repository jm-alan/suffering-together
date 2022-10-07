import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

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
      dispatch(disableRebound());
      if (origin) navigate(origin);
    } else if (pathname !== destination) {
      navigate(destination);
    }
    return () => enabled && dispatch(disableRebound());
  }, [navigate, pathname, origin, destination]);

  return null;
}
