'use client';
import { useState } from 'react';
import { products, reviews as allReviews } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Star, CheckCircle, Minus, Plus, ShoppingCart } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState('onetime');

  const product = products.find((p) => p.slug === params.slug);
  const productReviews = allReviews.filter(r => r.product_id === product?.id);
  const recommendedStack = products.filter(p => p.type === 'tincture' && p.id !== product?.id).slice(0, 2);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }
  
  const placeholder = PlaceHolderImages.find(p => p.id === product.image);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder/600/600";
  const imageHint = placeholder?.imageHint || "product";

  const originalPrice = product.price;
  const subscriptionPrice = originalPrice * 0.85;
  const displayPrice = purchaseType === 'subscribe' ? subscriptionPrice : originalPrice;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              data-ai-hint={imageHint}
            />
          </div>
          {product.isBestSeller && (
            <Badge variant="default" className="absolute top-4 left-4 bg-accent text-accent-foreground">
              Best Seller
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold font-headline lg:text-4xl">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.description}</p>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                ))}
            </div>
            <p className="text-sm text-muted-foreground">({productReviews.length} reseñas)</p>
          </div>
          
          <p className="mt-4 text-3xl font-bold">
            {displayPrice.toFixed(2)}€
            {purchaseType === 'subscribe' && <span className="ml-2 text-base font-normal text-muted-foreground line-through">{originalPrice.toFixed(2)}€</span>}
          </p>
          
          <form className="mt-8">
            <fieldset>
              <legend className="mb-4 font-medium">Elige tu opción de compra:</legend>
              <RadioGroup value={purchaseType} onValueChange={setPurchaseType} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Label htmlFor="onetime" className={`flex cursor-pointer flex-col rounded-lg border p-4 hover:bg-accent/10 ${purchaseType === 'onetime' ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Compra única</span>
                    <RadioGroupItem value="onetime" id="onetime" />
                  </div>
                  <span className="mt-1 text-sm text-muted-foreground">{originalPrice.toFixed(2)}€</span>
                </Label>
                <Label htmlFor="subscribe" className={`flex cursor-pointer flex-col rounded-lg border p-4 hover:bg-accent/10 ${purchaseType === 'subscribe' ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Subscríbete y ahorra</span>
                    <RadioGroupItem value="subscribe" id="subscribe" />
                  </div>
                  <span className="mt-1 text-sm text-muted-foreground">{subscriptionPrice.toFixed(2)}€</span>
                   <Badge variant="outline" className="mt-2 w-fit bg-green-100 text-green-800 border-green-300">Ahorra 15% + Envío Gratis</Badge>
                </Label>
              </RadioGroup>
            </fieldset>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded border border-gray-200">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} type="button">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} type="button">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button type="submit" size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al carrito
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
            <AccordionItem value="how-to-use">
              <AccordionTrigger>Dosis y cómo tomarlo</AccordionTrigger>
              <AccordionContent>{product.howToUse}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="lab-results">
              <AccordionTrigger>Resultados de laboratorio</AccordionTrigger>
              <AccordionContent>{product.labResults}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq">
              <AccordionTrigger>Preguntas frecuentes</AccordionTrigger>
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
      
      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold font-headline text-center lg:text-3xl">Opiniones de Clientes</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {productReviews.length > 0 ? productReviews.map(review => (
            <div key={review.id} className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted'}`} />
                ))}
              </div>
              <p className="mt-4 italic text-muted-foreground">"{review.text}"</p>
              <p className="mt-4 font-semibold text-right">- {review.author}</p>
            </div>
          )) : (
            <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">Aún no hay reseñas para este producto. ¡Sé el primero!</p>
          )}
        </div>
      </div>

      {/* Cross-sell Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold font-headline text-center lg:text-3xl">Stack Recomendado</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard product={product} />
            {recommendedStack.map(recProduct => (
                <ProductCard key={recProduct.id} product={recProduct} />
            ))}
        </div>
      </div>
    </div>
  );
}
