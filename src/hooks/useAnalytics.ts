'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  leadsToday: number;
  totalLeads: number;
  conversionRate: string;
  popularVisto: string;
  leadsBySource: Array<{
    source: string;
    count: number;
  }>;
  trendData: Array<{
    date: string;
    leads: number;
  }>;
  popularVistos: Array<{
    title: string;
    country: string;
  }>;
}

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Adicionar timeout para evitar travamento
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch('/api/dashboard/analytics', {
          signal: controller.signal,
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Failed to fetch analytics');
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          setError('Timeout - dados de analytics demoraram para carregar');
        } else {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { data, loading, error };
}
