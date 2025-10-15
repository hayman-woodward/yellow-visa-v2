import { YVBreadcrumbs, YVGrid, YVText, YVTitle } from '@/components/YV';

export default function HeaderBlog() {
  return (
    <div>
      <YVGrid>
        <YVBreadcrumbs
          disabled
          items={[{ label: 'Noticias', href: '/blog' }]}
        />
        <YVTitle tag="h1" variant='hero' title='Coimbra: A cidade universiratria' />
        <YVText>
          Lorem ipsum dolor sit amet consectetur. Vulputate cursus quis commodo
          praesent blandit. Ac ultrices enim egestas molestie amet lobortis
          feugiat. Tellus ut vitae turpis malesuada eu. Risus morbi egestas
          consectetur suspendisse.
        </YVText>
      </YVGrid>
      HeaderBlog
    </div>
  );
}
