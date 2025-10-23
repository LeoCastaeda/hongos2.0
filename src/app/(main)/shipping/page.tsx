export default function ShippingPage() {
    return (
      <div className="container mx-auto max-w-3xl py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Envíos y Devoluciones</h1>
          <p className="text-lg text-muted-foreground mt-4">Información sobre cómo y cuándo recibirás tus productos.</p>
        </div>
        <div className="prose lg:prose-xl max-w-none mx-auto">
          <h2>Política de Envíos</h2>
          <p>
            Realizamos envíos a toda España (Península y Baleares). Una vez realizado tu pedido, lo procesaremos en un plazo de 1-2 días laborables.
          </p>
          <ul>
            <li><strong>Envío Estándar (3-5 días laborables):</strong> 4.99€. Gratuito para pedidos superiores a 50€.</li>
            <li><strong>Envío Express (1-2 días laborables):</strong> 7.99€.</li>
          </ul>
          <p>
            Recibirás un correo electrónico con un número de seguimiento tan pronto como tu pedido sea enviado para que puedas saber dónde está en todo momento.
          </p>

          <h2>Política de Devoluciones</h2>
          <p>
            Tu satisfacción es nuestra prioridad. Si por alguna razón no estás satisfecho con tu compra, tienes un plazo de 30 días desde la fecha de recepción para solicitar una devolución.
          </p>
          <p>
            Para iniciar el proceso de devolución, por favor, contacta con nosotros en <a href="mailto:ayuda@boulet.com">ayuda@boulet.com</a> con tu número de pedido y el motivo de la devolución. El producto debe estar sin abrir y en su embalaje original.
          </p>
          <p>
            Una vez que recibamos y verifiquemos el producto devuelto, procederemos al reembolso completo del importe de tu compra (excluyendo los gastos de envío originales).
          </p>
        </div>
      </div>
    );
  }
  