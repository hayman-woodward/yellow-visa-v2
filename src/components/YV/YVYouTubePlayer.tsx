'use client';

import { useState } from 'react';
import Image from 'next/image';
import { YVText } from './YVText';

interface YVYouTubePlayerProps {
  videoId: string;
  poster?: string;
  title?: string;
  caption?: string;
  className?: string;
}

export const YVYouTubePlayer = ({
  videoId,
  poster,
  title = 'YouTube Video',
  caption,
  className = ''
}: YVYouTubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Video Container */}
      <div className='relative group w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl'>
        {/* Poster Image (Custom or YouTube Thumbnail) */}
        {!isPlaying && (
          <div className='relative w-full h-full'>
            {poster ? (
              <Image src={poster} alt={title} fill className='object-cover' />
            ) : (
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                className='w-full h-full object-cover'
              />
            )}

            {/* Play Button Overlay */}
            <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/1 to-black/3'>
              <button
                onClick={handlePlay}
                className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[62px] lg:h-[62px] bg-[#C04] rounded-full flex items-center justify-center hover:bg-[#B03] transition-all duration-300 shadow-2xl hover:scale-110'
                aria-label='Play video'
              >
                <svg
                  className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-[22px] lg:h-[22px] text-white'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* YouTube Embed (only when playing) */}
        {isPlaying && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&autoplay=1&controls=1`}
            title={title}
            className='w-full h-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            onLoad={handleLoad}
          />
        )}

        {/* Loading State */}
        {isPlaying && !isLoaded && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-900'>
            <div className='w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div className='mt-3 text-left'>
          <YVText variant='small'>{caption}</YVText>
        </div>
      )}
    </div>
  );
};
