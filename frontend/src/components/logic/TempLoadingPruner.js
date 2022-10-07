import { useEffect } from 'react';

export default function TempLoadingPruner () {
  useEffect(() => {
    const tempLoading = document.getElementById('loading-temp');
    if (tempLoading) {
      tempLoading.parentElement.removeChild(tempLoading);
    }
  }, []);

  return null;
}
