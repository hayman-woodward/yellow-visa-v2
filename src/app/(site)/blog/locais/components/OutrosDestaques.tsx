import { YVGallery, YVSection, YVTitle } from "@/components/YV";
import { truncateText } from "@/utils/text";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: Date | string | null;
}

export default function OutrosDestaques({ posts = [] }: { posts?: Post[] }) {
  const galleryItems = posts.map(post => ({
    id: post.id,
    src: post.featuredImage || "/imgs/home/estados-unidos.jpg",
    alt: post.title,
    title: post.title,
    description: post.excerpt ? truncateText(post.excerpt, 63) : "",
    // We should probably pass the link as well, or YVGallery handles it? 
    // Looking at the previous items, they didn't have a link property, but maybe it handles navigation?
    // Let's check YVGallery if possible or assume it needs href.
    href: `/blog/${post.category ? post.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() : 'noticias'}/${post.slug}`
  }));

  if (posts.length === 0) return null;

  return (
    <YVSection className="bg-[#0F0005]">
      <div className="max-w-[1248px] md:px-8 xl:px-0 mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start justify-between">
          <div className="space-y-8 w-full lg:w-[294px] lg:flex-shrink-0">
            <div className="pr-20">
              <YVTitle
                variant="heading"
                title="Outros destaques"
                className="mb-4 md:mb-6 text-white"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <div className="w-full flex justify-end">
              <YVGallery
                items={galleryItems}
                showTitles={true}
                columns={3}
                imageClassName="aspect-[294/400] object-cover"
                showDescriptions={true}
                darkMode={true}
              />
            </div>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
