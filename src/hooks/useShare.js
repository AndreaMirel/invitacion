import { useCallback, useState } from "react";

/**
 * Compartir el enlace. En móvil abre la hoja nativa del sistema; en escritorio
 * copia la URL al portapapeles y avisa.
 */
export function useShare({ titulo, texto }) {
  const [aviso, setAviso] = useState(null);

  const compartir = useCallback(async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: texto, url });
        return;
      } catch {
        // La invitada canceló la hoja de compartir: no hay nada que reportar.
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setAviso("copiado");
    } catch {
      setAviso("error");
    }
    setTimeout(() => setAviso(null), 2600);
  }, [titulo, texto]);

  return { compartir, aviso };
}
