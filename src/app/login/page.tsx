'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/profile');
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </Link>
          <CardTitle className="text-2xl font-headline">Bienvenido a Bouletmushrooms</CardTitle>
          <CardDescription>Inicia sesión para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={handleGoogleSignIn} className="w-full">
              {/* This is a placeholder for a Google icon */}
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 102.3 279.2 88 248 88c-73.2 0-132.3 59.2-132.3 132.3s59.1 132.3 132.3 132.3c76.1 0 124.2-50.9 129.2-97.6H248v-83.1h235.2c4.8 26.3 7.8 54.4 7.8 85.3z"></path>
              </svg>
              Iniciar sesión con Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
