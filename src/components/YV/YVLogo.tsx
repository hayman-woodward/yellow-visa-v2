import Image from 'next/image';

interface YVLogoProps {
  className?: string;
  showText?: boolean;
}

export const YVLogo = ({ className = '' }: YVLogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo completo - Desktop */}
      <Image
        src='/svgs/logo-text.svg'
        alt='Yellow Visa'
        width={184}
        height={28}
        className='hidden md:block flex-shrink-0'
        priority
      />

      {/* Logo compacto - Mobile */}
      <Image
        src='/svgs/logo-yv-black.svg'
        alt='Yellow Visa'
        width={40}
        height={40}
        className='md:hidden flex-shrink-0'
        priority
      />
    </div>
  );
};
