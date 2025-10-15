// import { auth } from '@/auth';

import { YVLogo, YVText, YVTitle } from '@/components/YV';
import YVHeader from '@/components/layout/YVHeader';

// import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  //   const session = await auth();
  //   if (session) {
  //     redirect('/');
  //   }
  return (
    <>
      <YVHeader />
      <div className='h-screen flex overflow-hidden'>
        {/* Left Form */}
        <div className='flex-1 flex items-center justify-center bg-white p-8'>
          <div className='w-full max-w-sm'>
            <div className='flex justify-center xl:justify-start mb-4 xl:mb-8'>

            </div>
            {children}
          </div>
        </div>

        {/* Right Side */}
        <div className='hidden xl:flex flex-1 relative bg-gradient-to-br bg-YV-secondary-gradient'>
          {/* Subtle Pattern */}
          <div className='absolute inset-0 opacity-10'>
            <div className='absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full'></div>
            <div className='absolute bottom-1/3 right-1/3 w-24 h-24 border border-white/10 rounded-full'></div>
            <div className='absolute top-1/2 right-1/4 w-16 h-16 border border-white/5 rounded-full'></div>
          </div>

          {/* Overlay Text */}
          <div className='absolute bottom-20 left-12'>
            <YVLogo className='mb-4 ' />
            <YVText className='text-base opacity-90 max-w-sm leading-relaxed font-extrabolds'>CMS</YVText>
          </div>
        </div>
      </div>
    </>
  );
}
