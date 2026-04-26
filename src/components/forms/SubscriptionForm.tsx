'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter } from '@/app/actions/subscribe';

export function SubscriptionForm({ className, inputClassName, buttonClassName, buttonVariant = 'default' }: { className?: string, inputClassName?: string, buttonClassName?: string, buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(formData: FormData) {
    setLoading(true);
    
    try {
      const result = await subscribeToNewsletter(formData);
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Gracias!",
          description: result.message,
        });
        
        // Reset form
        const form = document.getElementById('subscribe-form') as HTMLFormElement;
        if (form) form.reset();
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="subscribe-form" action={onSubmit} className={className || "flex flex-col sm:flex-row w-full max-w-md mx-auto items-center space-y-2 sm:space-y-0 sm:space-x-2"}>
      <Input
        type="email"
        name="email"
        required
        placeholder="Introduce tu dirección de email"
        className={inputClassName || "bg-[#FDFBF7] border-none rounded-none text-foreground placeholder:text-muted-foreground focus:bg-[#FDFBF7] focus:text-foreground focus-visible:ring-0"}
      />
      <Button 
        type="submit" 
        disabled={loading}
        variant={buttonVariant}
        className={buttonClassName || "w-full sm:w-auto bg-primary hover:bg-primary/90 text-white border-none shadow-lg rounded-none uppercase tracking-widest text-xs py-6 px-8"}
      >
        {loading ? 'Enviando...' : 'Suscribirme'}
      </Button>
    </form>
  );
}
