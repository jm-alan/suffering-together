import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  clearReboundDestination,
  clearReboundOrigin,
  setReboundDestination,
  setReboundOrigin
} from '../../store/rebound';

export default function Rebound ({ from: startingLocation, to: finalLocation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReboundOrigin(startingLocation));
    dispatch(setReboundDestination(finalLocation));
    return () => {
      dispatch(clearReboundOrigin());
      dispatch(clearReboundDestination());
    };
  }, [dispatch, startingLocation, finalLocation]);

  return null;
}
