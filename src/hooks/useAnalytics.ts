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
        const response = await fetch('/api/dashboard/analytics');
        if (!response.ok) throw new Error('Failed to fetch analytics');
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { data, loading, error };
}
