import { YVBreadcrumbs, YVGrid, YVText, YVTitle } from '@/components/YV';

export default function HeaderBlog() {
  return (
    <div>
      <YVGrid>
        <YVBreadcrumbs
          disabled
          items={[{ label: 'Noticias', href: '/blog' }]}
        />
        <YVTitle tag="h1" variant='hero' title='Destinos em destaque' />
        <YVText>
          Explore detalhes sobre moradia, trabalho e oportunidades em diversas regiões. 
          Nossos especialistas preparam guias completos para facilitar sua transição para uma nova vida.
        </YVText>
      </YVGrid>
      HeaderBlog
    </div>
  );
}
