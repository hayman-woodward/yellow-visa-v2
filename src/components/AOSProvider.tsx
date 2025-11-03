'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      // Padrão global solicitado: animações curtas, sem scale,
      // apenas opacidade + deslocamento vertical (fade-up)
      duration: 450,
      easing: 'ease-out',
      once: true,
      offset: 80
    });
  }, []);

  return null;
}
