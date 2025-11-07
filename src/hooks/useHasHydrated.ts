'use client';

import { useEffect, useState } from 'react';

/**
 * Track when client-side hydration has completed.
 * Prevents SSR/client mismatches by rendering content only after mount.
 */
export function useHasHydrated(): boolean {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
}
