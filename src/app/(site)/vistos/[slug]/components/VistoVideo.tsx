import { YVSection, YVYouTubePlayer } from "@/components/YV";

interface VistoVideoProps {
  videoUrl?: string;
  title?: string;
}

export default function VistoVideo({ videoUrl, title }: VistoVideoProps) {
  // Se não há URL de vídeo, não renderiza nada
  if (!videoUrl) {
    return null;
  }

  // Extrair o ID do vídeo do YouTube da URL
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return null;
  };

  const videoId = extractVideoId(videoUrl);
  
  // Se não conseguir extrair o ID, não renderiza
  if (!videoId) {
    return null;
  }

  return (
    <YVSection className='bg-[#FFBD1A]'>
      <div className='max-w-[1248px] mx-auto md:px-8 xl:px-0'>
        <div className='mx-auto max-w-[823px] text-center'>
          {/* YouTube Player */}
          <YVYouTubePlayer
            videoId={videoId}
            title={title || 'Vídeo sobre o visto'}
            poster='/imgs/sobre/desktop/bg-sobre-nos-video.jpg'
            caption='Assista ao vídeo explicativo sobre este tipo de visto.'
          />
        </div>
      </div>
    </YVSection>
  );
}