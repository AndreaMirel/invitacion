import { CalendarPlus, Download } from "lucide-react";
import { invitation } from "../data/invitation";
import { useCountdown } from "../hooks/useCountdown";
import { buildGoogleCalendarUrl, descargarIcs, fechaLarga, hora } from "../services/calendar";
import { Button } from "./ui/Button";
import { EventCalendar } from "./EventCalendar";
import { Section, SectionTitle } from "./ui/Section";

const { cuentaRegresiva, cumpleanera, edad, ubicacion } = invitation;
const fecha = new Date(invitation.fechaEvento);

const evento = {
  titulo: `Cumpleaños ${edad} de ${cumpleanera}`,
  inicio: fecha,
  duracionHoras: invitation.duracionHoras,
  detalles: `${fechaLarga(fecha)} a las ${hora(fecha)}. Código de vestimenta: ${invitation.dressCode.titulo}.`,
  lugar: [ubicacion.nombre, ubicacion.direccion].filter(Boolean).join(", "),
};

function Casilla({ valor, etiqueta }) {
  return (
    <div className="min-w-[3.6rem] rounded-lg border border-rosa/60 bg-white px-2 py-2.5 shadow-[0_6px_14px_-10px_rgba(26,20,22,0.5)]">
      <span className="block font-sans text-2xl font-bold tabular-nums leading-none text-vino">
        {String(valor).padStart(2, "0")}
      </span>
      <span className="mt-1 block font-sans text-[0.52rem] font-bold uppercase tracking-[0.14em] text-tinta/45">
        {etiqueta}
      </span>
    </div>
  );
}

export function Countdown() {
  const { dias, horas, minutos, segundos, terminado } = useCountdown(invitation.fechaEvento);

  return (
    <Section id="cuando" className="text-center">
      <SectionTitle>{terminado ? cuentaRegresiva.terminado : cuentaRegresiva.seccion}</SectionTitle>

      {/* Se anuncia solo el cambio de día: leer los segundos en voz alta sería
          ruido constante para quien usa lector de pantalla. */}
      <p className="sr-only" aria-live="polite">
        {terminado ? cuentaRegresiva.terminado : `Faltan ${dias} días`}
      </p>

      <div className="flex justify-center gap-2" aria-hidden="true">
        <Casilla valor={dias} etiqueta="Días" />
        <Casilla valor={horas} etiqueta="Horas" />
        <Casilla valor={minutos} etiqueta="Min" />
        <Casilla valor={segundos} etiqueta="Seg" />
      </div>

      <p className="mt-6 font-serif text-lg text-tinta/80">
        {fechaLarga(fecha)} · <span className="whitespace-nowrap">{hora(fecha)}</span>
      </p>

      <div className="mt-6">
        <EventCalendar fecha={fecha} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button
          as="a"
          variante="contorno"
          href={buildGoogleCalendarUrl(evento)}
          target="_blank"
          rel="noreferrer"
        >
          <CalendarPlus size={14} />
          Google Calendar
        </Button>
        <Button
          variante="contorno"
          onClick={() => descargarIcs(evento, `cumpleanos-${cumpleanera.toLowerCase()}.ics`)}
        >
          <Download size={14} />
          Descargar .ics
        </Button>
      </div>
    </Section>
  );
}
