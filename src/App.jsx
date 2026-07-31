import { TopBar } from "./components/TopBar";
import { Envelope } from "./components/Envelope";
import { Hero } from "./components/Hero";
import { SongPlayer } from "./components/SongPlayer";
import { Countdown } from "./components/Countdown";
import { DressCode } from "./components/DressCode";
import { Gallery } from "./components/Gallery";
import { Location } from "./components/Location";
import { RsvpSection } from "./components/RsvpSection";
import { Farewell } from "./components/Farewell";

/**
 * Una sola vista, leída de arriba abajo como se lee un álbum:
 * te entregan el sobre, sale la tarjeta, suena la canción, aparece la fecha,
 * te dicen cómo ir vestida, ves las fotos y confirmas.
 */
export default function App() {
  return (
    <div className="flex min-h-dvh justify-center bg-tinta">
      <main className="papel grano relative w-full max-w-md shadow-[0_0_60px_rgba(0,0,0,0.55)]">
        <TopBar />
        <Envelope />
        <Hero />
        <SongPlayer />
        <Countdown />
        <DressCode />
        <Gallery />
        <Location />
        <RsvpSection />
        <Farewell />
      </main>
    </div>
  );
}
