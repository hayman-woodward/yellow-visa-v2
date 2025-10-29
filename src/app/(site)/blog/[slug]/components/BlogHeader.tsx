import { YVAvatar, YVContainer, YVIcon, YVText, YVTitle } from "@/components/YV";
import Link from "next/link";

export default function BlogHeader() {
  return (
    <div className="bg-[#F7F5F6] relative overflow-hidden pt-40 pb-5">
      {/* Laço decorativo de fundo */}
      <div className="absolute top-[-400px] left-1/2 -translate-x-1/2 pointer-events-none z-0">
        <svg width="2192" height="712" viewBox="0 0 2192 712" fill="none" className="rotate-[347deg]">
          <path d="M2191.5 711.5C2191.5 711.5 1891.5 411.5 1591.5 311.5C1291.5 211.5 991.5 311.5 791.5 511.5C591.5 711.5 391.5 711.5 191.5 511.5C-8.5 311.5 0.5 0.5 0.5 0.5" 
            stroke="url(#gradient)" 
            strokeWidth="80" 
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFBD1A" />
              <stop offset="50%" stopColor="#FF9500" />
              <stop offset="100%" stopColor="#FF6700" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <YVContainer className="relative z-10">
        <div className="flex flex-col gap-10">
          {/* Botão Voltar */}
          <Link 
            href="/blog" 
            className="flex items-center gap-1 text-xs font-bold tracking-tight hover:underline underline-offset-2 w-fit transition-all"
          >
            <YVIcon name="arrow-left" width={16} height={16} />
            Voltar para Notícias
          </Link>

          {/* Conteúdo Principal */}
          <div className="flex flex-col gap-6 max-w-[824px]">
            {/* Tag */}
            <div className="flex items-center gap-1 pb-5">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="opacity-40">
                <path d="M6 0L0 3.5L6 7L12 3.5L6 0Z" fill="currentColor"/>
                <path d="M0 10.5L6 14L12 10.5L6 7L0 10.5Z" fill="currentColor"/>
              </svg>
              <span className="text-[#FF6700] font-semibold text-sm uppercase tracking-tight">
                Notícias
              </span>
            </div>

            {/* Título */}
            <YVTitle tag="h1" variant='hero' title='Coimbra: A cidade universitária' className="pb-4" />
            
            {/* Descrição */}
            <YVText className="text-base leading-[22px] pb-2">
              Qualidade de vida, praias próximas e um polo de inovação crescente
            </YVText>

            {/* Autor */}
            <div className="flex items-center gap-4 pt-4">
              <YVAvatar 
                name="Kristin Watson"
                size="lg"
                className="w-10 h-10"
              />
              <div className="flex flex-col">
                <YVText className="font-normal text-base leading-[22px]">
                  Kristin Watson
                </YVText>
                <YVText className="text-sm leading-5">
                  Consultora de imigração da Yellow Visa
                </YVText>
              </div>
            </div>
          </div>
        </div>
      </YVContainer>
    </div>
  );
}