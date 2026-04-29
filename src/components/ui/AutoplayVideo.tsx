'use client';

import { useEffect, useRef } from 'react';

interface AutoplayVideoProps {
  src: string;
  className?: string;
}

/**
 * AutoplayVideo — soluciona el bug de React donde el atributo `muted`
 * no se propaga correctamente al DOM, impidiendo el autoplay en iOS Safari.
 * Usar este componente en lugar de <video> siempre que se necesite autoplay.
 */
export function AutoplayVideo({ src, className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;        // Fix crítico para iOS Safari
      videoRef.current.play().catch(() => { // Silencia errores de política de autoplay
        // El navegador puede bloquear autoplay en algunos contextos; fallback silencioso
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
