import React, { useEffect, useRef } from 'react';

type SessionKind = 'public' | 'contributor' | 'volunteer';

interface MobileNavigationMenuProps {
  open: boolean;
  sessionKind: SessionKind;
  onClose: () => void;
  onAccount: () => void;
  onAddResource: () => void;
  onVolunteerAccess: () => void;
  onVolunteerSignup: () => void;
}

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MobileNavigationMenu: React.FC<MobileNavigationMenuProps> = ({
  open,
  sessionKind,
  onClose,
  onAccount,
  onAddResource,
  onVolunteerAccess,
  onVolunteerSignup,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll(focusableSelector)) as HTMLElement[];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const navigate = (callback: () => void) => {
    onClose();
    callback();
  };

  const isVolunteer = sessionKind === 'volunteer';
  const accountTitle = sessionKind === 'contributor' ? 'Mis recursos' : 'Mi cuenta';

  return (
    <div
      ref={dialogRef}
      className="mobile-menu safe-top safe-bottom"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
    >
      <div className="mobile-menu__bar">
        <span className="text-xl font-extrabold tracking-tight">Bokatas</span>
        <button ref={closeRef} type="button" className="icon-button mobile-menu__close" onClick={onClose} aria-label="Cerrar menú">
          <span className="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </div>

      <nav className="mobile-menu__content" aria-label="Navegación principal">
        {!isVolunteer && (
          <section aria-labelledby="menu-contribute-title">
            <p id="menu-contribute-title" className="mobile-menu__label">Colabora con información</p>
            <button type="button" className="mobile-menu__item" onClick={() => navigate(onAccount)}>
              <span>{accountTitle}</span>
              <small>{sessionKind === 'contributor' ? 'Consulta y gestiona tus recursos' : 'Gestiona tus recursos'}</small>
            </button>
            <button type="button" className="mobile-menu__item" onClick={() => navigate(onAddResource)}>
              <span>Añadir un recurso</span>
              <small>Comparte un recurso para que podamos revisarlo</small>
            </button>
          </section>
        )}

        <section className="mobile-menu__group" aria-labelledby="menu-bokatas-title">
          <p id="menu-bokatas-title" className="mobile-menu__label">Bokatas</p>
          <button type="button" className="mobile-menu__item" onClick={() => navigate(onVolunteerAccess)}>
            <span>{isVolunteer ? 'Área de voluntariado' : 'Acceso voluntarios'}</span>
            <small>{isVolunteer ? 'Vuelve a tu área interna' : 'Para personas que ya forman parte de Bokatas'}</small>
          </button>
          <button type="button" className="mobile-menu__item" onClick={() => navigate(onVolunteerSignup)}>
            <span>Hazte voluntario</span>
            <small>Conoce cómo acompañar con Bokatas</small>
          </button>
        </section>
      </nav>
    </div>
  );
};

export default MobileNavigationMenu;
