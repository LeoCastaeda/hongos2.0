import { QuizForm } from "@/components/quiz/QuizForm";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function QuizPage() {
  const quizImage = PlaceHolderImages.find(p => p.id === 'quiz-background');

  return (
    <div>
        <div className="relative bg-secondary py-20 text-center">
            {quizImage && (
            <Image
                src={quizImage.imageUrl}
                alt={quizImage.description}
                fill
                className="object-cover"
                data-ai-hint={quizImage.imageHint}
            />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 container">
                <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-white">
                    Encuentra tu Bienestar Personalizado
                </h1>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                    Responde unas pocas preguntas y te recomendaremos el stack perfecto para tus objetivos.
                </p>
            </div>
        </div>
      <QuizForm />
    </div>
  );
}
