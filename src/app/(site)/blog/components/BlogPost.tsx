interface BlogPostProps {
  content: string;
}

export default function BlogPost({ content }: BlogPostProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

