'use client';

import dynamic from 'next/dynamic';

// Importar o editor dinamicamente para evitar problemas de SSR
const YVTinyMCEEditor = dynamic(() => import('./YVTinyMCEEditor'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[200px] border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  ),
});

interface ClientEditorWrapperProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function ClientEditorWrapper(props: ClientEditorWrapperProps) {
  return <YVTinyMCEEditor {...props} />;
}
