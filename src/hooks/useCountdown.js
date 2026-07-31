import { useEffect, useState } from "react";

function restante(objetivo) {
  const diferencia = objetivo - Date.now();

  if (diferencia <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: true };
  }

  return {
    dias: Math.floor(diferencia / 86_400_000),
    horas: Math.floor((diferencia % 86_400_000) / 3_600_000),
    minutos: Math.floor((diferencia % 3_600_000) / 60_000),
    segundos: Math.floor((diferencia % 60_000) / 1000),
    terminado: false,
  };
}

/**
 * Cuenta regresiva hacia una fecha ISO. El intervalo se limpia al desmontar,
 * y el primer valor se calcula en el render inicial para que no se vea 00:00:00
 * durante el primer segundo.
 */
export function useCountdown(fechaIso) {
  const objetivo = new Date(fechaIso).getTime();
  const [tiempo, setTiempo] = useState(() => restante(objetivo));

  useEffect(() => {
    if (Number.isNaN(objetivo)) return;

    setTiempo(restante(objetivo));
    const intervalo = setInterval(() => setTiempo(restante(objetivo)), 1000);
    return () => clearInterval(intervalo);
  }, [objetivo]);

  return tiempo;
}
