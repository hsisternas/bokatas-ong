import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface VolunteerLoginModalProps {
  isOpen: boolean;
  isLoading: boolean;
  authUnavailable: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<void>;
}

const VolunteerLoginModal: React.FC<VolunteerLoginModalProps> = ({
  isOpen,
  isLoading,
  authUnavailable,
  onClose,
  onLogin,
}) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await onLogin(username, password);
      setUsername('');
      setPassword('');
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : '';
      if (message === 'invalid-volunteer-user') {
        setError(t('volunteerInvalidUser'));
        return;
      }
      if (message === 'auth/operation-not-allowed') {
        setError(t('volunteerAuthProviderDisabled'));
        return;
      }
      if (message === 'auth/invalid-credential' || message === 'auth/user-not-found' || message === 'auth/wrong-password') {
        setError(t('volunteerInvalidCredentials'));
        return;
      }
      if (message.startsWith('auth/')) {
        setError(`${t('volunteerLoginError')} (${message})`);
        return;
      }
      setError(t('volunteerLoginError'));
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-text-main">{t('volunteerLoginTitle')}</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label={t('close')}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-main">{t('volunteerUsername')}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ruta-1"
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              disabled={isLoading || authUnavailable}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-main">{t('volunteerPassword')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              disabled={isLoading || authUnavailable}
              required
            />
          </div>

          {authUnavailable && <p className="text-sm text-red-600">{t('volunteerAuthUnavailable')}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || authUnavailable}
            className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? t('loading') : t('volunteerLoginButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerLoginModal;
