'use client';

import { Suspense } from 'react';
import { useUTMTracking } from '@/hooks/useUTMTracking';

function UTMTrackerContent() {
  useUTMTracking();
  return null; // Componente invisível
}

export default function UTMTracker() {
  return (
    <Suspense fallback={null}>
      <UTMTrackerContent />
    </Suspense>
  );
}
