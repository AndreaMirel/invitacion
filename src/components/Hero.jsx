import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { invitation } from "../data/invitation";
import { fechaCorta, hora } from "../services/calendar";
import { Bow } from "./ui/Bow";
import { WashiTape } from "./ui/Polaroid";

const { hero, cumpleanera, edad } = invitation;
const fecha = new Date(invitation.fechaEvento);

/**
 * El photocard. En el mundo del que salen estas fotos — K-pop, álbumes,
 * intercambios — el photocard es la carta que todas quieren que les toque.
 * Aquí la que te tocó es Andrea, y es el elemento que sostiene la página.
 */
export function Hero() {
  const tarjetaRef = useRef(null);
  const sinMovimiento = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const suave = { stiffness: 140, damping: 18, mass: 0.4 };

  const rotarY = useSpring(useTransform(x, [-0.5, 0.5], [-11, 11]), suave);
  const rotarX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), suave);
  const brillo = useSpring(useTransform(x, [-0.5, 0.5], ["-42%", "42%"]), suave);

  const seguir = (evento) => {
    if (sinMovimiento) return;
    const caja = tarjetaRef.current.getBoundingClientRect();
    x.set((evento.clientX - caja.left) / caja.width - 0.5);
    y.set((evento.clientY - caja.top) / caja.height - 0.5);
  };

  const soltar = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="hero" className="relative scroll-mt-16 px-6 pb-12 pt-10 text-center">
      <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.32em] text-tinta/55">
        {hero.encabezado}
      </p>

      <div className="mt-2 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-rosa" />
        <h1 className="font-display text-[3.4rem] leading-[0.85] text-vino">{cumpleanera}</h1>
        <span className="h-px w-8 bg-rosa" />
      </div>

      <div className="mx-auto mt-9 w-fit" style={{ perspective: "900px" }}>
        <WashiTape className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />

        <motion.div
          ref={tarjetaRef}
          onPointerMove={seguir}
          onPointerLeave={soltar}
          style={{ rotateX: rotarX, rotateY: rotarY, transformStyle: "preserve-3d" }}
          className="relative w-[16.5rem] overflow-hidden rounded-[14px] border-[6px] border-white bg-tinta shadow-[0_22px_45px_-18px_rgba(26,20,22,0.8)]"
        >
          <div className="relative aspect-[55/85] overflow-hidden">
            <img
              src={hero.foto}
              alt={hero.fotoAlt}
              width={880}
              height={1360}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />

            {/* Degradado para que el nombre se lea sobre cualquier foto */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-tinta via-tinta/70 to-transparent" />

            {/* Holograma: se desplaza al inclinar la tarjeta */}
            {!sinMovimiento && (
              <motion.div
                aria-hidden="true"
                className="holo pointer-events-none absolute -inset-y-4 -inset-x-1/2 w-[200%] opacity-40"
                style={{ x: brillo }}
              />
            )}

            <div className="absolute inset-x-0 bottom-0 p-4">
              <Bow className="mx-auto mb-1 text-cereza" size={22} />
              <p className="font-display text-4xl leading-none text-crema">{hero.subtitulo}</p>
              <p className="mt-2 font-sans text-[0.58rem] font-medium uppercase tracking-[0.24em] text-crema/70">
                {fechaCorta(fecha)} · {hora(fecha)}
              </p>
            </div>

            {/* Número troquelado en la esquina, como el de un álbum */}
            <span className="absolute right-3 top-3 font-display text-3xl leading-none text-crema/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              {edad}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
