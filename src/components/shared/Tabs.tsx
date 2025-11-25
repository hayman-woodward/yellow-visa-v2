'use client';

import { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className = '' }: TabsProps) {
  return (
    <div className={`border-b border-dashboard ${className}`}>
      <nav className="-mb-px flex space-x-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'border-[#FFBD1A] text-[#FFBD1A]'
                  : 'border-transparent text-dashboard-muted hover:text-dashboard hover:border-dashboard-border'
              }`}
            >
              {tab.icon && <span className="flex items-center">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    isActive
                      ? 'bg-[#FFBD1A]/20 text-[#FFBD1A]'
                      : 'bg-dashboard-hover text-dashboard-muted'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

