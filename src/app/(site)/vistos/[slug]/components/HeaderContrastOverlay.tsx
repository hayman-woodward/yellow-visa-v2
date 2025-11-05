'use client';

import { useEffect, useState } from 'react';

interface HeaderContrastOverlayProps {
  imageUrl: string;
  height?: number; // overlay height in px
}

// Simple brightness detector: samples the image and estimates average luminance
function estimateImageBrightness(src: string): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return resolve(255); // assume light if no context
        const sampleSize = 16;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        context.drawImage(img, 0, 0, sampleSize, sampleSize);
        const { data } = context.getImageData(0, 0, sampleSize, sampleSize);
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // perceived luminance
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          total += luminance;
        }
        const avg = total / (data.length / 4);
        resolve(avg);
      } catch {
        resolve(255);
      }
    };
    img.onerror = () => resolve(255);
  });
}

export default function HeaderContrastOverlay({ imageUrl, height = 120 }: HeaderContrastOverlayProps) {
  const [isLight, setIsLight] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    estimateImageBrightness(imageUrl).then((avg) => {
      if (!mounted) return;
      // threshold ~ 170: higher is lighter
      setIsLight(avg >= 170);
    });
    return () => {
      mounted = false;
    };
  }, [imageUrl]);

  // Only render overlay when image is light; otherwise keep it transparent
  return (
    <div className='absolute inset-0 pointer-events-none'>
      <div
        className={`w-full bg-gradient-to-b ${isLight ? 'from-black/55 to-transparent' : 'from-transparent to-transparent'}`}
        style={{ height }}
      />
    </div>
  );
}


