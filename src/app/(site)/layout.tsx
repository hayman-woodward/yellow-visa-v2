import YVFooter from '@/components/layout/YVFooter';
import YVHeader from '@/components/layout/YVHeader';
import Newsletter from '@/components/shared/Newsletter';
import { getPublishedVistos } from '@/lib/actions/vistos';

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const vistos = await getPublishedVistos();
  return (
    <div className='pb-0 md:pb-[900px] no-swipe'>
      <YVHeader vistos={vistos} />
      <div className='relative z-[1]'>
        <main>{children}</main>
        <Newsletter />
      </div>
      <YVFooter vistos={vistos} />
    </div>
  );
}
