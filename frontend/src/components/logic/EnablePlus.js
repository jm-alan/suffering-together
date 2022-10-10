import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { enablePlus, disablePlus } from '../../store/UX/plus';

export default function EnablePlus () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enablePlus());
    return () => dispatch(disablePlus());
  }, [dispatch]);

  return null;
}
