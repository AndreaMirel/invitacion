import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { invitation } from "../data/invitation";
import { fechaLarga } from "../services/calendar";
import { confetiSobre } from "../services/confetti";
import { Bow } from "./ui/Bow";

const { sobre, edad } = invitation;
const fecha = new Date(invitation.fechaEvento);

/**
 * La entrega. Es lo primero que se ve y lo único que pide una acción antes de
 * leer nada: abrir el sobre es el permiso para que empiece la fiesta.
 */
export function Envelope() {
  const [abierto, setAbierto] = useState(false);
  const sinMovimiento = useReducedMotion();

  const abrir = () => {
    if (abierto) return;
    setAbierto(true);
    confetiSobre();

    const espera = sinMovimiento ? 0 : 900;
    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({
        behavior: sinMovimiento ? "auto" : "smooth",
        block: "start",
      });
    }, espera);
  };

  return (
    <section className="relative px-6 pb-14 pt-12 text-center">
      <p className="font-hand text-2xl text-vino">{sobre.intro}</p>
      <p className="mt-1 font-sans text-[0.62rem] font-bold uppercase tracking-[0.32em] text-tinta/55">
        {sobre.eyebrow}
      </p>

      <button
        type="button"
        onClick={abrir}
        aria-expanded={abierto}
        aria-label={abierto ? "Sobre abierto" : "Abrir el sobre de la invitación"}
        className="group mx-auto mt-9 block w-full max-w-[19rem] cursor-pointer rounded-xl"
        style={{ perspective: "1100px" }}
      >
        <div className="relative mx-auto h-48 w-full">
          {/* Cuerpo del sobre */}
          <div className="grano absolute inset-0 rounded-lg bg-vino shadow-[0_16px_34px_-14px_rgba(26,20,22,0.75)]" />

          {/* Carta: sube y se asoma al abrir */}
          <motion.div
            className="absolute inset-x-4 top-4 z-10 flex h-[10.5rem] flex-col items-center justify-center rounded-sm bg-crema px-5 text-center shadow-[0_6px_16px_-8px_rgba(26,20,22,0.5)]"
            animate={abierto ? { y: -74 } : { y: 0 }}
            transition={{ duration: 0.7, delay: abierto ? 0.35 : 0, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Bow className="mb-1.5 text-cereza" size={22} />
            <p className="font-serif text-lg leading-tight text-vino">{sobre.titulo}</p>
            <div className="my-2 h-px w-10 bg-rosa" />
            <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.18em] text-tinta/65">
              {fechaLarga(fecha)}
            </p>
          </motion.div>

          {/* Solapa */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-lg bg-cereza"
            style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)", transformStyle: "preserve-3d" }}
            animate={abierto ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Sello de lacre */}
          <div className="absolute -bottom-3 right-7 z-30 flex h-12 w-12 rotate-12 items-center justify-center rounded-full border-2 border-crema bg-cereza font-display text-2xl text-crema shadow-lg">
            {sobre.sello}
          </div>
        </div>
      </button>

      {!abierto && (
        <p className="mt-9 animate-flotar font-hand text-xl text-cereza">{sobre.pista}</p>
      )}
      {abierto && (
        <p className="mt-9 font-hand text-xl text-vino">
          Bienvenida a mis {edad}
        </p>
      )}
    </section>
  );
}
