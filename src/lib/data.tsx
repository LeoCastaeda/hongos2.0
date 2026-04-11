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
  { id: '1', name: 'Focus', slug: 'focus', description: 'Enhance cognitive function and memory.', icon: EnfoqueIcon },
  { id: '2', name: 'Energy', slug: 'energy', description: 'Boost your energy levels and vitality.', icon: EnergiaIcon },
  { id: '3', name: 'Calm', slug: 'calm', description: 'Help calm the mind and reduce stress.', icon: CalmaIcon },
  { id: '4', name: 'Rest', slug: 'rest', description: 'Promote restorative and deep sleep.', icon: DescansoIcon },
  { id: '5', name: 'Immunity', slug: 'immunity', description: 'Strengthen your immune system.', icon: InmunidadIcon },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Lion\'s Mane Double Extract 30ml',
    slug: 'lions-mane-tincture',
    price: 34.99,
    description: 'Boost your mental clarity and focus. Our Lion\'s Mane (Hericium erinaceus) tincture is ideal for work, study, and creativity.',
    benefits: ['Improves memory and focus', 'Stimulates neuronal regeneration', 'Supports cognitive health'],
    howToUse: 'Take 1 full dropper (1ml) once or twice daily. Can be mixed with your favorite beverage (coffee, tea, smoothie) or taken directly.',
    labResults: 'Double extraction of 100% organic fruiting body. Third-party tested to guarantee >25% Beta-glucans and purity.',
    faqs: [
      { question: 'Is it a stimulant?', answer: 'No, Lion\'s Mane enhances cognition without being a stimulant like caffeine. It provides clear, sustained focus.' },
      { question: 'When will I see results?', answer: 'Effects can be noticed within the first two weeks of daily use, with benefits consolidating over time.' }
    ],
    image: 'product-lions-mane',
    type: 'tincture',
    category: 'Medicinal',
    benefitCategory: 'focus'
  },
  {
    id: 'prod-002',
    name: 'Cordyceps double extract 30ml',
    slug: 'cordyceps-tincture',
    price: 34.99,
    description: 'Increase your energy and physical endurance. Cordyceps (Cordyceps militaris) is the perfect ally for athletes and people with an active lifestyle.',
    benefits: ['Boosts energy and vitality', 'Improves athletic performance', 'Reduces fatigue'],
    howToUse: 'Take 1 full dropper (1ml) in the morning or before physical activity. Not recommended for use close to bedtime.',
    labResults: 'Double extraction of 100% organic fruiting body. Third-party tested to guarantee purity and potency.',
    faqs: [
      { question: 'Can it replace my energy drink?', answer: 'Yes, many users prefer it as a natural energy source without the "crash" of sugary drinks.' }
    ],
    image: 'product-cordyceps',
    type: 'tincture',
    category: 'Medicinal',
    benefitCategory: 'energy'
  },
  {
    id: 'prod-003',
    name: 'Reishi double extract 30ml',
    slug: 'reishi-tincture',
    price: 34.99,
    description: 'Find your center and calm your mind. Reishi (Ganoderma lucidum), known as the "mushroom of immortality", is an adaptogen that helps manage stress.',
    benefits: ['Reduces stress and anxiety', 'Promotes relaxation', 'Supports the immune system'],
    howToUse: 'Take 1 full dropper (1ml) in the afternoon or evening to help you relax and disconnect from the day.',
    labResults: 'Double extraction of 100% organic fruiting body. High content of triterpenes and beta-glucans, laboratory verified.',
    faqs: [
      { question: 'Will it make me sleepy if I take it during the day?', answer: 'It\'s not a sedative. It simply helps your body balance its stress response, promoting a state of calm.' }
    ],
    image: 'product-reishi',
    type: 'tincture',
    category: 'Medicinal',
    benefitCategory: 'calm'
  },
  {
    id: 'prod-004',
    name: '3-Product Bundle',
    slug: '3-product-bundle',
    price: 99.99,
    description: 'The most complete bundle. Includes Lion\'s Mane for focus, Cordyceps for energy, and Reishi for stress relief and rest.',
    benefits: ['Mental performance', 'Physical energy', 'Calm and immune defense'],
    howToUse: 'Take Cordyceps and Lion\'s Mane in the morning to start the day with energy and clarity, and Reishi at night to rest.',
    labResults: 'Triple extraction power from organic fruiting bodies. Quality backed by independent laboratories.',
    faqs: [
      { question: 'Can I take them together?', answer: 'Yes, you can combine them according to your needs throughout the day.' }
    ],
    image: 'product-pack-3',
    type: 'bundle',
    category: 'Medicinal',
    benefitCategory: 'immunity'
  },
  {
    id: 'prod-005',
    name: 'Adaptogenic Coffee',
    slug: 'adaptogenic-coffee',
    price: 24.99,
    description: 'Start your day with energy and focus. Our organic coffee is enriched with Lion\'s Mane and Cordyceps for superior mental and physical performance.',
    benefits: ['Organic specialty coffee', 'Improves focus and energy', 'No caffeine "crash"'],
    howToUse: 'Brew a cup as you would with your regular coffee. Ideal for starting the morning or for a productive afternoon.',
    labResults: 'Naturally roasted arabica coffee with Lion\'s Mane and Cordyceps extracts. 100% organic and fair trade.',
    faqs: [
      { question: 'What does it taste like?', answer: 'It tastes like delicious high-quality coffee. The mushroom extracts don\'t significantly alter the flavor, but they do enhance its benefits.' }
    ],
    image: 'product-coffee',
    type: 'coffee',
    category: 'Edible',
    benefitCategory: 'energy'
  },
  {
    id: 'pack-001',
    name: 'Wellness Bundle',
    slug: 'mind-body-bundle',
    price: 62.99,
    description: 'The ultimate bundle for optimal performance. Combines the mental clarity of Lion\'s Mane with the physical energy of Cordyceps.',
    benefits: ['Maximum mental and physical performance', 'Sustained focus and vitality', '10% savings'],
    howToUse: 'Take Cordyceps in the morning and Lion\'s Mane when you need a cognitive boost.',
    labResults: 'Both products have been tested by independent laboratories to guarantee their quality and purity.',
    faqs: [],
    image: 'product-pack-mente-cuerpo',
    type: 'bundle',
    category: 'Medicinal',
    benefitCategory: 'focus'
  },
  {
    id: 'pack-002',
    name: 'Calm & Defense Bundle',
    slug: 'calm-defense-bundle',
    price: 62.99,
    description: 'Strengthen your body and calm your mind. Reishi helps you manage stress while Turkey Tail reinforces your immune system.',
    benefits: ['Reduces stress', 'Strengthens defenses', '10% savings'],
    howToUse: 'Take Turkey Tail in the morning and Reishi in the afternoon/evening for comprehensive wellness.',
    labResults: 'Both products have been tested by independent laboratories to guarantee their quality and purity.',
    faqs: [],
    image: 'product-pack-calma-defensa',
    type: 'bundle',
    category: 'Medicinal',
    benefitCategory: 'calm'
  },
];

export const articles: Article[] = [
  { id: '1', title: 'What are functional mushrooms?', slug: 'what-are-functional-mushrooms', content: 'Complete content about functional mushrooms...', image: 'educational-guides', category: 'guides' },
  { id: '2', title: 'Recipe: Bulletproof Coffee with Lion\'s Mane', slug: 'bulletproof-coffee-lions-mane', content: 'Prepare this delicious beverage to power your morning...', image: 'educational-recipes', category: 'recipes' },
  { id: '3', title: 'The science of double extraction', slug: 'science-double-extraction', content: 'Discover why our extraction method is superior...', image: 'educational-science', category: 'science' },
];

export const reviews: Review[] = [
  { id: '1', author: 'Elena V.', rating: 5, text: 'Lion\'s Mane tincture has been a game-changer for my productivity. Maximum concentration!', product_id: 'prod-001' },
  { id: '2', author: 'Marcus L.', rating: 5, text: 'I use Cordyceps before going to the gym and the difference in my endurance is brutal. Clean energy!', product_id: 'prod-002' },
  { id: '3', author: 'Sofia P.', rating: 5, text: 'Reishi helps me wind down after a crazy day. I sleep much better. Highly recommend.', product_id: 'prod-003' },
  { id: '4', author: 'Javier G.', rating: 4, text: 'The Mind & Body bundle is the perfect combination for my long work and study days. Very happy.', product_id: 'pack-001' },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your main wellness goal?',
    type: 'multiple-choice',
    options: [
      { text: 'Improve my focus and mental clarity', value: 'focus' },
      { text: 'Increase my energy levels and vitality', value: 'energy' },
      { text: 'Manage stress and feel calmer', value: 'calm' },
      { text: 'Improve the quality of my rest', value: 'rest' },
    ],
  },
  {
    id: 2,
    question: 'How do you normally feel mid-afternoon?',
    type: 'multiple-choice',
    options: [
      { text: 'Energetic and productive', value: 'high_energy' },
      { text: 'I notice a significant energy drop', value: 'energy' },
      { text: 'Mentally tired, hard to concentrate', value: 'focus' },
      { text: 'Somewhat anxious or stressed about the rest of the day', value: 'calm' },
    ],
  },
  {
    id: 3,
    question: 'How often do you feel stressed or overwhelmed?',
    type: 'multiple-choice',
    options: [
      { text: 'Rarely', value: 'good_calm' },
      { text: 'Several times a week', value: 'weekly_calm' },
      { text: 'Almost daily', value: 'daily_calm' },
      { text: 'My stress negatively affects my sleep', value: 'rest' },
    ],
  },
  {
    id: 4,
    question: 'Describe your sleep quality:',
    type: 'multiple-choice',
    options: [
      { text: 'Excellent, I sleep deeply and wake up refreshed', value: 'good_sleep' },
      { text: 'I have trouble falling asleep', value: 'rest' },
      { text: 'I wake up during the night', value: 'interrupted_rest' },
      { text: 'I sleep the hours, but wake up tired', value: 'energy' },
    ],
  },
  {
    id: 5,
    question: 'In which area are you looking for greater performance?',
    type: 'multiple-choice',
    options: [
      { text: 'At work or studies, I need more concentration', value: 'focus' },
      { text: 'In sports or physical activity, looking for more endurance', value: 'energy' },
      { text: 'In my daily life, to have more general vitality', value: 'daily_energy' },
      { text: 'In my ability to relax and disconnect', value: 'calm' },
    ],
  },
];

