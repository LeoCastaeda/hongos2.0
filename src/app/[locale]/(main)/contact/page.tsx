import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline">Contáctanos</CardTitle>
          <CardDescription>
            ¿Tienes alguna pregunta? Rellena el formulario y te responderemos lo antes posible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} />
            </div>
            <Button type="submit" className="w-full" size="lg">Enviar Mensaje</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
