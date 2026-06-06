export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }
}
