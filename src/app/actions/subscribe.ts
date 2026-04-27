'use server';

import { prisma } from '@/lib/prisma';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return { error: 'El email es requerido' };
  }

  // Validación muy básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'El formato de email no es válido' };
  }

  try {
    // Buscar si ya existe para no lanzar error de unique constraint
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      return { success: false, message: '¡Ya estabas suscrito!' };
    }

    await prisma.subscriber.create({
      data: { email }
    });

    return { success: true, message: '¡Suscripción completada con éxito!' };
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return { error: 'Ha ocurrido un error al guardar tu suscripción. Inténtalo más tarde.' };
  }
}
