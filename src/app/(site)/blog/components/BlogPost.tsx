interface BlogPostProps {
  content: string;
}

export default function BlogPost({ content }: BlogPostProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div 
        className="[&_*]:!max-w-none"
        style={{
          // Garantir que estilos inline do conteúdo tenham prioridade
          all: 'unset',
          display: 'block'
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

