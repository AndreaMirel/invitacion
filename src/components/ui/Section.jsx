import { motion, useReducedMotion } from "motion/react";
import { Bow } from "./Bow";

/**
 * Una página del álbum. Entra al entrar en pantalla, una sola vez, y se queda
 * quieta: la animación acompaña la lectura, no la interrumpe.
 */
export function Section({ id, children, className = "", separador = true }) {
  const sinMovimiento = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`relative px-6 py-11 ${separador ? "perforacion" : ""} ${className}`}
      initial={sinMovimiento ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

/** Encabezado de sección: moño, versalitas y una regla fina. */
export function SectionTitle({ children, className = "" }) {
  return (
    <header className={`mb-7 flex flex-col items-center gap-2 ${className}`}>
      <Bow className="text-cereza" size={26} />
      <h2 className="text-center font-sans text-[0.68rem] font-bold uppercase tracking-[0.28em] text-vino">
        {children}
      </h2>
      <div className="h-px w-11 bg-rosa" />
    </header>
  );
}
