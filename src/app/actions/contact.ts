'use server';

import { prisma } from '@/lib/prisma';
import { CONTACT_EMAIL } from '@/lib/contact';

export async function sendContactMessage(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { error: 'El nombre es requerido.' };
  }

  if (!email || typeof email !== 'string') {
    return { error: 'El email es requerido.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'El formato de email no es válido.' };
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return { error: 'El mensaje debe tener al menos 10 caracteres.' };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      },
    });

    return {
      success: true,
      message: 'Mensaje enviado. Te responderemos lo antes posible.',
    };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return {
      error: `No se pudo enviar el mensaje. Inténtalo más tarde o escribe a ${CONTACT_EMAIL}.`,
    };
  }
}
