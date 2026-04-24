import { redirect } from '@/i18n/routing';

export default function CollectionsIndexPage() {
  redirect({ href: '/collections/all', locale: 'es' });
}
