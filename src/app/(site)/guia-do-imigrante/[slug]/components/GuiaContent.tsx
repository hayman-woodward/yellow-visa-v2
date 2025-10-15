import YVHtmlRender from '@/components/YV/YVHtmlRender';

interface GuiaContentProps {
  content: string;
}

export default function GuiaContent({ content }: GuiaContentProps) {
  // Se não há conteúdo, mostrar mensagem
  if (!content || content.trim() === '') {
    return (
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Conteúdo em desenvolvimento
            </h3>
            <p className="text-gray-600">
              Este guia está sendo preparado com informações detalhadas.
              Em breve você terá acesso ao conteúdo completo.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 px-4">
      <div className="max-w-[1248px] mx-auto">
        <YVHtmlRender
          content={content}
          className="prose-a:text-yellow-600 prose-blockquote:border-yellow-500 prose-blockquote:bg-yellow-50"
        />
      </div>
    </div>
  );
}
