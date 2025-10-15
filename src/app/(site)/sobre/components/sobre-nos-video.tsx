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
                Lorem ipsum dolor sit amet consectetur. Vulputate cursus quis
                commodo praesent blandit. Ac ultrices enim egestas molestie amet
                lobortis feugiat. Tellus ut vitae turpis malesuada eu. Risus
                morbi egestas consectetur suspendisse.
              </h2>
            </div>
            <div className=' space-y-4 md:space-y-6'>
              <YVText variant='paragraph'>
                Lorem ipsum dolor sit amet consectetur. Vulputate cursus quis
                commodo praesent blandit. Ac ultrices enim egestas molestie amet
                lobortis feugiat. Tellus ut vitae turpis malesuada eu. Risus
                morbi egestas consectetur suspendisse.
              </YVText>
              <YVText variant='paragraph'>
                Egestas proin at blandit facilisi facilisis fames at turpis.
                Urna sollicitudin et in pretium cursus morbi a fermentum augue.
                Mauris sed amet dui ut pretium fermentum gravida pulvinar arcu.
                Elementum ornaLorem ipsum dolor sit amet consectetur. Vulputate
                cursus quis commodo praesent blandit. Ac ultrices enim egestas
                molestie amet lobortis feugiat. Tellus ut vitae turpis malesuada
                eu. Risus morbi egestas consectetur suspendisse.
              </YVText>
              <YVText variant='paragraph'>
                Egestas proin at blandit facilisi facilisis fames at turpis.
                Urna sollicitudin et in pretium cursus morbi a fermentum augue.
                Mauris sed amet dui ut pretium fermentum gravida pulvinar arcu.
                Elementum orna
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
