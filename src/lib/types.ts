export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  benefits: string[];
  howToUse: string;
  labResults: string;
  faqs: { question: string; answer: string }[];
  image: string;
  type: 'tincture' | 'bundle' | 'coffee';
  category: 'Medicinal' | 'Comestible';
  benefitCategory: string;
};

export type Benefit = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  category: 'guides' | 'recipes' | 'science';
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  product_id?: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: { text: string; value: string }[];
  type: 'multiple-choice';
};

export type PurchaseType = 'onetime' | 'subscribe';

export interface CartItem {
  product: Product;
  quantity: number;
}
