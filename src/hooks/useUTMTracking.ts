'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    analytics?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export function useUTMTracking() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmParams = {
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      utm_term: searchParams.get('utm_term'),
      utm_content: searchParams.get('utm_content'),
      refer: searchParams.get('refer'),
    };

    // Filtrar apenas parâmetros que existem
    const validParams = Object.entries(utmParams)
      .filter(([_, value]) => value !== null)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    // Se há parâmetros UTM válidos, enviar para os sistemas
    if (Object.keys(validParams).length > 0) {
      // Enviar para Google Tag Manager
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'utm_capture',
          ...validParams,
        });
      }

      // Enviar para Segment Analytics
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('UTM Parameters Captured', {
          ...validParams,
          page_url: window.location.href,
          page_title: document.title,
        });
      }

      // Salvar no localStorage para persistência
      localStorage.setItem('utm_data', JSON.stringify(validParams));
    }
  }, [searchParams]);
}

export function getStoredUTMData() {
  if (typeof window === 'undefined') return null;
  const storedData = localStorage.getItem('utm_data');
  return storedData ? JSON.parse(storedData) : null;
}
