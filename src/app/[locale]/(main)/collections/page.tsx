import { redirect } from '@/i18n/routing';

export default async function CollectionsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect({ href: '/collections/all', locale });
}
