import { YVAvatar, YVContainer, YVIcon, YVSection, YVText, YVTitle } from "@/components/YV";
import Link from "next/link";

export default function BlogHeader() {
  return (
    <YVSection className="-mt-[88px]">
 

      <YVContainer className="z-10 pt-20 ">
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
    </YVSection>
  );
}