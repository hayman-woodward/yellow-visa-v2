interface BlogPostProps {
  content: string;
}

export default function BlogPost({ content }: BlogPostProps) {
  return (
    <div className="container mx-auto py-4 max-w-4xl">
      <div 
        className="
          text-foreground
          [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-10 [&_h1]:leading-tight
          [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:leading-tight
          [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8
          [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-3 [&_h4]:mt-6
          [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-foreground/90
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
          [&_li]:mb-2 [&_li]:leading-relaxed
          [&_a]:text-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:text-xl [&_blockquote]:text-foreground/80
          [&_img]:rounded-xl [&_img]:max-w-full [&_img]:h-auto [&_img]:my-8 [&_img]:shadow-md
          [&_figure]:my-8
          [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:text-center [&_figcaption]:mt-2
          [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm
          [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6
          [&_strong]:font-bold [&_strong]:text-foreground
          [&_em]:italic
          [&_hr]:my-8 [&_hr]:border-border
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

