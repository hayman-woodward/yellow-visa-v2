import { cn } from '@/lib/utils';
import { YVYouTubePlayer } from './YVYouTubePlayer';
import YVCTABanner from './YVCTABanner';

interface YVHtmlRenderProps {
  content: string;
  className?: string;
  allowImages?: boolean;
  allowTables?: boolean;
  allowCode?: boolean;
  allowVideos?: boolean;
}

export default function YVHtmlRender({
  content,
  className = '',
  allowImages = true,
  allowTables = true,
  allowCode = true,
  allowVideos = true // Sempre permitir vídeos por padrão
}: YVHtmlRenderProps) {
  // Função para extrair ID do YouTube
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Sanitização mais robusta mas prática
  const sanitizeHtml = (html: string): string => {
    let sanitized = html
      // Remove scripts e elementos perigosos
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
      .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')

      // Remove event handlers
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '')

      // Remove URLs perigosas
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:text\/html/gi, '')

      // Remove atributos perigosos
      .replace(/\s*style\s*=\s*["'][^"']*expression\s*\([^"']*["']/gi, '')
      .replace(/\s*style\s*=\s*["'][^"']*url\s*\([^"']*javascript:[^"']*["']/gi, '')

      .trim();

    // Remove elementos específicos se não permitidos
    if (!allowImages) {
      sanitized = sanitized.replace(/<img\b[^>]*>/gi, '');
    }

    if (!allowTables) {
      sanitized = sanitized.replace(/<table\b[^<]*(?:(?!<\/table>)<[^<]*)*<\/table>/gi, '');
    }

    if (!allowCode) {
      sanitized = sanitized.replace(/<code\b[^<]*(?:(?!<\/code>)<[^<]*)*<\/code>/gi, '');
      sanitized = sanitized.replace(/<pre\b[^<]*(?:(?!<\/pre>)<[^<]*)*<\/pre>/gi, '');
    }

    // Tratar vídeos de forma inteligente
    if (!allowVideos) {
      sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
      sanitized = sanitized.replace(/<video\b[^<]*(?:(?!<\/video>)<[^<]*)*<\/video>/gi, '');
    } else {
      // Converter URLs do YouTube em placeholders para o componente
      sanitized = sanitized.replace(/<iframe\b[^>]*src\s*=\s*["']([^"']*)["'][^>]*>/gi, (match, src) => {
        const youtubeId = extractYouTubeId(src);
        if (youtubeId) {
          return `<div data-youtube-id="${youtubeId}" class="youtube-player-placeholder"></div>`;
        }
        // Permitir outros domínios seguros
        if (src.includes('vimeo.com')) {
          return match;
        }
        return ''; // Remove iframes de domínios não seguros
      });

      // Converter tags <video> com URLs do YouTube
      sanitized = sanitized.replace(/<video\b[^>]*src\s*=\s*["']([^"']*)["'][^>]*>/gi, (match, src) => {
        const youtubeId = extractYouTubeId(src);
        if (youtubeId) {
          return `<div data-youtube-id="${youtubeId}" class="youtube-player-placeholder"></div>`;
        }
        return match; // Manter outros vídeos
      });

      // Converter URLs do YouTube que estão como texto simples
      sanitized = sanitized.replace(/(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?)/gi, (match, url, videoId) => {
        return `<div data-youtube-id="${videoId}" class="youtube-player-placeholder"></div>`;
      });
    }

    return sanitized;
  };

  const sanitizedContent = sanitizeHtml(content);

  // Processar placeholders do YouTube e CTAs
  const processContent = (html: string) => {
    const elements: React.ReactNode[] = [];
    let remainingHtml = html;

    // Processar elemento por elemento na ordem exata
    while (remainingHtml.length > 0) {
      // Procurar pelo próximo elemento especial
      const youtubeMatch = remainingHtml.match(/<div data-youtube-id="([^"]+)" class="youtube-player-placeholder"><\/div>/);
      const ctaMatch = remainingHtml.match(/<div data-yv-cta="true" data-cta-title="([^"]*)" data-cta-subtitle="([^"]*)" data-cta-items='([^']+)'><\/div>/);

      let nextSpecialIndex = -1;
      let nextSpecialType = '';

      if (youtubeMatch && ctaMatch) {
        // Ambos encontrados, pegar o que vem primeiro
        if (youtubeMatch.index! < ctaMatch.index!) {
          nextSpecialIndex = youtubeMatch.index!;
          nextSpecialType = 'youtube';
        } else {
          nextSpecialIndex = ctaMatch.index!;
          nextSpecialType = 'cta';
        }
      } else if (youtubeMatch) {
        nextSpecialIndex = youtubeMatch.index!;
        nextSpecialType = 'youtube';
      } else if (ctaMatch) {
        nextSpecialIndex = ctaMatch.index!;
        nextSpecialType = 'cta';
      }

      if (nextSpecialIndex === -1) {
        // Não há mais elementos especiais, adicionar HTML restante
        if (remainingHtml.trim()) {
          elements.push(
            <div
              key={`html-${Date.now()}-${Math.random()}`}
              dangerouslySetInnerHTML={{ __html: remainingHtml }}
            />
          );
        }
        break;
      }

      // Adicionar HTML antes do elemento especial
      if (nextSpecialIndex > 0) {
        const htmlBefore = remainingHtml.substring(0, nextSpecialIndex);
        if (htmlBefore.trim()) {
          elements.push(
            <div
              key={`html-${Date.now()}-${Math.random()}`}
              dangerouslySetInnerHTML={{ __html: htmlBefore }}
            />
          );
        }
      }

      // Processar o elemento especial
      if (nextSpecialType === 'youtube') {
        const videoId = youtubeMatch![1];
        elements.push(
          <div key={`youtube-${Date.now()}-${Math.random()}`} className="my-6">
            <YVYouTubePlayer videoId={videoId} />
          </div>
        );
        remainingHtml = remainingHtml.substring(nextSpecialIndex + youtubeMatch![0].length);
      } else if (nextSpecialType === 'cta') {
        const title = ctaMatch![1];
        const subtitle = ctaMatch![2];
        const itemsJson = ctaMatch![3];
        const items = JSON.parse(itemsJson);

        elements.push(
          <YVCTABanner
            key={`cta-${Date.now()}-${Math.random()}`}
            title={title}
            subtitle={subtitle}
            items={items}
          />
        );
        remainingHtml = remainingHtml.substring(nextSpecialIndex + ctaMatch![0].length);
      }
    }

    return elements;
  };

  return (
    <div
      className={cn(
        'prose prose-gray max-w-none',
        // Headings
        'prose-h1:text-3xl prose-h1:font-bold prose-h1:text-gray-900 prose-h1:mb-6 prose-h1:mt-8',
        'prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mb-4 prose-h2:mt-6',
        'prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-900 prose-h3:mb-3 prose-h3:mt-5',
        'prose-h4:text-lg prose-h4:font-semibold prose-h4:text-gray-900 prose-h4:mb-2 prose-h4:mt-4',

        // Text
        'prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4',
        'prose-strong:text-gray-900 prose-strong:font-semibold',
        'prose-em:text-gray-800 prose-em:italic',

        // Links
        'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium',

        // Lists
        'prose-ul:text-gray-700 prose-ul:mb-4 prose-ul:pl-6',
        'prose-ol:text-gray-700 prose-ol:mb-4 prose-ol:pl-6',
        'prose-li:text-gray-700 prose-li:leading-relaxed prose-li:mb-1',

        // Tables
        'prose-table:border-collapse prose-table:w-full prose-table:mb-6 prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden',
        'prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-gray-900 prose-th:px-4 prose-th:py-3 prose-th:border prose-th:border-gray-200',
        'prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700',
        'prose-tr:even:bg-gray-50',

        // Code
        'prose-code:bg-gray-100 prose-code:text-pink-600 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono',
        'prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:mb-6',
        'prose-pre:code:bg-transparent prose-pre:code:text-inherit prose-pre:code:p-0',

        // Images
        'prose-img:rounded-lg prose-img:shadow-md prose-img:mb-6 prose-img:max-w-full prose-img:h-auto',

        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:mb-6',

        // HR
        'prose-hr:border-0 prose-hr:h-px prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-gray-300 prose-hr:to-transparent prose-hr:my-8',

        className
      )}
    >
      {processContent(sanitizedContent)}
    </div>
  );
}
