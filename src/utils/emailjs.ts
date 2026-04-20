import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    // In development, simulate success
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
  }, PUBLIC_KEY);
}
