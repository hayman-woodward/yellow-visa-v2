import { YVSection, YVText, YVYouTubePlayer } from '@/components/YV';

export default function SobreNosVideo() {
  return (
    <div className='bg-[#FFBD1A]'>
      {/* About 02 Section */}
      <YVSection className='px-4'>
        <div className='max-w-[1248px] mx-auto md:px-8 xl:px-0 '>
          <div className='grid max-w-[823px] mx-auto'>
            <div className='mb-4 md:mb-6'>
              <h2 className='text-[24px] leading-[28px] md:text-[32px] font-[600] md:font-bold md:leading-[40px] tracking-[-0.5px] pb-1 md:pb-2'>
                Nossa missão é transformar o complexo processo de imigração em uma jornada de 
                sucesso e tranquilidade. Com uma equipe experiente e dedicada, oferecemos 
                soluções personalizadas para quem busca novos horizontes nos Estados Unidos e Portugal.
              </h2>
            </div>
            <div className=' space-y-4 md:space-y-6'>
              <YVText variant='paragraph'>
                Acreditamos que cada cliente tem uma história única e merece uma estratégia exclusiva. 
                Não trabalhamos com fórmulas prontas; focamos em entender seus objetivos para 
                encontrar o caminho legal mais eficiente e seguro para você e sua família.
              </YVText>
              <YVText variant='paragraph'>
                Desde a análise inicial de perfil até a chegada ao destino escolhido, a Yellow Visa 
                está ao seu lado. Nossa transparência e compromisso com resultados são os pilares 
                que nos tornam parceiros de confiança na realização do seu sonho internacional.
              </YVText>
              <YVText variant='paragraph'>
                Seja para carreira, estudo ou investimento, nossa expertise garante que você 
                tenha toda a estrutura necessária para voar alto e conquistar seu lugar no mundo.
              </YVText>
            </div>
          </div>
        </div>
      </YVSection>
      {/* About 03 Video Section */}
      <YVSection className='bg-[#FFBD1A]'>
        <div className='max-w-[1248px] mx-auto md:px-8 xl:px-0'>
          <div className='mx-auto max-w-[823px] text-center'>
            {/* YouTube Player */}
            <YVYouTubePlayer
              videoId='_DboMAghWcA'
              title='Rise Against - Hero of War'
              poster='/imgs/sobre/desktop/bg-sobre-nos-video.jpg'
              caption='Lorem ipsum dolor sit amet consectetur. Vulputate cursus quis commodo praesent blandit.'
            />
          </div>
        </div>
      </YVSection>
    </div>
  );
}
