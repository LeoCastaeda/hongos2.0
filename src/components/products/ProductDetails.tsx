'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { useMessages, useTranslations } from 'next-intl';
import { Star, CheckCircle, Minus, Plus, ShoppingCart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product, Review } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { flyToCart } from '@/lib/fly-to-cart';
import { getProductCopy } from '@/lib/product-messages';

interface ProductDetailsProps {
    product: Product;
    reviews: Review[];
}

export function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const imageRef = useRef<HTMLDivElement>(null);

  const placeholder = PlaceHolderImages.find(p => p.id === product.image);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder/600/600";
  const imageHint = placeholder?.imageHint || "product";

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    flyToCart(imageRef.current, imageUrl);
    addToCart(product, quantity);
  }

  const messages = useMessages();
  const tp = useTranslations('Product');
  const {
    name: productName,
    description: productDescription,
    habitat: productHabitat,
    howToUse: productHowToUse,
  } = getProductCopy((messages as { products?: unknown }).products, product);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
      {/* Image Gallery */}
      <div className="relative">
        <div ref={imageRef} className="aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={productName}
            width={600}
            height={600}
            className="h-full w-full object-cover"
            data-ai-hint={imageHint}
          />
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold font-headline lg:text-4xl">{productName}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{productDescription}</p>
        
        <div className="mt-4 flex items-center gap-2">
          {(() => {
            const average =
              reviews.length > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
                : 0;
            const rounded = Math.round(average);
            return (
              <>
                <div className="flex items-center" aria-label={reviews.length ? `${average.toFixed(1)} de 5` : 'Sin valoraciones'}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        reviews.length > 0 && i < rounded
                          ? 'text-accent fill-accent'
                          : 'text-muted-foreground/40'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {reviews.length > 0
                    ? tp(reviews.length === 1 ? 'reviews' : 'reviews_plural', {
                        rating: average.toFixed(1),
                        count: reviews.length,
                      })
                    : tp('noReviews')}
                </p>
              </>
            );
          })()}
        </div>
        
        <p className="mt-4 text-3xl font-bold">
          {product.price.toFixed(2)}€
        </p>
        
        <form className="mt-8" onSubmit={handleAddToCart}>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex items-center justify-center rounded border border-gray-200 h-11 sm:h-auto">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} type="button" className="h-full px-4">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-sm">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} type="button" className="h-full px-4">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit" size="lg" className="flex-1 w-full sm:w-auto h-14 text-lg font-bold uppercase tracking-wider">
              <ShoppingCart className="mr-2 h-6 w-6" />
              {tp('addToCart')}
            </Button>
          </div>
        </form>

        <div className="mt-8 space-y-2">
          {product.benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>

        <Separator className="my-8" />
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="habitat">
            <AccordionTrigger>{tp('habitat')}</AccordionTrigger>
            <AccordionContent>{productHabitat}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="how-to-use">
            <AccordionTrigger>{tp('howToUse')}</AccordionTrigger>
            <AccordionContent>{productHowToUse}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="lab-results">
            <AccordionTrigger>{tp('labResults')}</AccordionTrigger>
            <AccordionContent>{product.labResults}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq">
            <AccordionTrigger>{tp('faq')}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {product.faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
