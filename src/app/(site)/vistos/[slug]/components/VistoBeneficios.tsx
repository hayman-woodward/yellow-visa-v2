import { YVText, YVTitle } from '@/components/YV';

interface Beneficio {
  icon?: string;
  title: string;
  description: string;
}

interface VistoBeneficiosProps {
  beneficios: Beneficio[];
}

export default function VistoBeneficios({ beneficios }: VistoBeneficiosProps) {
  // Filtrar apenas os benefícios que têm título e descrição
  const beneficiosValidos = beneficios.filter(b => b.title && b.description);

  if (beneficiosValidos.length === 0) {
    return null;
  }

  return (
    <section className='bg-white py-12 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 md:px-12 xl:px-0'>
        <div className='grid md:grid-cols-3 gap-4 md:gap-8 lg:gap-12'>
          {beneficiosValidos.map((beneficio, index) => {
            const animations = ['fade-right', 'fade-up', 'fade-left'];
            const delays = [200, 400, 600];
            const iconDelays = [300, 500, 700];
            
            return (
              <div 
                key={index} 
                className='text-left px-1 py-[13.5px] md:p-10'
                data-aos={animations[index]}
                data-aos-delay={delays[index]}
                data-aos-duration="800"
              >
                {beneficio.icon && (
                  <div 
                    className='flex justify-start pb-4'
                    data-aos="zoom-in"
                    data-aos-delay={iconDelays[index]}
                    data-aos-duration="600"
                    dangerouslySetInnerHTML={{ __html: beneficio.icon }}
                  />
                )}

                <div data-aos="fade-up" data-aos-delay={iconDelays[index] + 100} data-aos-duration="700">
                  <YVTitle tag='h3' variant='subtitle' className='mb-2'>
                    {beneficio.title}
                  </YVTitle>
                </div>

                <div data-aos="fade-up" data-aos-delay={iconDelays[index] + 200} data-aos-duration="700">
                  <YVText variant='small'>{beneficio.description}</YVText>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

