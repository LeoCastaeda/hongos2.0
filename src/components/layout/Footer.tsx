import Link from 'next/link';
import { Twitter, Instagram, Facebook, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  comprar: [
    { title: 'Todos los productos', href: '/collections/all' },
    { title: 'Medicinales', href: '/collections/medicinal' },
    { title: 'Comestibles', href: '/collections/comestible' },
    { title: 'Packs', href: '/collections/bundles' },
  ],
  nosotros: [
    { title: 'Nuestra Historia', href: '/about' },
    { title: 'Calidad', href: '/about#sustainability' },
    { title: 'Reseñas', href: '/#reviews' },
  ],
  ayuda: [
    { title: 'Contacto', href: '/contact' },
    { title: 'Preguntas Frecuentes', href: '/faq' },
    { title: 'Envíos y Devoluciones', href: '/shipping' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 pr-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-4">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline">
                Boulet
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              El poder ancestral de los hongos funcionales.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Tu email" className="bg-background"/>
              <Button type="submit" variant="default">Subscribirse</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              Recibe guías, ofertas y un 10% de descuento.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 col-span-1 md:col-span-2 lg:col-span-3">
              <div>
                <h3 className="font-semibold mb-4">Comprar</h3>
                <ul className="space-y-2">
                  {footerLinks.comprar.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Nosotros</h3>
                <ul className="space-y-2">
                  {footerLinks.nosotros.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Ayuda</h3>
                <ul className="space-y-2">
                  {footerLinks.ayuda.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Boulet. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
