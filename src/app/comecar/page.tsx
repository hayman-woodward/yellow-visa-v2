import VistoStepper from './components/VistoStepper';

interface ComecarPageProps {
  searchParams: Promise<{
    etapa?: string;
  }>;
}

export default async function ComecarPage({ searchParams }: ComecarPageProps) {
  const params = await searchParams;

  // Se não há etapa na URL, redirecionar para a primeira
  if (!params.etapa) {
    return <VistoStepper etapaInicial={1} />;
  }

  // Extrair número da etapa da string (ex: "01-destino" -> 1)
  const etapaAtual = parseInt(params.etapa.split('-')[0]);

  return <VistoStepper etapaInicial={etapaAtual} />;
}
