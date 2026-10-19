'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
  /** `light` = white wordmark for dark backgrounds; `dark` = ink for light backgrounds */
  variant?: 'light' | 'dark';
  className?: string;
  priority?: boolean;
};

const SRC = {
  light: '/brand/boulet-logo-light.png',
  dark: '/brand/boulet-logo-dark.png',
} as const;

export function BrandLogo({
  variant = 'light',
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={SRC[variant]}
      alt="Boulet"
      width={267}
      height={102}
      priority={priority}
      className={cn('h-8 w-auto object-contain md:h-9', className)}
    />
  );
}
