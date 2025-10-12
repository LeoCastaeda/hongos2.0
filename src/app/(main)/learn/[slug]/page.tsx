import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export async function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }
  
  const placeholder = PlaceHolderImages.find(p => p.id === article.image);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder-article/1200/600";
  const imageHint = placeholder?.imageHint || "article";

  return (
    <article>
        <div className="relative w-full h-96">
            <Image 
                src={imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                data-ai-hint={imageHint}
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 container text-white">
                <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-headline font-bold">
                    {article.title}
                </h1>
            </div>
        </div>

        <div className="container max-w-3xl mx-auto py-12 px-4">
            <div className="prose lg:prose-xl max-w-none prose-h2:font-headline prose-h2:text-3xl prose-a:text-primary hover:prose-a:underline">
                <p className="lead text-xl text-muted-foreground mb-8">
                    Este es el contenido del artículo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                </p>
                <p>
                    {article.content}
                </p>
                <p>
                    Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. 
                </p>
                <h2>Subtítulo de ejemplo</h2>
                <p>
                    Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
                </p>
                <ul>
                    <li>Beneficio número uno.</li>
                    <li>Otro beneficio importante.</li>
                    <li>Tercer punto a considerar.</li>
                </ul>
                <p>
                    Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. 
                </p>
            </div>
            <div className="mt-12 text-center">
                <Link href="/learn" className="text-primary hover:underline font-semibold">
                    &larr; Volver a todos los artículos
                </Link>
            </div>
        </div>
    </article>
  );
}
