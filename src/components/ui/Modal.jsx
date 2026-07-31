import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

const FOCUSABLES =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Base de los dos diálogos de la página (confirmación y foto ampliada).
 * Atrapa el foco, cierra con Escape y lo devuelve al botón que lo abrió.
 */
export function Modal({ abierto, onCerrar, etiqueta, children, panelClassName = "", fondo = "bg-tinta/70" }) {
  const panelRef = useRef(null);
  const origenRef = useRef(null);

  useLockBodyScroll(abierto);

  useEffect(() => {
    if (!abierto) return;

    origenRef.current = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector(FOCUSABLES)?.focus() ?? panel?.focus();

    const alPulsar = (evento) => {
      if (evento.key === "Escape") {
        evento.preventDefault();
        onCerrar();
        return;
      }
      if (evento.key !== "Tab" || !panel) return;

      const enfocables = [...panel.querySelectorAll(FOCUSABLES)];
      if (enfocables.length === 0) return;

      const primero = enfocables[0];
      const ultimo = enfocables.at(-1);

      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener("keydown", alPulsar);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      origenRef.current?.focus?.();
    };
  }, [abierto, onCerrar]);

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${fondo}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={etiqueta}
            tabIndex={-1}
            className={`max-h-[90dvh] w-full overflow-y-auto outline-none ${panelClassName}`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
