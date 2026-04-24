import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "¿Qué son los hongos funcionales?",
        answer: "Son hongos que se han utilizado durante siglos en la medicina tradicional por sus beneficios para la salud, que van más allá de su valor nutricional. Ayudan al cuerpo a adaptarse al estrés y a equilibrar diversas funciones."
    },
    {
        question: "¿Son seguros sus productos?",
        answer: "Sí. Todos nuestros productos utilizan cuerpos fructíferos de hongos 100% orgánicos. Realizamos un método de doble extracción para obtener todos los compuestos beneficiosos y cada lote es testado por laboratorios independientes para garantizar su pureza y potencia."
    },
    {
        question: "¿Cuándo notaré los efectos?",
        answer: "Los efectos pueden variar según la persona y el producto. Algunos beneficios, como la energía del Cordyceps, pueden notarse rápidamente. Otros, como los beneficios cognitivos de la Melena de León, pueden tardar unas semanas de uso constante en manifestarse por completo."
    },
    {
        question: "¿Puedo combinar varias tinturas?",
        answer: "¡Por supuesto! De hecho, lo recomendamos. Combinar diferentes hongos funcionales (lo que se conoce como 'stacking') puede potenciar sus efectos. Por ejemplo, Melena de León por la mañana para el enfoque y Reishi por la noche para la calma."
    },
    {
        question: "¿Tienen efectos secundarios?",
        answer: "Los hongos funcionales son generalmente bien tolerados. Sin embargo, como con cualquier suplemento, es recomendable consultar con tu médico antes de empezar, especialmente si estás embarazada, amamantando o tomando alguna medicación."
    }
]

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Preguntas Frecuentes</h1>
            <p className="text-lg text-muted-foreground mt-4">Todo lo que necesitas saber sobre nuestros productos.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
  );
}
