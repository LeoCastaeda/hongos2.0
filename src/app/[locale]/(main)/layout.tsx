'use client';

import { Header } from "@/components/layout/Header";
import { ChatWidget } from "@/components/chat-widget";
import { Footer } from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/en';
  const isQuizPage = pathname?.includes('/quiz');

  return (
    <div className="flex flex-col min-h-screen">
      {!isQuizPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isQuizPage && <Footer hideVideo={isHomePage} />}
      {/* <ChatWidget /> */}
    </div>
  );
}
