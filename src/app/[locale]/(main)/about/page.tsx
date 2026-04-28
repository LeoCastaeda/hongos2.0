import Image from 'next/image';
import { Leaf, Heart, Award, Check, FlaskConical, ShieldCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const guarantees = [
  {
    icon: FlaskConical,
    title: 'Testado por Terceros',
    desc: 'Análisis de laboratorio independientes para cada lote de producción.',
  },
  {
    icon: Leaf,
    title: '100% Orgánico',
    desc: 'Cultivado de forma sostenible. Sin pesticidas ni metales pesados.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía de Satisfacción',
    desc: 'Si no estás satisfecho en 30 días, te devolvemos tu dinero sin preguntas.',
  },
  {
    icon: Check,
    title: 'Sólo Cuerpo Fructífero',
    desc: 'Sin micelio, sin granos, sin rellenos. Máxima concentración de activos.',
  },
];

export default function AboutPage() {
  const storyImage = PlaceHolderImages.find(p => p.id === 'about-story');
  const sustainabilityImage = PlaceHolderImages.find(p => p.id === 'about-sustainability');

  return (
    <div className="bg-[#0A0A0A] text-white">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        {storyImage && (
          <Image
            src={storyImage.imageUrl}
            alt={storyImage.description}
            fill
            className="object-cover object-center"
            priority
            data-ai-hint={storyImage.imageHint}
          />
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-black/20 z-[1]" />

        <div className="relative z-10 container px-4 pb-16 md:pb-24">
          <p className="text-xs uppercase tracking-[0.5em] text-[#7A9E7E] mb-6 font-medium">
            Nuestra Historia
          </p>
          <h1 className="font-headline font-bold uppercase tracking-tighter leading-none text-[clamp(3rem,10vw,9rem)] max-w-5xl">
            Volviendo<br />
            <span className="text-[#7A9E7E]">a lo natural.</span>
          </h1>
        </div>
      </section>

      {/* ─── INTRO TEXT ────────────────────────────────────────── */}
      <section className="container px-4 py-20 lg:py-28 max-w-3xl">
        <p className="text-xl md:text-2xl font-light text-white/70 leading-relaxed">
          En Boulet, creemos que el bienestar es un equilibrio entre cuerpo y mente. 
          Nuestra misión es reconectar a las personas con el poder de la naturaleza 
          a través de extractos de hongos funcionales —cultivados con respeto y 
          procesados con ciencia.
        </p>
      </section>

      {/* ─── ASYMMETRIC BLOCK 1: Texto izquierda / Imagen derecha ─ */}
      <section className="container px-4 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          <div className="bg-[#1E2420] p-10 lg:p-16 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#7A9E7E] mb-6">
              Proceso
            </p>
            <h2 id="sustainability" className="font-headline font-bold uppercase text-4xl md:text-5xl tracking-tighter mb-8 leading-none">
              Doble Extracción.<br />Máxima Potencia.
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-6">
              Utilizamos un método de doble extracción —agua caliente y alcohol— 
              para liberar todos los compuestos bioactivos del hongo: polisacáridos, 
              beta-glucanos y triterpenos. El resultado es un extracto completo, 
              no un simple polvo.
            </p>
            <p className="text-white/60 font-light leading-relaxed">
              La extracción dura semanas. No días. La paciencia es parte 
              de nuestra fórmula.
            </p>
          </div>
          {sustainabilityImage && (
            <div className="relative min-h-[400px] lg:min-h-0">
              <Image
                src={sustainabilityImage.imageUrl}
                alt={sustainabilityImage.description}
                fill
                className="object-cover"
                data-ai-hint={sustainabilityImage.imageHint}
              />
            </div>
          )}
        </div>
      </section>

      {/* ─── ASYMMETRIC BLOCK 2: Imagen izquierda / Texto derecha ─ */}
      <section className="container px-4 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {storyImage && (
            <div className="relative min-h-[400px] lg:min-h-0 order-2 lg:order-1">
              <Image
                src={storyImage.imageUrl}
                alt={storyImage.description}
                fill
                className="object-cover"
                data-ai-hint={storyImage.imageHint}
              />
            </div>
          )}
          <div className="bg-[#F0E8D8] text-[#0A0A0A] p-10 lg:p-16 flex flex-col justify-center order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.4em] text-[#7A9E7E] mb-6">
              Origen
            </p>
            <h2 className="font-headline font-bold uppercase text-4xl md:text-5xl tracking-tighter mb-8 leading-none">
              Barcelona.<br />De la fuente<br />a tu rutina.
            </h2>
            <p className="text-[#0A0A0A]/60 font-light leading-relaxed mb-4">
              Seleccionamos los hongos de cultivos locales certificados, 
              cultivados en condiciones controladas sin pesticidas ni metales pesados. 
              Solo usamos el cuerpo fructífero — la parte del hongo con mayor 
              densidad de compuestos activos.
            </p>
            <p className="text-[#0A0A0A]/60 font-light leading-relaxed">
              Sin micelio de relleno. Sin granos. Sin trampa.
            </p>
          </div>
        </div>
      </section>

      {/* ─── GARANTÍAS ─────────────────────────────────────────── */}
      <section id="made-in-bcn" className="py-24 lg:py-32 bg-[#1E2420]">
        <div className="container px-4">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-[#7A9E7E] mb-4">Transparencia total</p>
            <h2 className="font-headline font-bold uppercase text-4xl md:text-6xl tracking-tighter">
              Nuestras Garantías
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {guarantees.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-[#1E2420] hover:bg-[#0A0A0A] transition-colors duration-300 p-10 flex flex-col gap-6"
              >
                <div className="w-12 h-12 border border-[#7A9E7E]/40 rounded-full flex items-center justify-center group-hover:border-[#7A9E7E] group-hover:bg-[#7A9E7E]/10 transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#7A9E7E]" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl uppercase tracking-tight mb-3">{title}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CIERRE ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <p className="font-headline italic text-2xl md:text-4xl text-white/60 font-light leading-relaxed">
            "La naturaleza tiene respuestas que la ciencia solo está empezando a comprender."
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-[#7A9E7E]">— Equipo Boulet</p>
        </div>
      </section>

    </div>
  );
}
