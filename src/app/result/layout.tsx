import YVHeader from '@/components/layout/YVHeader';
import { getPublishedVistos } from '@/lib/actions/vistos';

export default async function ComecarLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const vistos = await getPublishedVistos();
  
  return (
    <div className='pb-0 no-swipe -mt-[88px]'>
      <YVHeader vistos={vistos} />
      <div className='relative z-[1]'>
        <main>{children}</main>
      </div>
    </div>
  );
}
