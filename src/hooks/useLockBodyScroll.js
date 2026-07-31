import { useEffect } from "react";

/** Impide que la página de atrás se desplace mientras hay un modal abierto. */
export function useLockBodyScroll(activo) {
  useEffect(() => {
    if (!activo) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [activo]);
}
