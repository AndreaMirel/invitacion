import { useState } from "react";
import { X } from "lucide-react";
import { invitation } from "../data/invitation";
import { buildRsvpMessage, buildWhatsappUrl } from "../services/whatsapp";
import { confetiConfirmacion } from "../services/confetti";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

const { modal } = invitation.rsvp;

const campo =
  "w-full rounded-lg border border-rosa/70 bg-crema px-3 py-2.5 font-sans text-sm text-tinta outline-none transition-colors placeholder:text-tinta/35 focus:border-cereza";

export function RsvpModal({ abierto, onCerrar }) {
  const [nombre, setNombre] = useState("");
  const [respuesta, setRespuesta] = useState(modal.opciones[0].valor);
  const [nota, setNota] = useState("");
  const [errorNombre, setErrorNombre] = useState(null);

  /* La invitación es personal: no se preguntan acompañantes. Solo se usa para
     decidir si cae el confeti. */
  const asiste = respuesta === modal.opciones[0].valor;

  const enviar = (evento) => {
    evento.preventDefault();

    if (!nombre.trim()) {
      setErrorNombre("Escribe tu nombre para que sepa quién confirma.");
      return;
    }
    setErrorNombre(null);

    const elegida = modal.opciones.find((o) => o.valor === respuesta);
    const mensaje = buildRsvpMessage({ nombre, respuesta: elegida.mensaje, nota });

    if (asiste) confetiConfirmacion();
    window.open(buildWhatsappUrl(invitation.whatsapp, mensaje), "_blank", "noopener");
    onCerrar();
  };

  return (
    <Modal
      abierto={abierto}
      onCerrar={onCerrar}
      etiqueta={modal.titulo}
      panelClassName="max-w-sm rounded-2xl border-2 border-rosa bg-crema p-6 shadow-2xl"
    >
      <div className="relative">
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute -top-2 -right-2 cursor-pointer p-1 text-tinta/40 transition-colors hover:text-vino"
        >
          <X size={18} />
        </button>

        <h3 className="font-serif text-2xl font-medium text-vino">{modal.titulo}</h3>
        <p className="mt-1 font-sans text-[0.68rem] uppercase tracking-[0.16em] text-tinta/45">
          {modal.subtitulo}
        </p>

        <form onSubmit={enviar} className="mt-5 space-y-4 text-left">
          <div>
            <label htmlFor="rsvp-nombre" className="mb-1.5 block font-sans text-xs font-bold text-tinta/75">
              Tu nombre
            </label>
            <input
              id="rsvp-nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Como te digo yo"
              autoComplete="name"
              aria-invalid={Boolean(errorNombre)}
              aria-describedby={errorNombre ? "rsvp-nombre-error" : undefined}
              className={campo}
            />
            {errorNombre && (
              <p id="rsvp-nombre-error" role="alert" className="mt-1.5 font-sans text-xs text-cereza">
                {errorNombre}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="mb-1.5 font-sans text-xs font-bold text-tinta/75">¿Vienes?</legend>
            <div className="grid grid-cols-2 gap-2">
              {modal.opciones.map((opcion) => (
                <label
                  key={opcion.valor}
                  className={`cursor-pointer rounded-lg border-2 px-3 py-2.5 text-center font-sans text-xs font-bold transition-colors ${
                    respuesta === opcion.valor
                      ? "border-cereza bg-cereza text-crema"
                      : "border-rosa/70 bg-crema text-tinta/70 hover:border-rosa"
                  }`}
                >
                  <input
                    type="radio"
                    name="respuesta"
                    value={opcion.valor}
                    checked={respuesta === opcion.valor}
                    onChange={(e) => setRespuesta(e.target.value)}
                    className="sr-only"
                  />
                  {opcion.etiqueta}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="rsvp-nota" className="mb-1.5 block font-sans text-xs font-bold text-tinta/75">
              Algo que quieras decirme <span className="font-medium text-tinta/40">(opcional)</span>
            </label>
            <input
              id="rsvp-nota"
              type="text"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Alergias, sorpresas, lo que sea"
              className={campo}
            />
          </div>

          <Button type="submit" tamano="lg" className="w-full">
            {modal.enviar}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
