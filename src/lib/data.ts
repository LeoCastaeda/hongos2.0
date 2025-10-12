import type { Product, Benefit, Article, Review, QuizQuestion } from '@/lib/types';
import { Brain, Zap, HeartPulse, Moon, Shield } from 'lucide-react';

export const benefits: Benefit[] = [
  { id: '1', name: 'Enfoque', slug: 'enfoque', description: 'Mejora la función cognitiva y la memoria.', icon: Brain },
  { id: '2', name: 'Energía', slug: 'energia', description: 'Aumenta tus niveles de energía y vitalidad.', icon: Zap },
  { id: '3', name: 'Calma', slug: 'calma', description: 'Ayuda a calmar la mente y reducir el estrés.', icon: HeartPulse },
  { id: '4', name: 'Descanso', slug: 'descanso', description: 'Promueve un sueño reparador y profundo.', icon: Moon },
  { id: '5', name: 'Inmunidad', slug: 'inmunidad', description: 'Fortalece tu sistema inmunológico.', icon: Shield },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Tintura de Melena de León',
    slug: 'tintura-melena-de-leon',
    price: 34.99,
    description: 'Potencia tu claridad mental y enfoque. Nuestra tintura de Melena de León (Hericium erinaceus) es ideal para el trabajo, estudio y creatividad.',
    benefits: ['Mejora la memoria y el enfoque', 'Estimula la regeneración neuronal', 'Apoya la salud cognitiva'],
    howToUse: 'Tomar 1 gotero completo (1ml) una o dos veces al día. Puede mezclarse con tu bebida favorita (café, té, batido) o tomarse directamente.',
    labResults: 'Doble extracción de cuerpo fructífero 100% orgánico. Analizado por terceros para garantizar >25% de Beta-glucanos y pureza.',
    faqs: [
      { question: '¿Es un estimulante?', answer: 'No, la Melena de León mejora la cognición sin ser un estimulante como la cafeína. Proporciona un enfoque claro y sostenido.' },
      { question: '¿Cuándo veré resultados?', answer: 'Los efectos pueden notarse en las primeras dos semanas de uso diario, con beneficios que se consolidan con el tiempo.' }
    ],
    image: 'product-lions-mane',
    isBestSeller: true,
    type: 'tincture',
    benefitCategory: 'enfoque'
  },
  {
    id: 'prod-002',
    name: 'Tintura de Cordyceps',
    slug: 'tintura-cordyceps',
    price: 34.99,
    description: 'Aumenta tu energía y resistencia física. El Cordyceps (Cordyceps militaris) es el aliado perfecto para deportistas y personas con un estilo de vida activo.',
    benefits: ['Aumenta la energía y vitalidad', 'Mejora el rendimiento atlético', 'Reduce la fatiga'],
    howToUse: 'Tomar 1 gotero completo (1ml) por la mañana o antes de la actividad física. No se recomienda su uso cerca de la hora de dormir.',
    labResults: 'Doble extracción de cuerpo fructífero 100% orgánico. Analizado por terceros para garantizar pureza y potencia.',
    faqs: [
      { question: '¿Puede sustituir mi bebida energética?', answer: 'Sí, muchos usuarios lo prefieren por ser una fuente de energía natural y sin el "crash" de las bebidas azucaradas.' }
    ],
    image: 'product-cordyceps',
    isBestSeller: true,
    type: 'tincture',
    benefitCategory: 'energia'
  },
  {
    id: 'prod-003',
    name: 'Tintura de Reishi',
    slug: 'tintura-reishi',
    price: 34.99,
    description: 'Encuentra tu centro y calma tu mente. El Reishi (Ganoderma lucidum), conocido como el "hongo de la inmortalidad", es un adaptógeno que ayuda a gestionar el estrés.',
    benefits: ['Reduce el estrés y la ansiedad', 'Promueve la relajación', 'Apoya el sistema inmunológico'],
    howToUse: 'Tomar 1 gotero completo (1ml) por la tarde o noche para ayudar a relajarte y desconectar del día.',
    labResults: 'Doble extracción de cuerpo fructífero 100% orgánico. Alto contenido en triterpenos y beta-glucanos, verificado por laboratorio.',
    faqs: [
      { question: '¿Me dará sueño si lo tomo durante el día?', answer: 'No es un sedante. Simplemente ayuda a tu cuerpo a equilibrar su respuesta al estrés, promoviendo un estado de calma.' }
    ],
    image: 'product-reishi',
    isBestSeller: true,
    type: 'tincture',
    benefitCategory: 'calma'
  },
  {
    id: 'prod-004',
    name: 'Tintura de Turkey Tail',
    slug: 'tintura-turkey-tail',
    price: 34.99,
    description: 'Refuerza tus defensas naturales. La Cola de Pavo (Trametes versicolor) es uno de los hongos más investigados por su potente apoyo al sistema inmunológico.',
    benefits: ['Fortalece el sistema inmune', 'Rico en antioxidantes y prebióticos', 'Apoya la salud intestinal'],
    howToUse: 'Tomar 1 gotero completo (1ml) al día como mantenimiento. Puede tomarse en cualquier momento del día.',
    labResults: 'Doble extracción de cuerpo fructífero 100% orgánico. Verificado para contener un alto nivel de Polisacárido-K (PSK).',
    faqs: [
      { question: '¿Puedo tomarlo si estoy resfriado?', answer: 'Sí, puede ayudar a tu cuerpo a recuperarse. Puedes aumentar la dosis a 2-3 veces al día durante periodos de enfermedad.' }
    ],
    image: 'product-turkey-tail',
    type: 'tincture',
    benefitCategory: 'inmunidad'
  },
  {
    id: 'pack-001',
    name: 'Pack Mente y Cuerpo',
    slug: 'pack-mente-y-cuerpo',
    price: 62.99,
    description: 'El pack definitivo para un rendimiento óptimo. Combina la claridad mental de la Melena de León con la energía física del Cordyceps.',
    benefits: ['Máximo rendimiento mental y físico', 'Enfoque sostenido y vitalidad', 'Ahorro del 10%'],
    howToUse: 'Tomar Cordyceps por la mañana y Melena de León cuando necesites un impulso cognitivo.',
    labResults: 'Ambos productos han sido analizados por laboratorios independientes para garantizar su calidad y pureza.',
    faqs: [],
    image: 'product-pack-mente-cuerpo',
    isBestSeller: true,
    type: 'bundle',
    benefitCategory: 'enfoque'
  },
  {
    id: 'pack-002',
    name: 'Pack Calma y Defensa',
    slug: 'pack-calma-y-defensa',
    price: 62.99,
    description: 'Fortalece tu cuerpo y calma tu mente. El Reishi te ayuda a gestionar el estrés mientras que la Cola de Pavo refuerza tu sistema inmune.',
    benefits: ['Reduce el estrés', 'Fortalece las defensas', 'Ahorro del 10%'],
    howToUse: 'Tomar Cola de Pavo por la mañana y Reishi por la tarde/noche para un bienestar integral.',
    labResults: 'Ambos productos han sido analizados por laboratorios independientes para garantizar su calidad y pureza.',
    faqs: [],
    image: 'product-pack-calma-defensa',
    type: 'bundle',
    benefitCategory: 'calma'
  },
];

export const articles: Article[] = [
  { id: '1', title: '¿Qué son los hongos funcionales?', slug: 'que-son-hongos-funcionales', content: 'Contenido completo sobre hongos funcionales...', image: 'educational-guides', category: 'guides' },
  { id: '2', title: 'Receta: Café a prueba de balas con Melena de León', slug: 'receta-cafe-melena-leon', content: 'Prepara esta deliciosa bebida para potenciar tu mañana...', image: 'educational-recipes', category: 'recipes' },
  { id: '3', title: 'La ciencia de la doble extracción', slug: 'ciencia-doble-extraccion', content: 'Descubre por qué nuestro método de extracción es superior...', image: 'educational-science', category: 'science' },
];

export const reviews: Review[] = [
  { id: '1', author: 'Elena V.', rating: 5, text: 'La tintura de Melena de León ha sido un antes y un después en mi productividad. ¡Concentración a tope!', product_id: 'prod-001' },
  { id: '2', author: 'Marcos L.', rating: 5, text: 'Uso Cordyceps antes de ir al gimnasio y la diferencia en mi resistencia es brutal. ¡Energía limpia!', product_id: 'prod-002' },
  { id: '3', author: 'Sofía P.', rating: 5, text: 'El Reishi me ayuda a bajar las revoluciones después de un día de locos. Duermo mucho mejor. Lo recomiendo.', product_id: 'prod-003' },
  { id: '4', author: 'Javier G.', rating: 4, text: 'El pack Mente y Cuerpo es la combinación perfecta para mis largas jornadas de trabajo y estudio. Muy contento.', product_id: 'pack-001' },
];

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: '¿Cuál es tu principal objetivo de bienestar?',
        type: 'multiple-choice',
        options: [
            { text: 'Mejorar mi enfoque y claridad mental', value: 'enfoque' },
            { text: 'Aumentar mis niveles de energía y vitalidad', value: 'energia' },
            { text: 'Gestionar el estrés y sentirme más calmado', value: 'calma' },
            { text: 'Mejorar la calidad de mi descanso', value: 'descanso' },
        ],
    },
    {
        id: 2,
        question: '¿Cómo te sientes normalmente a media tarde?',
        type: 'multiple-choice',
        options: [
            { text: 'Con energía y productivo', value: 'energia_alta' },
            { text: 'Noto un bajón de energía significativo', value: 'energia' },
            { text: 'Cansado mentalmente, me cuesta concentrarme', value: 'enfoque' },
            { text: 'Algo ansioso o estresado por el resto del día', value: 'calma' },
        ],
    },
    {
        id: 3,
        question: '¿Qué tan a menudo te sientes estresado o abrumado?',
        type: 'multiple-choice',
        options: [
            { text: 'Raramente', value: 'calma_buena' },
            { text: 'Varias veces por semana', value: 'calma' },
            { text: 'Casi a diario', value: 'calma' },
            { text: 'Mi estrés afecta negativamente mi sueño', value: 'descanso' },
        ],
    },
    {
        id: 4,
        question: 'Describe la calidad de tu sueño:',
        type: 'multiple-choice',
        options: [
            { text: 'Excelente, duermo profundo y me levanto renovado', value: 'sueno_bueno' },
            { text: 'Me cuesta quedarme dormido', value: 'descanso' },
            { text: 'Me despierto durante la noche', value: 'descanso' },
            { text: 'Duermo las horas, pero me levanto cansado', value: 'energia' },
        ],
    },
    {
        id: 5,
        question: '¿En qué área buscas un mayor rendimiento?',
        type: 'multiple-choice',
        options: [
            { text: 'En el trabajo o estudios, necesito más concentración', value: 'enfoque' },
            { text: 'En el deporte o actividad física, busco más resistencia', value: 'energia' },
            { text: 'En mi día a día, para tener más vitalidad general', value: 'energia' },
            { text: 'En mi capacidad para relajarme y desconectar', value: 'calma' },
        ],
    },
];
