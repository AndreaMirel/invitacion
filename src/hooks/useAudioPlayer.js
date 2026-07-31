import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reproductor de una sola pista. Nunca arranca solo: los navegadores móviles
 * bloquean el autoplay con sonido, y una invitación que grita al abrirse
 * termina silenciada.
 */
export function useAudioPlayer(src) {
  const audioRef = useRef(null);
  const [sonando, setSonando] = useState(false);
  const [error, setError] = useState(null);

  // Se crea una sola vez y se pausa al desmontar, para que no siga sonando.
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "none";
    audioRef.current = audio;

    const alTerminar = () => setSonando(false);
    audio.addEventListener("pause", alTerminar);

    return () => {
      audio.removeEventListener("pause", alTerminar);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const alternar = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setSonando(false);
      return;
    }

    try {
      await audio.play();
      setSonando(true);
      setError(null);
    } catch {
      setSonando(false);
      setError("No se pudo reproducir. Toca de nuevo.");
    }
  }, []);

  return { sonando, error, alternar };
}
