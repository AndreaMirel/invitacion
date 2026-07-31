import { AnimatePresence, motion } from "motion/react";
import { Share2 } from "lucide-react";
import { invitation } from "../data/invitation";
import { useShare } from "../hooks/useShare";
import { Bow } from "./ui/Bow";

const { compartir: copy, cumpleanera, edad } = invitation;

export function TopBar() {
  const { compartir, aviso } = useShare({ titulo: copy.titulo, texto: copy.texto });

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-rosa/60 bg-crema/90 px-4 py-2.5 backdrop-blur-md">
        <span className="flex items-center gap-2">
          <Bow className="text-cereza" size={18} />
          <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-vino">
            {cumpleanera} · {edad}
          </span>
        </span>

        <button
          type="button"
          onClick={compartir}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-vino px-3.5 py-1.5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.12em] text-crema transition-colors hover:bg-cereza"
        >
          <Share2 size={13} />
          Compartir
        </button>
      </div>

      <AnimatePresence>
        {aviso && (
          <motion.p
            role="status"
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-tinta px-4 py-2 font-sans text-xs text-crema shadow-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            {aviso === "copiado" ? copy.copiado : "No se pudo copiar el enlace"}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
