import { Pause, Play } from "lucide-react";
import { invitation } from "../data/invitation";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { Section, SectionTitle } from "./ui/Section";

const { cancion } = invitation;

export function SongPlayer() {
  const { sonando, error, alternar } = useAudioPlayer(cancion.archivo);

  return (
    <Section id="cancion" className="text-center">
      <SectionTitle>{cancion.seccion}</SectionTitle>

      <button
        type="button"
        onClick={alternar}
        aria-pressed={sonando}
        aria-label={sonando ? "Pausar la canción" : "Reproducir la canción"}
        className="group mx-auto flex cursor-pointer flex-col items-center gap-4"
      >
        <span className="relative block">
          {/* El disco solo gira mientras suena: el movimiento es el estado. */}
          <span
            className={`flex h-32 w-32 items-center justify-center rounded-full bg-tinta shadow-[0_14px_30px_-12px_rgba(26,20,22,0.85)] transition-transform duration-300 group-hover:scale-[1.04] ${
              sonando ? "animate-girar" : ""
            }`}
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at center, rgba(251,247,244,0.07) 0 1px, transparent 1px 4px)",
            }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-crema bg-cereza">
              <span className="h-2 w-2 rounded-full bg-tinta" />
            </span>
          </span>

          <span className="pointer-events-none absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-crema bg-vino text-crema shadow-md">
            {sonando ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </span>
        </span>

        <span className="block">
          <span className="block font-serif text-2xl font-medium leading-tight text-vino">
            {cancion.titulo}
          </span>
          <span className="mt-0.5 block font-sans text-[0.62rem] font-bold uppercase tracking-[0.22em] text-tinta/55">
            {cancion.artista}
          </span>
        </span>
      </button>

      <p className="mt-5 font-hand text-xl text-cereza" role={error ? "alert" : undefined}>
        {error ?? cancion.nota}
      </p>
    </Section>
  );
}
