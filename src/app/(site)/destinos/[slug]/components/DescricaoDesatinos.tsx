import DescricaoConteudo from '@/components/shared/DescricaoConteudo';

interface DescricaoDestinosProps {
  excerpt?: string;
  content?: string;
}

export default function DescricaoDestinos({ excerpt, content }: DescricaoDestinosProps) {
  return <DescricaoConteudo excerpt={excerpt} content={content} />;
}
