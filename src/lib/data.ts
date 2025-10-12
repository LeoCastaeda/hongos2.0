import type { Product, Benefit, Article, Review, QuizQuestion } from '@/lib/types';
import { Brain, Zap, HeartPulse, Moon, Shield, Leaf } from 'lucide-react';

export const benefits: Benefit[] = [
  { id: '1', name: 'Cerebro', slug: 'cerebro', description: 'Mejora la función cognitiva y la memoria.', icon: Brain },
  { id: '2', name: 'Energía', slug: 'energia', description: 'Aumenta tus niveles de energía y vitalidad.', icon: Zap },
  { id: '3', name: 'Estrés', slug: 'estres', description: 'Ayuda a calmar la mente y reducir el estrés.', icon: HeartPulse },
  { id: '4', name: 'Sueño', slug: 'sueno', description: 'Promueve un sueño reparador y profundo.', icon: Moon },
  { id: '5', name: 'Inmunidad', slug: 'inmunidad', description: 'Fortalece tu sistema inmunológico.', icon: Shield },
  { id: '6', name: 'Digestión', slug: 'digestion', description: 'Mejora la salud de tu sistema digestivo.', icon: Leaf },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Tinctura Cerebro',
    slug: 'tinctura-cerebro',
    price: 29.99,
    description: 'Una mezcla de hierbas nootrópicas para mejorar la claridad mental, el enfoque y la memoria. Perfecto para estudiantes y profesionales.',
    benefits: ['Mejora el enfoque', 'Aumenta la memoria', 'Claridad mental'],
    howToUse: 'Tomar 1 gotero completo (1ml) dos veces al día. Puede mezclarse con agua o zumo.',
    labResults: 'Cada lote es probado por terceros para garantizar su pureza y potencia. Certificado de análisis disponible bajo petición.',
    faqs: [
      { question: '¿Tiene cafeína?', answer: 'No, esta fórmula no contiene cafeína ni otros estimulantes.' },
      { question: '¿Cuándo veré resultados?', answer: 'Los efectos pueden notarse en tan solo unos días, con beneficios acumulativos a lo largo de varias semanas.' }
    ],
    image: 'product-cerebro',
    isBestSeller: true,
    type: 'tincture',
    benefitCategory: 'cerebro'
  },
  {
    id: 'prod-002',
    name: 'Tinctura Energía',
    slug: 'tinctura-energia',
    price: 27.99,
    description: 'Combate la fatiga y aumenta tu vitalidad de forma natural con esta mezcla de adaptógenos y hierbas energizantes.',
    benefits: ['Aumento de energía sostenida', 'Combate la fatiga', 'Mejora el rendimiento físico'],
    howToUse: 'Tomar 1 gotero completo (1ml) por la mañana y al mediodía. Evitar tomarlo cerca de la hora de dormir.',
    labResults: 'Libre de metales pesados y pesticidas. Certificado de análisis disponible.',
    faqs: [
      { question: '¿Puede reemplazar mi café de la mañana?', answer: 'Muchos usuarios lo encuentran como una excelente alternativa sin los nervios del café.' }
    ],
    image: 'product-energia',
    type: 'tincture',
    benefitCategory: 'energia'
  },
  {
    id: 'prod-003',
    name: 'Tinctura Estrés',
    slug: 'tinctura-estres',
    price: 31.99,
    description: 'Una fórmula calmante para ayudar a tu cuerpo a gestionar el estrés diario y promover una sensación de calma y bienestar.',
    benefits: ['Reduce la ansiedad', 'Promueve la calma', 'Equilibra el estado de ánimo'],
    howToUse: 'Tomar 1 gotero completo (1ml) hasta tres veces al día, según sea necesario durante momentos de estrés.',
    labResults: 'Potencia garantizada. Probado en laboratorio para pureza.',
    faqs: [
      { question: '¿Me dará sueño?', answer: 'No es un sedante, pero al reducir el estrés, puede ayudarte a relajarte. Es seguro para usar durante el día.' }
    ],
    image: 'product-estres',
    isBestSeller: true,
    type: 'tincture',
    benefitCategory: 'estres'
  },
  {
    id: 'prod-004',
    name: 'Tinctura Sueño',
    slug: 'tinctura-sueno',
    price: 28.99,
    description: 'Relájate y prepárate para una noche de sueño profundo y reparador. Esta mezcla te ayuda a conciliar el sueño más rápido y a mejorar su calidad.',
    benefits: ['Concilia el sueño más rápido', 'Mejora la calidad del sueño', 'Despierta renovado'],
    howToUse: 'Tomar 1-2 goteros completos (1-2ml) 30 minutos antes de acostarse.',
    labResults: 'Cada lote es analizado para garantizar la ausencia de contaminantes.',
    faqs: [
      { question: '¿Crea dependencia?', answer: 'No, esta fórmula utiliza hierbas no adictivas para promover el ciclo natural del sueño.' }
    ],
    image: 'product-sueno',
    type: 'tincture',
    benefitCategory: 'sueno'
  },
    {
    id: 'prod-005',
    name: 'Tinctura Inmunidad',
    slug: 'tinctura-inmunidad',
    price: 26.99,
    description: 'Refuerza las defensas naturales de tu cuerpo con esta poderosa mezcla de hierbas que apoyan el sistema inmunológico.',
    benefits: ['Fortalece el sistema inmune', 'Propiedades antivirales y antibacterianas', 'Rico en antioxidantes'],
    howToUse: 'Tomar 1 gotero completo (1ml) al día para mantenimiento. Aumentar a 3 veces al día ante los primeros síntomas de resfriado.',
    labResults: 'Certificado de análisis disponible bajo petición.',
    faqs: [
      { question: '¿Es seguro para niños?', answer: 'Recomendamos consultar con un pediatra antes de administrarlo a niños.' }
    ],
    image: 'product-inmunidad',
    type: 'tincture',
    benefitCategory: 'inmunidad'
  },
  {
    id: 'pack-001',
    name: 'Pack Productividad',
    slug: 'pack-productividad',
    price: 52.99,
    description: 'El dúo dinámico para un rendimiento mental y físico óptimo. Incluye Tinctura Cerebro y Tinctura Energía.',
    benefits: ['Máximo enfoque mental', 'Energía durante todo el día', 'Ahorro del 10%'],
    howToUse: 'Combinar el uso de ambas tincturas según las instrucciones individuales para potenciar los resultados.',
    labResults: 'Ambos productos probados por terceros.',
    faqs: [],
    image: 'product-pack-productividad',
    isBestSeller: true,
    type: 'bundle',
    benefitCategory: 'cerebro'
  },
  {
    id: 'pack-002',
    name: 'Pack Calma Total',
    slug: 'pack-calma-total',
    price: 54.99,
    description: 'Encuentra tu equilibrio día y noche. Gestiona el estrés durante el día y duerme profundamente por la noche. Incluye Tinctura Estrés y Tinctura Sueño.',
    benefits: ['Bienestar 24/7', 'Menos estrés, mejor sueño', 'Ahorro del 10%'],
    howToUse: 'Usar Tinctura Estrés durante el día y Tinctura Sueño por la noche.',
    labResults: 'Ambos productos probados por terceros.',
    faqs: [],
    image: 'product-pack-nervioso',
    type: 'bundle',
    benefitCategory: 'estres'
  },
  {
    id: 'pack-003',
    name: 'Pack Inmunidad Plus',
    slug: 'pack-inmunidad-plus',
    price: 49.99,
    description: 'Una defensa completa para tu cuerpo. Incluye Tinctura Inmunidad y Tinctura Digestivo para una base sólida de salud.',
    benefits: ['Doble protección', 'Salud digestiva e inmune', 'Ahorro del 10%'],
    howToUse: 'Tomar cada tinctura según sus indicaciones para un apoyo integral.',
    labResults: 'Ambos productos probados por terceros.',
    faqs: [],
    image: 'product-pack-inmunidad',
    type: 'bundle',
    benefitCategory: 'inmunidad'
  },
];

export const articles: Article[] = [
  { id: '1', title: 'Guía de adaptógenos para principiantes', slug: 'guia-adaptogenos', content: 'Contenido completo sobre adaptógenos...', image: 'educational-guides', category: 'guides' },
  { id: '2', title: 'Receta de Latte Relajante con Tinctura de Sueño', slug: 'receta-latte-sueno', content: 'Prepara esta deliciosa bebida...', image: 'educational-recipes', category: 'recipes' },
  { id: '3', title: 'La ciencia detrás de los nootrópicos naturales', slug: 'ciencia-nootropicos', content: 'Explora cómo funcionan las hierbas para el cerebro...', image: 'educational-science', category: 'science' },
];

export const reviews: Review[] = [
  { id: '1', author: 'Ana G.', rating: 5, text: 'La Tinctura Cerebro ha cambiado mis días de trabajo. ¡Mucho más enfocada!', product_id: 'prod-001' },
  { id: '2', author: 'Carlos R.', rating: 5, text: '¡Increíble! Duermo como un bebé con la Tinctura Sueño. Totalmente recomendado.', product_id: 'prod-004' },
  { id: '3', author: 'Lucía M.', rating: 4, text: 'El Pack Productividad es genial. La Tinctura de Energía me da un empujón sin nervios.', product_id: 'pack-001' },
  { id: '4', author: 'Javier P.', rating: 5, text: 'He notado una gran diferencia en mis niveles de estrés desde que tomo la Tinctura Estrés. Un producto excelente.', product_id: 'prod-003' },
];

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: '¿Cuál es tu principal objetivo de bienestar?',
        type: 'multiple-choice',
        options: [
            { text: 'Mejorar mi enfoque y memoria', value: 'cerebro' },
            { text: 'Tener más energía durante el día', value: 'energia' },
            { text: 'Reducir el estrés y la ansiedad', value: 'estres' },
            { text: 'Dormir mejor por la noche', value: 'sueno' },
        ],
    },
    {
        id: 2,
        question: '¿Cómo describirías tus niveles de energía a media tarde?',
        type: 'multiple-choice',
        options: [
            { text: 'Altos y estables', value: 'energia_alta' },
            { text: 'Sufro un bajón notable', value: 'energia' },
            { text: 'Variables, dependen del día', value: 'estres' },
            { text: 'Bajos, me siento cansado', value: 'energia' },
        ],
    },
    {
        id: 3,
        question: '¿Con qué frecuencia te sientes abrumado o estresado?',
        type: 'multiple-choice',
        options: [
            { text: 'Casi nunca', value: 'calma' },
            { text: 'Algunas veces a la semana', value: 'estres' },
            { text: 'Casi todos los días', value: 'estres' },
            { text: 'El estrés afecta mi sueño', value: 'sueno' },
        ],
    },
    {
        id: 4,
        question: '¿Qué tal es la calidad de tu sueño?',
        type: 'multiple-choice',
        options: [
            { text: 'Duermo profundamente y me levanto descansado', value: 'sueno_bueno' },
            { text: 'Me cuesta conciliar el sueño', value: 'sueno' },
            { text: 'Me despierto varias veces por la noche', value: 'sueno' },
            { text: 'Duermo, pero me levanto cansado', value: 'energia' },
        ],
    },
    {
        id: 5,
        question: '¿Te gustaría mejorar tu capacidad para concentrarte en tareas complejas?',
        type: 'multiple-choice',
        options: [
            { text: 'Sí, es una prioridad para mí', value: 'cerebro' },
            { text: 'A veces me distraigo, podría mejorar', value: 'cerebro' },
            { text: 'No, mi concentración es buena', value: 'concentracion_buena' },
            { text: 'Mi falta de energía afecta mi concentración', value: 'energia' },
        ],
    },
];
