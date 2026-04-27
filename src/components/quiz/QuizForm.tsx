'use client';

import { useState } from 'react';
import { quizQuestions, products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ProductCard } from '../products/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useRouter } from 'next/navigation';

export function QuizForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([]);
  const router = useRouter();

  const totalQuestions = quizQuestions.length;
  const progress = ((currentStep) / totalQuestions) * 100;

  const handleActivateSubscription = () => {
    router.push('/#subscribe');
  };

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
    <div className="container mx-auto max-w-3xl px-4 py-10 md:py-20 min-h-[calc(100vh-64px)] flex flex-col justify-center relative z-10">
      {currentStep < totalQuestions ? (
        <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-medium text-[#7A9E7E] uppercase tracking-widest">
                Pregunta {currentStep + 1} de {totalQuestions}
              </span>
              <span className="text-xs md:text-sm font-medium text-white/40">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-1 bg-white/10" />
          </div>

          <h2 className="text-fluid-h2 font-headline font-bold mb-8 md:mb-12 text-white leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-3 md:gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleAnswerChange(currentQuestion.id, option.value);
                    // Automatically go to next after a small delay for better UX
                    setTimeout(handleNext, 300);
                  }}
                  className={cn(
                    "w-full text-left p-5 md:p-6 rounded-xl transition-all duration-300 border-2 flex items-center justify-between group",
                    isSelected 
                      ? "bg-[#0A0A0A] border-[#7A9E7E] shadow-[0_0_20px_rgba(122,158,126,0.2)]" 
                      : "bg-[#0A0A0A] border-transparent hover:border-[#7A9E7E]/50"
                  )}
                >
                  <span className={cn(
                    "text-base md:text-xl font-medium transition-colors",
                    isSelected ? "text-white" : "text-white/70 group-hover:text-white"
                  )}>
                    {option.text}
                  </span>
                  <div className={cn(
                    "w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-4",
                    isSelected ? "border-[#7A9E7E] bg-[#7A9E7E]" : "border-white/20 group-hover:border-[#7A9E7E]/50"
                  )}>
                    {isSelected && (
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 md:mt-12 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              disabled={currentStep === 0}
              className="text-white/50 hover:text-white hover:bg-white/5 p-0 h-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            
            <Button 
              variant="ghost" 
              asChild
              className="text-white/30 hover:text-white hover:bg-white/5 p-0 h-auto"
            >
              <a href="/">Cerrar</a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in duration-700 py-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-fluid-h1 font-headline font-bold mb-4 text-white uppercase tracking-tighter">
              Tu Stack <span className="text-[#7A9E7E]">Personalizado</span>
            </h2>
            <p className="text-fluid-p text-white/60 max-w-2xl mx-auto font-light">
              Basado en tus respuestas, hemos seleccionado los extractos ideales para potenciar tu bienestar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {recommendedProducts.map(product => (
              <div key={product.id} className="bg-[#0A0A0A] p-2 rounded-2xl border border-white/5 hover:border-[#7A9E7E]/30 transition-colors">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="bg-[#0A0A0A] p-6 md:p-10 rounded-3xl border border-[#7A9E7E]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7A9E7E]/5 blur-3xl rounded-full -mr-32 -mt-32 transition-all group-hover:bg-[#7A9E7E]/10" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-xl md:text-3xl font-bold font-headline mb-4 uppercase tracking-tight">Subscríbete y Ahorra un 10%</h3>
              <p className="text-sm md:text-base text-white/60 mb-8 max-w-xl mx-auto">
                Recibe tu stack personalizado automáticamente cada mes. Envío gratuito y flexibilidad total para pausar o cancelar.
              </p>
              <Button 
                size="lg" 
                onClick={handleActivateSubscription}
                className="w-full md:w-auto bg-[#7A9E7E] hover:bg-[#688a6b] text-black font-extrabold px-16 py-10 rounded-full text-lg md:text-xl shadow-2xl transition-all hover:scale-105"
              >
                Activar mi Suscripción
              </Button>
            </div>
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <Button 
              variant="link" 
              onClick={() => { setCurrentStep(0); setAnswers({}); }}
              className="text-white/40 hover:text-[#7A9E7E]"
            >
              Reiniciar cuestionario
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
