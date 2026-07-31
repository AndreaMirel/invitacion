import { useState } from "react";
import { X } from "lucide-react";
import { invitation } from "../data/invitation";
import { Modal } from "./ui/Modal";
import { Polaroid } from "./ui/Polaroid";
import { Section, SectionTitle } from "./ui/Section";

const { galeria } = invitation;

export function Gallery() {
  const [activa, setActiva] = useState(null);
  const foto = activa === null ? null : galeria.fotos[activa];

  return (
    <Section id="album">
      <SectionTitle>{galeria.seccion}</SectionTitle>

      <ul className="grid grid-cols-2 gap-4">
        {galeria.fotos.map((f, i) => (
          <li key={f.src}>
            <button
              type="button"
              onClick={() => setActiva(i)}
              className="block w-full cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              aria-label={`Ver en grande: ${f.alt}`}
            >
              <Polaroid
                src={f.src}
                alt={f.alt}
                pie={f.pie}
                rotacion={f.rotacion}
                imgClassName="aspect-square"
              />
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-center font-hand text-lg text-tinta/50">{galeria.nota}</p>

      <Modal
        abierto={foto !== null}
        onCerrar={() => setActiva(null)}
        etiqueta="Foto ampliada"
        fondo="bg-tinta/90"
        panelClassName="max-w-sm"
      >
        {foto && (
          <figure className="relative">
            <button
              type="button"
              onClick={() => setActiva(null)}
              aria-label="Cerrar la foto"
              className="absolute -top-3 -right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-crema text-vino shadow-lg"
            >
              <X size={18} />
            </button>
            <img
              src={foto.src}
              alt={foto.alt}
              className="w-full rounded-lg border-4 border-crema object-contain"
            />
            <figcaption className="mt-3 text-center font-hand text-xl text-crema">
              {foto.pie}
            </figcaption>
          </figure>
        )}
      </Modal>
    </Section>
  );
}
