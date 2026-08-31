import React, { FormEvent, useState } from 'react';
import { submitVolunteerApplication, type VolunteerApplication } from '../services/volunteerApplicationService';

const officialVolunteerFormUrl = 'https://bokatas.org/como-ayudar/hazte-voluntario/';
const privacyUrl = 'https://bokatas.org/politica-de-privacidad/';

const initialApplication: VolunteerApplication = {
  name: '',
  email: '',
  phone: '',
  venue: '',
  area: '',
  availability: '',
  message: '',
  acceptedPrivacy: false,
};

const VolunteerSignupPage: React.FC = () => {
  const [application, setApplication] = useState(initialApplication);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'not-configured'>('idle');

  const update = <K extends keyof VolunteerApplication>(key: K, value: VolunteerApplication[K]) => {
    setApplication((current) => ({ ...current, [key]: value }));
    setSubmissionState('idle');
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setIsSubmitting(true);
    const result = await submitVolunteerApplication(application);
    setIsSubmitting(false);
    if (result.status === 'not-configured') setSubmissionState('not-configured');
  };

  return (
    <article className="mx-auto w-full max-w-3xl">
      <section className="volunteer-signup-hero">
        <p className="eyebrow">Bokatas</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">Hazte voluntario</h2>
        <p className="mt-3 max-w-2xl text-lg text-text-light">Acompaña, escucha y comparte parte de tu tiempo con personas en situación de calle o exclusión social.</p>
      </section>

      <section className="panel mt-5" aria-labelledby="how-it-works-title">
        <h3 id="how-it-works-title" className="text-xl font-bold text-text-main">¿Cómo funciona?</h3>
        <ol className="volunteer-steps mt-4">
          <li><strong>1</strong><span>Déjanos tus datos.</span></li>
          <li><strong>2</strong><span>Elige la sede y la zona en la que te gustaría colaborar.</span></li>
          <li><strong>3</strong><span>Bokatas se pondrá en contacto contigo.</span></li>
        </ol>
      </section>

      <section className="panel mt-5" aria-labelledby="volunteer-form-title">
        <h3 id="volunteer-form-title" className="text-xl font-bold text-text-main">Cuéntanos cómo te gustaría colaborar</h3>
        <p className="mt-1 text-sm text-text-light">Los campos con * son obligatorios.</p>
        <form className="mt-5 space-y-4" onSubmit={submit} noValidate>
          <label className="form-label">Nombre y apellidos *
            <input className="form-control" value={application.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" required />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-label">Correo electrónico *
              <input className="form-control" type="email" value={application.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" required />
            </label>
            <label className="form-label">Teléfono *
              <input className="form-control" type="tel" value={application.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" required />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-label">Sede en la que te interesa colaborar *
              <input className="form-control" value={application.venue} onChange={(e) => update('venue', e.target.value)} required />
            </label>
            <label className="form-label">Zona que prefieres *
              <input className="form-control" value={application.area} onChange={(e) => update('area', e.target.value)} required />
            </label>
          </div>
          <label className="form-label">Disponibilidad
            <input className="form-control" value={application.availability} onChange={(e) => update('availability', e.target.value)} />
          </label>
          <label className="form-label">¿Quieres contarnos algo más?
            <textarea className="form-control min-h-28" value={application.message} onChange={(e) => update('message', e.target.value)} />
          </label>
          <label className="flex items-start gap-3 text-sm text-text-light">
            <input className="mt-1 h-4 w-4" type="checkbox" checked={application.acceptedPrivacy} onChange={(e) => update('acceptedPrivacy', e.target.checked)} required />
            <span>He leído la <a className="link-button" href={privacyUrl} target="_blank" rel="noreferrer">política de privacidad de Bokatas</a> y consiento el tratamiento de mis datos para atender esta solicitud.</span>
          </label>
          <button className="button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Comprobando solicitud…' : 'Enviar solicitud'}</button>
        </form>
        {submissionState === 'not-configured' && (
          <div className="volunteer-form-notice mt-4" role="status">
            <p><strong>Tu solicitud todavía no se ha enviado desde esta aplicación.</strong> El formulario oficial no expone una integración pública que podamos reutilizar de forma segura.</p>
            <a className="link-button mt-2 inline-block" href={officialVolunteerFormUrl} target="_blank" rel="noreferrer">Continuar en el formulario oficial de Bokatas</a>
          </div>
        )}
      </section>
    </article>
  );
};

export default VolunteerSignupPage;
