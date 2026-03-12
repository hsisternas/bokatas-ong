import type { Locale } from '../types';

const ASSISTANT_API_URL = import.meta.env.VITE_ASSISTANT_API_URL || '/api/assistant';

export const getAssistantResponse = async (userMessage: string, locale: Locale): Promise<string> => {
  const response = await fetch(ASSISTANT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: userMessage,
      locale,
    }),
  });

  if (!response.ok) {
    throw new Error(`Assistant request failed with status ${response.status}`);
  }

  const data = await response.json() as { text?: string };
  if (!data.text) {
    throw new Error('Assistant response is missing text');
  }

  return data.text;
};
