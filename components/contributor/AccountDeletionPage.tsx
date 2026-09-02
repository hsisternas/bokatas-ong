import React, { useState } from 'react';
import type { User } from 'firebase/auth';
import { deleteContributorAccount } from '../../services/contributorAuthService';

interface Props {
  user: User | null;
  onAuthenticate: () => void;
  onDeleted: () => void;
  onBack: () => void;
}

const AccountDeletionPage: React.FC<Props> = ({ user, onAuthenticate, onDeleted, onBack }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [password, setPassword] = useState('');
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');
  const hasPassword = Boolean(user?.providerData.some((provider) => provider.providerId === 'password'));

  if (!user) return <section className="panel mx-auto max-w-xl"><button className="link-button mb-4" onClick={onBack}>← Volver a recursos</button><h1 className="text-3xl font-bold">Eliminar cuenta</h1><p className="mt-4 text-text-light">Esta opción es para cuentas de colaboración creadas por ti. Las cuentas internas de voluntariado se gestionan directamente por Bokatas.</p><button className="button-primary mt-6" onClick={onAuthenticate}>Continuar con mi cuenta</button></section>;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!confirmed) return;
    setWorking(true);
    try {
      await deleteContributorAccount(user, password);
      onDeleted();
    } catch (reason) {
      const code = reason instanceof Error ? reason.message : '';
      setError(code.includes('published-resources-require-policy') ? 'Tienes recursos publicados. Bokatas debe resolver primero su retirada o conservación antes de completar la eliminación.' : code === 'organization-managed-account' ? 'Las cuentas de voluntariado se gestionan por Bokatas.' : 'No se pudo eliminar la cuenta. Vuelve a identificarte e inténtalo de nuevo.');
    } finally { setWorking(false); }
  };

  return <section className="panel mx-auto max-w-xl"><button className="link-button mb-4" onClick={onBack}>← Volver a recursos</button><h1 className="text-3xl font-bold">Eliminar cuenta</h1><p className="mt-4 text-text-light">Eliminaremos tu perfil y las propuestas que todavía no se hayan publicado. Si ya tienes recursos publicados, Bokatas debe tramitar su retirada o conservación conforme a la política aplicable antes de completar la eliminación.</p><form className="mt-6 space-y-4" onSubmit={submit}>{hasPassword && <label className="form-label">Confirma tu contraseña<input className="form-control" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>}<label className="flex items-start gap-3 text-sm"><input className="mt-1 h-5 w-5" type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} required /><span>Entiendo que esta acción elimina mi cuenta y no se puede deshacer.</span></label>{error && <p className="text-sm text-red-700 dark:text-red-300" role="alert">{error}</p>}<button className="button-danger" disabled={!confirmed || working}>{working ? 'Eliminando…' : 'Eliminar mi cuenta'}</button></form></section>;
};

export default AccountDeletionPage;
