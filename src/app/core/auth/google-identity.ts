import { environment } from '@environment/environment';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize(options: { client_id: string; callback: (response: { credential: string }) => void }): void;
          renderButton(parent: HTMLElement, options: { theme: string; size: string; width: number; text: string }): void;
        };
      };
    };
  }
}

export async function renderGoogleIdentityButton(
  element: HTMLElement | null,
  onCredential: (credential: string) => void,
): Promise<void> {
  if (!element || !environment.googleClientId || environment.googleClientId === 'YOUR_GOOGLE_CLIENT_ID') return;

  if (!window.google) {
    await new Promise<void>((resolve, reject) => {
      const script = document.querySelector<HTMLScriptElement>('script[data-google-identity]');
      if (script) {
        script.addEventListener('load', () => resolve(), { once: true });
        script.addEventListener('error', () => reject(new Error('Google Identity script failed')), { once: true });
        return;
      }
      const newScript = document.createElement('script');
      newScript.src = 'https://accounts.google.com/gsi/client';
      newScript.async = true;
      newScript.defer = true;
      newScript.dataset['googleIdentity'] = 'true';
      newScript.onload = () => resolve();
      newScript.onerror = () => reject(new Error('Google Identity script failed'));
      document.head.appendChild(newScript);
    });
  }

  if (!window.google) throw new Error('Google Identity script did not initialize');

  window.google.accounts.id.initialize({
    client_id: environment.googleClientId,
    callback: ({ credential }) => onCredential(credential),
  });
  window.google.accounts.id.renderButton(element, {
    theme: 'outline', size: 'large', width: Math.min(400, Math.floor(element.getBoundingClientRect().width) || 320), text: 'continue_with',
  });
}

