import { invitation } from "../data/invitation";
import { Polaroid, WashiTape } from "./ui/Polaroid";
import { Section, SectionTitle } from "./ui/Section";

const { dressCode } = invitation;

export function DressCode() {
  return (
    <Section id="vestimenta" className="text-center">
      <SectionTitle>{dressCode.seccion}</SectionTitle>

      <h3 className="font-serif text-3xl font-medium leading-tight text-vino">
        {dressCode.titulo}
      </h3>

      <div className="relative mx-auto mt-7 w-fit">
        <WashiTape className="-top-3 left-1/2 h-5 w-20 -translate-x-1/2 rotate-2" />
        <Polaroid
          src={dressCode.foto}
          alt={dressCode.fotoAlt}
          rotacion={1.5}
          className="w-64 pb-3"
          imgClassName="aspect-[5/4]"
        />
      </div>

      {/* La paleta como muestrario: es más útil que describir los colores. */}
      <ul className="mt-6 flex justify-center gap-3.5">
        {dressCode.paleta.map(({ nombre, hex }) => (
          <li key={hex} className="flex flex-col items-center gap-1.5">
            <span
              className="block h-8 w-8 rounded-full border border-tinta/15 shadow-inner"
              style={{ backgroundColor: hex }}
            />
            <span className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.14em] text-tinta/50">
              {nombre}
            </span>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-6 max-w-[19rem] font-serif text-lg italic leading-relaxed text-tinta/80">
        {dressCode.descripcion}
      </p>
    </Section>
  );
}
