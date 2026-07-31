import { useState } from "react";
import { invitation } from "../data/invitation";
import { fechaCorta } from "../services/calendar";
import { Button } from "./ui/Button";
import { RsvpModal } from "./RsvpModal";
import { Section, SectionTitle } from "./ui/Section";

const { rsvp } = invitation;
const limite = fechaCorta(new Date(invitation.limiteRsvp));

export function RsvpSection() {
  const [abierto, setAbierto] = useState(false);

  return (
    <Section id="confirmar" className="text-center">
      <SectionTitle>{rsvp.seccion}</SectionTitle>

      <p className="mx-auto max-w-[19rem] font-serif text-lg leading-relaxed text-tinta/85">
        {rsvp.instruccion.replace("{fecha}", limite)}
      </p>

      <Button tamano="lg" className="mt-6" onClick={() => setAbierto(true)}>
        {rsvp.boton}
      </Button>

      <RsvpModal abierto={abierto} onCerrar={() => setAbierto(false)} />
    </Section>
  );
}
