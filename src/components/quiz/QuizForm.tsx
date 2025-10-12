'use client';

import { useState } from 'react';
import { quizQuestions, products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ProductCard } from '../products/ProductCard';
import { ArrowLeft } from 'lucide-react';

export function QuizForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([]);

  const totalQuestions = quizQuestions.length;
  const progress = ((currentStep) / totalQuestions) * 100;

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Logic to determine recommended products
      const answerValues = Object.values(answers);
      const counts: Record<string, number> = {};
      answerValues.forEach(val => {
        counts[val] = (counts[val] || 0) + 1;
      });

      const sortedBenefits = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      const primaryBenefit = sortedBenefits[0];
      const secondaryBenefit = sortedBenefits[1];
      
      let recommendations = products.filter(p => p.benefitCategory === primaryBenefit && p.type === 'tincture');
      if (secondaryBenefit) {
        const secondaryProduct = products.find(p => p.benefitCategory === secondaryBenefit && p.type === 'tincture');
        if (secondaryProduct) recommendations.push(secondaryProduct);
      }
      
      setRecommendedProducts(recommendations.slice(0, 2));
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentQuestion = quizQuestions[currentStep];

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      {currentStep < totalQuestions ? (
        <Card>
          <CardHeader>
            <Progress value={progress} className="mb-4" />
            <p className="text-sm text-muted-foreground">Pregunta {currentStep + 1} de {totalQuestions}</p>
            <CardTitle className="text-2xl font-headline">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <Label key={index} htmlFor={`option-${index}`} className="flex items-center space-x-3 rounded-md border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary">
                  <RadioGroupItem value={option.value} id={`option-${index}`} />
                  <span>{option.text}</span>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
              {currentStep === totalQuestions - 1 ? 'Ver mis resultados' : 'Siguiente'}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Tu Stack Personalizado</CardTitle>
            <CardDescription>
              Basado en tus respuestas, te recomendamos estos productos para empezar tu viaje hacia el bienestar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-bold font-headline">Subscríbete y Ahorra</h3>
                <p className="mt-2 text-muted-foreground">Recibe tu stack personalizado cada mes con un 15% de descuento y envío gratuito. ¡Cancela cuando quieras!</p>
                <Button size="lg" className="mt-4">Subscribirme al Stack</Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" onClick={() => { setCurrentStep(0); setAnswers({}); }}>
              Volver a hacer el quiz
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
