import React, { Suspense } from 'react';
import LoadingLock from '../../components/paint/Loading/LoadingLock';

export default function loadingLockable (LazyElement, name, props = {}) {
  return (
    <Suspense fallback={<LoadingLock name={name} item={LazyElement} />}>
      <LazyElement {...props} />
    </Suspense>
  );
}
