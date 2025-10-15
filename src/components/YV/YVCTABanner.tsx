import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CTAItem {
  title: string;
  url: string;
}

interface YVCTABannerProps {
  title: string;
  subtitle?: string;
  items: CTAItem[];
  className?: string;
}

export default function YVCTABanner({
  title,
  subtitle,
  items,
  className = ''
}: YVCTABannerProps) {
  return (
    <div className={cn(
      'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6 my-8',
      className
    )}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="bg-white hover:bg-yellow-50 border border-yellow-200 hover:border-yellow-300 rounded-lg p-4 transition-all duration-200 hover:shadow-md group"
          >
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors">
                {item.title}
              </h4>
              <div className="mt-2 text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
