import { YVBreadcrumbs, YVSection, YVText, YVTitle } from "@/components/YV";
import { getPublishedVistos } from "@/lib/actions/vistos";
import Link from "next/link";

// Mapeamento das descrições curtas para cada visto
const shortDescriptions: Record<string, string> = {
  'eb-1a': 'Trabalhador com Habilidades Extraordinárias',
  'eb-1b': 'Professor ou Pesquisador de Destaque',
  'eb-1c': 'Executivo Multinacional',
  'eb-2': 'Grau Avançado ou Habilidade Excepcional',
  'eb-2-niw': 'Isenção de interesse nacional',
  'eb-3': 'Trabalhador qualificado, profissional ou outro trabalhador',
  'eb-5': 'Investidor',
  'visto-riqueza': 'Visto de Riqueza'
};

interface OutrosVistosProps {
  currentSlug: string;
}

export default async function OutrosVistos({ currentSlug }: OutrosVistosProps) {
  const vistos = await getPublishedVistos();

  return (
    <YVSection className="bg-[#0C0C0C]">
      <div className="max-w-[1248px] mx-auto px-4 md:px-8 xl:px-0">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
            <YVBreadcrumbs disabled items={[{ label: 'Vistos', href: '/vistos' }]} className="text-[#FFBD1A] mb-4" />
          </div>
          <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
            <YVTitle className="text-white text-2xl mb-6">
              Outros vistos que possa interessar
            </YVTitle>
          </div>
          <div className="space-y-3">
            {vistos.map((visto, index) => {
              const isActive = visto.slug === currentSlug;
              const desc = (visto as any).excerpt || shortDescriptions[visto.slug];
              return (
                <div
                  key={visto.slug}
                  data-aos="fade-up"
                  data-aos-delay={600 + (index * 100)}
                  data-aos-duration="600"
                  className={`rounded-lg transition-colors ${isActive
                    ? 'bg-[#FFBD1A]'
                    : 'hover:bg-gray-800'
                    }`}
                >
                  <Link
                    href={`/vistos/${visto.slug}`}
                    className={`block py-4 px-4 w-full h-full ${isActive ? 'text-black' : 'text-white'}`}
                  >
                    <YVTitle
                      variant="subtitle"
                      className={`mb-1 !pb-0 text-lg ${isActive ? 'text-black' : 'text-white'
                        }`}
                    >
                      {visto.label}
                    </YVTitle>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6 pt-20">
          <div className="w-full max-w-[400px]" data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
            <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
              <YVBreadcrumbs disabled items={[{ label: 'Vistos', href: '/vistos' }]} className="text-[#FFBD1A]" />
            </div>
            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
              <YVTitle className="text-white">
                Outros vistos que possa interessar
              </YVTitle>
            </div>
          </div>
          <div className="w-full" data-aos="fade-left" data-aos-delay="500" data-aos-duration="800">
            <div className="grid grid-cols-2 gap-6 pb-[106px]">
              {vistos.map((visto, index) => {
                const isActive = visto.slug === currentSlug;
                const desc = (visto as any).excerpt || shortDescriptions[visto.slug];
                return (
                  <div
                    key={visto.slug}
                    data-aos="fade-up"
                    data-aos-delay={600 + (index * 100)}
                    data-aos-duration="600"
                    className={`rounded-lg transition-colors ${isActive
                      ? 'bg-[#FFBD1A]'
                      : 'hover:bg-gray-800'
                      }`}
                  >
                    <Link
                      href={`/vistos/${visto.slug}`}
                      className={`py-6 px-4 w-full h-full block ${isActive ? 'text-black' : 'text-white'}`}
                    >
                      <YVTitle
                        variant="subtitle"
                        className={`mb-0 !pb-0 ${isActive ? 'text-black' : 'text-white'
                          }`}
                      >
                        {visto.label}
                      </YVTitle>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
} ''