import DescricaoConteudo from '@/components/shared/DescricaoConteudo';

interface DescricaoVistoProps {
  excerpt?: string;
  content?: string;
}

export default function DescricaoVisto({ excerpt, content }: DescricaoVistoProps) {
  return <DescricaoConteudo excerpt={excerpt} content={content} />;
}
