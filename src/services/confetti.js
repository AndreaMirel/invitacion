import confetti from "canvas-confetti";

/** Confeti en la paleta de la invitación, no en el arcoíris por defecto. */
const COLORES = ["#C6203A", "#6E0F2A", "#E9B6C0", "#F7DDE2", "#FBF7F4"];

const sinMovimiento = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Al abrir el sobre: dos ráfagas desde los costados, como si saliera algo. */
export function confetiSobre() {
  if (sinMovimiento()) return;

  const base = { particleCount: 40, spread: 65, colors: COLORES, scalar: 0.9, ticks: 160 };
  confetti({ ...base, angle: 60, origin: { x: 0.1, y: 0.7 } });
  confetti({ ...base, angle: 120, origin: { x: 0.9, y: 0.7 } });
}

/** Al confirmar que sí viene: una lluvia corta desde arriba. */
export function confetiConfirmacion() {
  if (sinMovimiento()) return;

  confetti({
    particleCount: 90,
    spread: 100,
    startVelocity: 34,
    origin: { y: 0.35 },
    colors: COLORES,
    scalar: 0.95,
  });
}
