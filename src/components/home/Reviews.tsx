'use client';

import { useState, useEffect } from 'react';
import { reviews } from '@/lib/data';

export function Reviews() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  };

  const prev = () => goTo(current === 0 ? reviews.length - 1 : current - 1);
  const next = () => goTo(current === reviews.length - 1 ? 0 : current + 1);

  // Auto-advance
  useEffect(() => {
    const timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  const review = reviews[current];

  return (
    <section id="reviews" className="relative py-24 lg:py-36 bg-[#1E2420] text-white overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7A9E7E]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 container px-4 max-w-4xl mx-auto">
        {/* Section label */}
        <p className="text-center text-xs uppercase tracking-[0.4em] text-[#7A9E7E] mb-16 font-medium">
          Comunidad Boulet
        </p>

        {/* Quote */}
        <div
          className="text-center transition-all duration-300"
          style={{ opacity: isAnimating ? 0 : 1, transform: isAnimating ? 'translateY(8px)' : 'translateY(0)' }}
        >
          {/* Opening quotation mark */}
          <span className="block font-headline text-[120px] md:text-[180px] leading-none text-[#7A9E7E]/20 -mb-8 select-none">
            "
          </span>

          <p className="font-headline text-2xl md:text-4xl lg:text-5xl italic font-light leading-tight text-white/90 max-w-3xl mx-auto px-4">
            {review.text}
          </p>

          {/* Stars — diamond style */}
          <div className="flex justify-center gap-2 mt-10 mb-6">
            {[...Array(review.rating)].map((_, i) => (
              <span key={i} className="text-[#7A9E7E] text-xl">✦</span>
            ))}
          </div>

          {/* Author */}
          <p className="text-sm uppercase tracking-[0.3em] text-white/50 font-medium">
            — {review.author}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-16">
          <button
            onClick={prev}
            aria-label="Anterior testimonio"
            className="text-white/30 hover:text-[#7A9E7E] transition-colors duration-300 text-2xl font-light"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-8 h-1.5 bg-[#7A9E7E]'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente testimonio"
            className="text-white/30 hover:text-[#7A9E7E] transition-colors duration-300 text-2xl font-light"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
