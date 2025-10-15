import { YVBreadcrumbs, YVText, YVTitle } from "@/components/YV";

export default function BlogHeader() {
  return (
    <div>
      <YVBreadcrumbs disabled items={[{ label: 'Blog', href: '/noticias' }]} className="pb-4 md:pb-5" />
      <YVTitle tag="h1" variant='hero' title='Coimbra: A cidade universiratria' />
      <YVText className="mb-6">
        Qualidade de vida, praias próximas e um polo de inovação crescente
      </YVText>
      <div className="flex items-center gap-4">
        <div>Avatar
        </div>
        <div>
          <YVTitle>
            Kristin Watson
          </YVTitle>
          <YVText>
            Consultora de imigração da Yellow Visa
          </YVText>
        </div>
      </div>

    </div>
  );
}