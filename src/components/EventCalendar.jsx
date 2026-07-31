import { buildMonthGrid, DIAS } from "../services/calendar";
import { Bow } from "./ui/Bow";

/** Hoja de calendario con el día del evento marcado. */
export function EventCalendar({ fecha }) {
  const { semanas, diaEvento, etiqueta } = buildMonthGrid(fecha);

  return (
    <div className="grano relative mx-auto w-full max-w-[17rem] rounded-lg bg-white p-4 shadow-[0_10px_26px_-14px_rgba(26,20,22,0.5)]">
      <p className="mb-3 text-center font-sans text-[0.62rem] font-bold uppercase tracking-[0.26em] text-vino">
        {etiqueta}
      </p>

      <table className="w-full border-collapse">
        <caption className="sr-only">Calendario del mes del evento</caption>
        <thead>
          <tr>
            {DIAS.map((dia, i) => (
              <th
                key={i}
                scope="col"
                className="pb-1.5 font-sans text-[0.58rem] font-bold uppercase text-tinta/40"
              >
                <abbr title={["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][i]}>
                  {dia}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {semanas.map((semana, s) => (
            <tr key={s}>
              {semana.map((dia, d) => (
                <td key={d} className="p-0.5 text-center align-middle">
                  {dia === null ? (
                    <span className="block h-7" />
                  ) : dia === diaEvento ? (
                    <span className="relative mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-cereza font-sans text-[0.7rem] font-bold text-crema">
                      {dia}
                      <Bow className="absolute -right-1.5 -top-2 text-vino" size={13} />
                      <span className="sr-only">— día del cumpleaños</span>
                    </span>
                  ) : (
                    <span className="block py-1 font-sans text-[0.7rem] text-tinta/60">{dia}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
