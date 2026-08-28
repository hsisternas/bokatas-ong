import React, { useState } from 'react';
import { resetContributorPassword, signInContributorEmail, signInContributorGoogle, signUpContributor } from '../../services/contributorAuthService';

interface Props { open: boolean; onClose: () => void; onDismiss?: () => void; intent?: 'list' | 'create' | null; }
type Mode = 'signin' | 'signup' | 'reset';

const ContributorAuthModal: React.FC<Props> = ({ open, onClose, onDismiss, intent = 'list' }) => {
  const [mode, setMode] = useState<Mode>('signin'); const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  if (!open) return null;
  const run = async (action: () => Promise<unknown>, success: string) => { setBusy(true); setMessage(''); try { await action(); setMessage(success); if (mode !== 'reset') onClose(); } catch (error) { setMessage(error instanceof Error ? error.message.replace('auth/', '') : 'No se ha podido completar la acción.'); } finally { setBusy(false); } };
  const entryTitle = intent === 'create' ? 'Entra para añadir un recurso' : 'Entra en tus recursos';
  return <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/40 p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="collaborator-auth-title"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Colabora con Bokatas</p><h2 id="collaborator-auth-title" className="text-2xl font-bold">{mode === 'signup' ? 'Crea tu cuenta' : mode === 'reset' ? 'Recupera tu acceso' : entryTitle}</h2></div><button className="icon-button" onClick={() => onDismiss?.()} aria-label="Cerrar">×</button></div>
    {mode !== 'reset' && <button className="button-google mt-5 w-full" disabled={busy} onClick={() => run(signInContributorGoogle, 'Acceso correcto.')}><span>G</span> Continuar con Google</button>}
    {mode !== 'reset' && <p className="my-4 text-center text-xs text-text-light">o con tu correo</p>}
    <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); if (mode === 'signup') run(() => signUpContributor(email, password, name), 'Te hemos enviado un email de verificación.'); else if (mode === 'reset') run(() => resetContributorPassword(email), 'Si la cuenta existe, recibirás instrucciones.'); else run(() => signInContributorEmail(email, password), 'Acceso correcto.'); }}>
      {mode === 'signup' && <label className="form-label">Tu nombre<input required value={name} onChange={(e) => setName(e.target.value)} className="form-control" /></label>}
      <label className="form-label">Correo electrónico<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" autoComplete="email" /></label>
      {mode !== 'reset' && <label className="form-label">Contraseña<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} /></label>}
      {message && <p className="text-sm text-primary-dark" role="status">{message}</p>}
      <button className="button-primary w-full" disabled={busy}>{busy ? 'Un momento…' : mode === 'signup' ? 'Crear cuenta' : mode === 'reset' ? 'Enviar instrucciones' : 'Entrar'}</button>
    </form>
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm"><button className="link-button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>{mode === 'signup' ? 'Ya tengo cuenta' : 'Crear cuenta'}</button>{mode !== 'reset' && <button className="link-button" onClick={() => setMode('reset')}>He olvidado la contraseña</button>}{mode === 'reset' && <button className="link-button" onClick={() => setMode('signin')}>Volver a entrar</button>}</div>
  </div></div>;
};
export default ContributorAuthModal;
