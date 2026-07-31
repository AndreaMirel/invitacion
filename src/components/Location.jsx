import { MapPin, Navigation } from "lucide-react";
import { invitation } from "../data/invitation";
import { Button } from "./ui/Button";
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

      <MapPin className="mx-auto text-cereza" size={22} strokeWidth={1.6} />

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
