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
        {/* Las capas van de atrás hacia adelante como en un sobre de verdad:
            forro, carta, bolsillo, solapa, sello. La carta arranca justo en la
            punta de la solapa para que ninguna la tape, y asoma por encima del
            bolsillo lo suficiente para leer el título y la fecha. */}
        <div className="relative mx-auto h-56 w-full">
          {/* Forro del sobre */}
          <div className="grano absolute inset-0 rounded-lg bg-vino shadow-[0_16px_34px_-14px_rgba(58,46,57,0.75)]" />

          {/* Carta: sale del bolsillo al abrir */}
          <motion.div
            className="absolute inset-x-4 top-[42%] z-10 flex h-[7.5rem] flex-col items-center rounded-sm bg-crema px-5 pt-3 text-center shadow-[0_6px_16px_-8px_rgba(58,46,57,0.5)]"
            animate={abierto ? { y: -96 } : { y: 0 }}
            transition={{ duration: 0.7, delay: abierto ? 0.35 : 0, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p className="font-serif text-lg leading-tight text-vino">{sobre.titulo}</p>
            <div className="my-2 h-px w-10 bg-rosa" />
            <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-tinta/65">
              {fechaLarga(fecha)}
            </p>
          </motion.div>

          {/* Bolsillo frontal: es lo que hace que la carta se vea metida dentro */}
          <div className="absolute inset-x-0 bottom-0 top-[72%] z-20 rounded-b-lg border-t border-crema/15 bg-vino shadow-[0_-8px_14px_-8px_rgba(58,46,57,0.65)]">
            <Bow className="mx-auto mt-3 block text-rosa" size={20} />
          </div>

          {/* Solapa */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[42%] origin-top rounded-t-lg bg-cereza"
            style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)", transformStyle: "preserve-3d" }}
            animate={abierto ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Sello de lacre */}
          <div className="absolute -bottom-3 right-7 z-40 flex h-12 w-12 rotate-12 items-center justify-center rounded-full border-2 border-crema bg-cereza font-display text-2xl text-crema shadow-lg">
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
