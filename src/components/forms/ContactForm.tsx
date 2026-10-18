'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendContactMessage } from '@/app/actions/contact';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('Contact');

  async function onSubmit(formData: FormData) {
    setLoading(true);
    try {
      const result = await sendContactMessage(formData);

      if (result.error) {
        toast({
          title: t('errorTitle'),
          description: result.error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: t('successTitle'),
        description: result.message,
      });

      const form = document.getElementById('contact-form') as HTMLFormElement | null;
      form?.reset();
    } catch {
      toast({
        title: t('errorTitle'),
        description: t('unexpected'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="contact-form" action={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{t('name')}</Label>
        <Input
          id="name"
          name="name"
          placeholder={t('namePlaceholder')}
          required
          minLength={2}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t('messagePlaceholder')}
          rows={5}
          required
          minLength={10}
        />
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? t('sending') : t('submit')}
      </Button>
    </form>
  );
}
