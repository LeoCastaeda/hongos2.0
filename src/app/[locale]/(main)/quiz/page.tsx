import type { Metadata } from 'next';
import { QuizForm } from "@/components/quiz/QuizForm";
import { AutoplayVideo } from '@/components/ui/AutoplayVideo';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: '/quiz',
    title: 'Quiz de Bienestar',
    description:
      'Descubre qué hongo funcional encaja mejor contigo según tus objetivos de enfoque, energía, calma o descanso.',
    image: 'quiz-background',
  });
}

export default function QuizPage() {
  return (
    <div className="relative min-h-screen bg-[#1E2420] text-white selection:bg-primary/30 overflow-hidden">
      {/* Background Video */}
      <AutoplayVideo
        src="/videos/quiz.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E2420]/80 via-[#1E2420]/60 to-[#1E2420]/90 z-0" />

      <div className="relative z-10">
        <QuizForm />
      </div>
    </div>
  );
}
