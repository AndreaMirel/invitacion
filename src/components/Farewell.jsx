import { invitation } from "../data/invitation";
import { Bow } from "./ui/Bow";

const { despedida, cumpleanera } = invitation;

/** El cierre es solo tipografía: después de tantas fotos, el silencio pesa más. */
export function Farewell() {
  return (
    <footer className="perforacion grano relative overflow-hidden bg-vino px-6 py-14 text-center">
      <Bow className="mx-auto text-rosa" size={30} />

      <p className="mx-auto mt-5 max-w-[19rem] font-serif text-lg italic leading-relaxed text-crema/80">
        {despedida.mensaje}
      </p>

      <p className="mt-7 font-hand text-2xl text-rosa">{despedida.firma}</p>
      <p className="font-display text-5xl leading-tight text-crema">{cumpleanera}</p>
    </footer>
  );
}
