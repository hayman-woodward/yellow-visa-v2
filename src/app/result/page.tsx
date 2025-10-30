import { Suspense } from 'react';
import ResultadoPage from '@/app/comecar/components/08-captura-lead/ResultadoPage';

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
    <ResultadoPage />
  </Suspense>
  );
}
