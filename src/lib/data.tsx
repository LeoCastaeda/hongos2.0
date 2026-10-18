import type { Product, Benefit, Article, Review, QuizQuestion } from '@/lib/types';
import React from 'react';

const EnfoqueIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 9V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.6569 17.6569L16.2426 16.2426" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.75736 9.75736L8.34315 8.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.34315 17.6569L7.75736 16.2426" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.8284 9.75736L16.2426 8.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EnergiaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3L6 14H12L11 21L18 10H12L13 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
  </svg>
);

const DescansoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79C20.79 12.92 20.59 13 20.37 13C16.92 13 14.12 10.45 14.01 7.03C13.93 4.14 16.03 1.73 18.84 1.13C18.92 1.11 19 1.1 19.07 1.1C13.03 1.1 8.37 6.11 8.37 12C8.37 17.89 13.03 22.9 19.07 22.9C20.65 22.9 22.14 22.5 23.47 21.82C22.46 22.46 21.28 22.9 20.01 22.9C15.42 22.9 11.63 18.88 11.63 14.01C11.63 13.56 11.67 13.12 11.75 12.69" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12.79C21.93 12.2 22.68 11.4 23.21 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InmunidadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7V13C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 13V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11L15 14L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const benefits: Benefit[] = [
  { id: '1', name: 'Enfoque', slug: 'focus', description: 'Mejora la función cognitiva y la memoria.', icon: EnfoqueIcon },
  { id: '2', name: 'Energía', slug: 'energy', description: 'Aumenta tus niveles de energía y vitalidad.', icon: EnergiaIcon },
  { id: '3', name: 'Calma', slug: 'calm', description: 'Ayuda a calmar la mente y reducir el estrés.', icon: CalmaIcon },
  { id: '4', name: 'Descanso', slug: 'rest', description: 'Promueve un sueño reparador y profundo.', icon: DescansoIcon },
  { id: '5', name: 'Inmunidad', slug: 'immunity', description: 'Fortalece tu sistema inmunológico.', icon: InmunidadIcon },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Extracto Doble de Melena de León 30ml',
    slug: 'lions-mane-tincture',
    price: 27,
    description: 'Potencia tu claridad mental y enfoque. Nuestra tintura de Melena de León (Hericium erinaceus) es ideal para trabajar, estudiar y la creatividad.',
    benefits: ['Mejora la memoria y el enfoque', 'Estimula la regeneración neuronal', 'Apoya la salud cognitiva'],
    howToUse: 'Toma 1 pipeta llena (1ml) una o dos veces al día. Se puede mezclar con tu bebida favorita o tomar directamente.',
    labResults: 'Extracción doble de cuerpo fructífero 100% orgánico. Testado por terceros para garantizar >25% de Beta-glucanos y pureza.',
    faqs: [
      { question: '¿Es un estimulante?', answer: 'No, la Melena de León mejora la cognición sin ser un estimulante como la cafeína. Proporciona un enfoque claro y sostenido.' },
      { question: '¿Cuándo veré resultados?', answer: 'Los efectos pueden notarse en las primeras dos semanas de uso diario, consolidándose con el tiempo.' }
    ],
    image: 'product-lions-mane',
    type: 'tincture',
    category: 'Medicinal',
    benefitCategory: 'focus',
    isBestSeller: true,
  },
  {
    id: 'prod-002',
    name: 'Extracto Doble de Cordyceps 30ml',
    slug: 'cordyceps-tincture',
    price: 27,
    description: 'Aumenta tu energía y resistencia física. El Cordyceps (Cordyceps militaris) es el aliado perfecto para deportistas y personas con un estilo de vida activo.',
    benefits: ['Aumenta la energía y vitalidad', 'Mejora el rendimiento deportivo', 'Reduce la fatiga'],
    howToUse: 'Toma 1 pipeta llena (1ml) por la mañana o antes de la actividad física. No se recomienda su uso cerca de la hora de dormir.',
    labResults: 'Extracción doble de cuerpo fructífero 100% orgánico. Testado por terceros para garantizar pureza y potencia.',
    faqs: [
      { question: '¿Puede reemplazar mi bebida energética?', answer: 'Sí, muchos usuarios lo prefieren como una fuente natural de energía sin el "bajón" de las bebidas azucaradas.' }
    ],
    image: 'product-cordyceps',
    type: 'tincture',
    category: 'Medicinal',
    benefitCategory: 'energy',
    isBestSeller: true,
  },
  {
    id: 'prod-003',
    name: 'Extracto Doble de Reishi 30ml',
    slug: 'reishi-tincture',
    price: 27,
    description: 'Encuentra tu centro y mejora tu descanso. El Reishi (Ganoderma lucidum) es el aliado perfecto para reducir el cortisol y mejorar la calidad del sueño profundo.',
    benefits: ['Mejora la calidad del sueño', 'Promueve la relajación profunda', 'Apoya el sistema inmunológico'],
    howToUse: 'Toma 1 pipeta llena (1ml) por la tarde o noche para ayudarte a desconectar y entrar en un sueño reparador.',
    labResults: 'Extracción doble de cuerpo fructífero 100% orgánico. Alto contenido en triterpenos y beta-glucanos, verificado por laboratorio.',
    faqs: [
      { question: '¿Me dará sueño si lo tomo durante el día?', answer: 'No es un sedante inmediato. Ayuda a equilibrar el sistema nervioso, facilitando un descanso natural al llegar la noche.' }
    ],
    image: 'product-reishi',
    type: 'tincture',
    category: 'Medicinal',
    benefitCategory: 'rest',
    isBestSeller: true,
  },
  {
    id: 'prod-006',
    name: 'Extracto Doble de Chaga 30ml',
    slug: 'chaga-tincture',
    price: 27,
    description: 'Refuerza tus defensas con Chaga (Inonotus obliquus). Extracto doble de cuerpo fructífero rico en antioxidantes para el sistema inmunológico y el bienestar diario.',
    benefits: ['Apoya el sistema inmunológico', 'Alto poder antioxidante', 'Vitalidad y resistencia'],
    howToUse: 'Toma 1 pipeta llena (1ml) una o dos veces al día. Se puede mezclar con agua, té o café.',
    labResults: 'Extracción doble de cuerpo fructífero. Solo fruiting bodies, sin micelio ni rellenos. Tecnología UAE.',
    faqs: [
      { question: '¿Puedo tomarlo a diario?', answer: 'Sí, el Chaga está pensado para un uso habitual como apoyo inmunológico y antioxidante.' }
    ],
    image: 'product-chaga',
    type: 'tincture',
    category: 'Medicinal',
    benefitCategory: 'immunity',
  },
  {
    id: 'prod-007',
    name: 'Extracto Doble de Tremella 30ml',
    slug: 'tremella-tincture',
    price: 27,
    description: 'Tremella (Tremella fuciformis) para hidratación, elasticidad de la piel y apoyo inmunológico. Extracto doble 100% cuerpo fructífero.',
    benefits: ['Hidratación y elasticidad de la piel', 'Apoyo inmunológico', 'Antioxidante y anti-edad'],
    howToUse: 'Toma 1 pipeta llena (1ml) al día. Ideal por la mañana o como parte de tu rutina de bienestar.',
    labResults: 'Extracción doble de cuerpo fructífero 100% Tremella fuciformis. Sin micelio, almidón ni granos. Tecnología UAE.',
    faqs: [
      { question: '¿Es solo para la piel?', answer: 'Sus beneficios cosméticos son conocidos, pero también apoya la función inmunológica y el bienestar general.' }
    ],
    image: 'product-tremella',
    type: 'tincture',
    category: 'Medicinal',
    benefitCategory: 'calm',
  },
  {
    id: 'prod-004',
    name: 'Wellness Bundle',
    slug: '3-product-bundle',
    price: 76,
    description: 'El pack más completo. Incluye Melena de León para el enfoque, Cordyceps para la energía y Reishi para el alivio del estrés y el descanso.',
    benefits: ['Rendimiento mental', 'Energía física', 'Calma y defensa inmunológica'],
    howToUse: 'Toma Cordyceps y Melena de León por la mañana para empezar el día con energía y claridad, y Reishi por la noche para descansar.',
    labResults: 'Poder de triple extracción de cuerpos fructíferos orgánicos. Calidad respaldada por laboratorios independientes.',
    faqs: [
      { question: '¿Puedo tomarlos juntos?', answer: 'Sí, puedes combinarlos según tus necesidades a lo largo del día.' }
    ],
    image: 'product-pack-3',
    type: 'bundle',
    category: 'Medicinal',
    benefitCategory: 'immunity',
    isBestSeller: true,
  },
];

export const articles: Article[] = [
  { id: '1', title: '¿Qué son los hongos funcionales?', slug: 'what-are-functional-mushrooms', content: 'Contenido completo sobre hongos funcionales...', image: 'educational-guides', category: 'guías' },
  { id: '2', title: 'Receta: Café Bulletproof con Melena de León', slug: 'bulletproof-coffee-lions-mane', content: 'Prepara esta deliciosa bebida para potenciar tu mañana...', image: 'educational-recipes', category: 'recetas' },
  { id: '3', title: 'La ciencia de la doble extracción', slug: 'science-double-extraction', content: 'Descubre por qué nuestro método de extracción es superior...', image: 'educational-science', category: 'ciencia' },
];

export const reviews: Review[] = [
  { id: '1', author: 'Elena V.', rating: 5, text: 'La tintura de Melena de León ha cambiado mi productividad. ¡Concentración máxima!', product_id: 'prod-001' },
  { id: '2', author: 'Marcus L.', rating: 5, text: 'Uso Cordyceps antes de ir al gimnasio y la diferencia en mi resistencia es brutal. ¡Energía limpia!', product_id: 'prod-002' },
  { id: '3', author: 'Sofia P.', rating: 5, text: 'El Reishi me ayuda a bajar revoluciones después de un día loco. Duermo mucho mejor. Recomendado.', product_id: 'prod-003' },
  { id: '4', author: 'Javier G.', rating: 4, text: 'El Wellness Bundle es la combinación perfecta para mis largos días de trabajo y estudio. Muy contento.', product_id: 'prod-004' },
  { id: '5', author: 'Daria P.', rating: 5, text: 'I had a dropper of the tincture this morning. WOW!!! It\'s on a completely different level than any Lion\'s Mane I\'ve tried before!', product_id: 'prod-001' },
  { id: '6', author: 'Angel W.', rating: 5, text: 'I was surprised how powerful it was... felt very calm after taking it. I keep it at my bedside so I remember to take it nightly.', product_id: 'prod-003' },
  { id: '7', author: 'Tania B.', rating: 5, text: 'I tried your elixir 3 nights in a row and loved it. I slept straight for 7 hours and woke up with positive energy.', product_id: 'prod-003' },
];

/** Text comes from messages via QuizQuestions.*; `text` is a fallback only. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'q1',
    type: 'multiple-choice',
    options: [
      { text: 'q1_focus', value: 'focus' },
      { text: 'q1_energy', value: 'energy' },
      { text: 'q1_calm', value: 'calm' },
      { text: 'q1_rest', value: 'rest' },
    ],
  },
  {
    id: 2,
    question: 'q2',
    type: 'multiple-choice',
    options: [
      { text: 'q2_high_energy', value: 'high_energy' },
      { text: 'q2_energy', value: 'energy' },
      { text: 'q2_focus', value: 'focus' },
      { text: 'q2_calm', value: 'calm' },
    ],
  },
  {
    id: 3,
    question: 'q3',
    type: 'multiple-choice',
    options: [
      { text: 'q3_good_calm', value: 'good_calm' },
      { text: 'q3_weekly_calm', value: 'weekly_calm' },
      { text: 'q3_daily_calm', value: 'daily_calm' },
      { text: 'q3_rest', value: 'rest' },
    ],
  },
  {
    id: 4,
    question: 'q4',
    type: 'multiple-choice',
    options: [
      { text: 'q4_good_sleep', value: 'good_sleep' },
      { text: 'q4_rest', value: 'rest' },
      { text: 'q4_interrupted_rest', value: 'interrupted_rest' },
      { text: 'q4_energy', value: 'energy' },
    ],
  },
  {
    id: 5,
    question: 'q5',
    type: 'multiple-choice',
    options: [
      { text: 'q5_focus', value: 'focus' },
      { text: 'q5_energy', value: 'energy' },
      { text: 'q5_daily_energy', value: 'daily_energy' },
      { text: 'q5_calm', value: 'calm' },
    ],
  },
];
