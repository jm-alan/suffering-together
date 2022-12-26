import React, { Suspense } from 'react';
import LoadingLock from '../../components/paint/Loading/LoadingLock';

export default function loadingLockable (lazyElement, name) {
  return (
    <Suspense fallback={<LoadingLock name={name} item={lazyElement} />}>
      {lazyElement}
    </Suspense>
  );
}
