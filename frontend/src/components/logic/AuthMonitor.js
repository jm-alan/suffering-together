import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { triggerAfterAuth } from '../../store/UX';

export default function AuthMonitor () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (user) dispatch(triggerAfterAuth());
  }, [dispatch, user]);

  return null;
}
