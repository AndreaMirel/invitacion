import { MapPin, Navigation } from "lucide-react";
import { invitation } from "../data/invitation";
import { WashiTape } from "./ui/Polaroid";
import { Button } from "./ui/Button";
import { Polaroid } from "./ui/Polaroid";
import { Section, SectionTitle } from "./ui/Section";

const { ubicacion } = invitation;

/**
 * Se muestra sola en cuanto `ubicacion.direccion` tenga texto en
 * src/data/invitation.js. Mientras esté vacía, la sección no existe.
 */
export function Location() {
  if (!ubicacion.direccion) return null;

  return (
    <Section id="donde" className="text-center">
      <SectionTitle>{ubicacion.seccion}</SectionTitle>

      <div className="relative mx-auto mt-7 w-fit">
        <WashiTape className="-top-3 left-1/2 h-5 w-20 -translate-x-1/2 rotate-2" />
        <Polaroid
          src={ubicacion.foto}
          alt={ubicacion.fotoAlt}
          rotacion={1.5}
          className="w-64 pb-3"
          imgClassName="aspect-[5/4]"
        />
      </div>

      <MapPin className="mx-auto mt-6 text-cereza" size={22} strokeWidth={1.6} />

      {ubicacion.nombre && (
        <h3 className="mt-2 font-serif text-2xl font-medium text-vino">{ubicacion.nombre}</h3>
      )}

      <p className="mx-auto mt-2 max-w-[19rem] font-serif text-lg leading-relaxed text-tinta/80">
        {ubicacion.direccion}
      </p>

      {ubicacion.referencia && (
        <p className="mt-2 font-hand text-lg text-tinta/55">{ubicacion.referencia}</p>
      )}

      {ubicacion.mapsUrl && (
        <Button
          as="a"
          variante="contorno"
          href={ubicacion.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6"
        >
          <Navigation size={14} />
          Cómo llegar
        </Button>
      )}
    </Section>
  );
}
