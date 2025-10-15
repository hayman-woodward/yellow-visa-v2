import Image from 'next/image';
import { YVBreadcrumbs, YVSection, YVText, YVTitle } from '@/components/YV';

const teamMembers = [
  {
    id: 1,
    name: 'Tassia Gomide',
    role: 'Vice Presidente de Operações',
    image: '/imgs/sobre/desktop/tassia.png'
  },
  {
    id: 2,
    name: 'Patricia Pontes',
    role: 'Senior Case Manager',
    image: '/imgs/sobre/desktop/patricia-pontes.png'
  },
  {
    id: 3,
    name: 'Lucila Cruz',
    role: 'Business Developer',
    image: '/imgs/sobre/desktop/lucila-cruz.png'
  },
  {
    id: 4,
    name: 'Francyni Salido',
    role: 'Client Support Specialist',
    image: '/imgs/sobre/desktop/francyni-salido.png'
  },
  {
    id: 5,
    name: 'Clarice Vasconcelos',
    role: 'Case Manager',
    image: '/imgs/sobre/desktop/clarice-vasconcelos.png'
  },
  {
    id: 6,
    name: 'Caroline Crivelenti',
    role: 'Business Developer',
    image: '/imgs/sobre/desktop/caroline-crivelenti.png'
  },
  {
    id: 7,
    name: 'Carolina Gama',
    role: 'Finance Manager',
    image: '/imgs/sobre/desktop/carolina-gama.png'
  }
];

export default function NossoTime() {
  return (
    <YVSection className='px-4'>
      <div className='max-w-[1248px] mx-auto'>
       

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-15 items-start'>
          <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
            <YVTitle
              variant='heading'
              title='Nosso time'
            />
          </div>        
        </div>
        {/* GALERIA */}
        <div className='pt-6 p-3 px-4 md:px-0 sm:p-6 lg:p-8 rounded-lg -mx-4 sm:-mx-6 lg:-mx-8 '>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-1'>
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className='overflow-hidden pb-4 md:pb-5'
                data-aos="fade-up"
                data-aos-delay={300 + (index * 100)}
                data-aos-duration="600"
              >
                {/* Image */}
                <div
                  className='relative w-full aspect-[308/347] max-h-[260px] sm:max-h-none'
                  style={{ backgroundColor: '#FFBD1A' }}
                  data-aos="zoom-in"
                  data-aos-delay={400 + (index * 100)}
                  data-aos-duration="500"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className='object-cover'
                  />
                </div>

                {/* Info */}
                <div className='pt-1 md:pt-2' data-aos="fade-up" data-aos-delay={500 + (index * 100)} data-aos-duration="500">
                  <h3 className='font-semibold text-[#0F0005] text-[16px] sm:text-[16px] md:text-[18px] lg:text-[20px] pb-1 md:pb-2'>
                    {member.name}
                  </h3>
                  <YVText variant='small' className='text-gray-600 text-[14px] sm:text-[13px] md:text-[15px]'>
                    {member.role}
                  </YVText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </YVSection>
  );
}
