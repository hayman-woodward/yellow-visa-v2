'use client';

export default function ScrollButton() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className='flex flex-col items-center pb-[8px] pt-0 px-0 relative w-[65px] h-[80px] group'>
      <button
        onClick={handleScroll}
        className='flex items-center justify-center gap-[4px] h-[46px] px-0 py-[14px] rounded-[999px] shrink-0 mb-[-8px] relative w-full bg-transparent border-none outline-none cursor-pointer transition-opacity duration-300 hover:opacity-85'
        aria-label='Scroll Down'
      >
        <div className='flex flex-col gap-[4px] h-4 items-center justify-center relative shrink-0'>
          <p 
            className='font-bold text-[12px] text-center tracking-[-0.5px] whitespace-nowrap text-[#f7f5f6]'
            style={{ 
              fontFamily: 'var(--font-red-hat-text), sans-serif',
              lineHeight: '16px'
            }}
          >
            Scroll Down
          </p>
        </div>
      </button>
      <div className='bg-[#f7f5f6] flex-[1_0_0] mb-[-8px] min-h-px min-w-px shrink-0 w-[2px] transition-opacity duration-300 group-hover:opacity-85' style={{ height: '42px' }} />
    </div>
  );
}

