import { benefits } from '@/lib/data';
import Link from 'next/link';

export function BenefitIcons() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mt-16 max-w-4xl mx-auto">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;
        return (
          <Link 
            href={`/collections/${benefit.slug}`} 
            key={benefit.id} 
            className="flex flex-col items-center group transition-all"
          >
            <div className="mb-4">
              <Icon className="w-10 h-10 text-[#7A9E7E] transition-transform group-hover:scale-110 duration-300" />
            </div>
            <span className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors mb-1">
              {benefit.name}
            </span>
            <span className="text-[10px] font-body text-[#7A9E7E] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
              {benefit.slug === 'rest' ? 'Sugerencia: Reishi' : 
               benefit.slug === 'focus' ? 'Sugerencia: Melena' :
               benefit.slug === 'energy' ? 'Sugerencia: Cordyceps' :
               benefit.slug === 'calm' ? 'Sugerencia: Reishi' :
               benefit.slug === 'immunity' ? 'Sugerencia: Pack 3' : ''}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
