/**
 * Fechas y calendario. Todo se calcula en la zona del evento, no en la del
 * teléfono de quien mira: así el día marcado y la hora son los mismos para
 * una invitada en Veracruz y para una en Madrid.
 */

export const ZONA = "America/Mexico_City";

export const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/** Iniciales de los días, empezando en domingo. */
export const DIAS = ["D", "L", "M", "M", "J", "V", "S"];

/** Descompone una fecha en sus partes tal como se ven en la zona del evento. */
export function partesEnZona(fecha, zona = ZONA) {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: zona,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(fecha);

  const valor = (tipo) => Number(partes.find((p) => p.type === tipo).value);

  return {
    anio: valor("year"),
    mes: valor("month") - 1, // 0-11, como en Date
    dia: valor("day"),
    hora: valor("hour") % 24, // en-CA devuelve 24 a medianoche
    minuto: valor("minute"),
  };
}

/**
 * Rejilla del mes que contiene la fecha, en semanas de 7 celdas.
 * Las celdas vacías antes del día 1 y después del último son `null`.
 */
export function buildMonthGrid(fecha, zona = ZONA) {
  const { anio, mes, dia } = partesEnZona(fecha, zona);

  const primerDiaSemana = new Date(Date.UTC(anio, mes, 1)).getUTCDay();
  const totalDias = new Date(Date.UTC(anio, mes + 1, 0)).getUTCDate();

  const celdas = [
    ...Array(primerDiaSemana).fill(null),
    ...Array.from({ length: totalDias }, (_, i) => i + 1),
  ];
  while (celdas.length % 7 !== 0) celdas.push(null);

  const semanas = [];
  for (let i = 0; i < celdas.length; i += 7) semanas.push(celdas.slice(i, i + 7));

  return { anio, mes, diaEvento: dia, semanas, etiqueta: `${MESES[mes]} ${anio}` };
}

/** "sábado 15 de agosto" */
export function fechaLarga(fecha, zona = ZONA) {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: zona,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(fecha);
}

/** "15/08/2026" */
export function fechaCorta(fecha, zona = ZONA) {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: zona,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(fecha);
}

/** "7:00 p.m." */
export function hora(fecha, zona = ZONA) {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: zona,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(fecha);
}

/** Formato UTC compacto que piden Google Calendar y el estándar iCalendar. */
function marcaUtc(fecha) {
  return fecha.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function fin(inicio, duracionHoras) {
  return new Date(inicio.getTime() + duracionHoras * 60 * 60 * 1000);
}

export function buildGoogleCalendarUrl({ titulo, inicio, duracionHoras, detalles, lugar }) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: titulo,
    dates: `${marcaUtc(inicio)}/${marcaUtc(fin(inicio, duracionHoras))}`,
    details: detalles ?? "",
    location: lugar ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Archivo .ics para Apple Calendar, Outlook y todo lo demás. */
export function buildIcs({ titulo, inicio, duracionHoras, detalles, lugar }) {
  // Las líneas de iCalendar se separan con CRLF; es parte del formato.
  const escapar = (texto) => String(texto ?? "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//andrea-invitacion//ES",
    "BEGIN:VEVENT",
    `UID:${marcaUtc(inicio)}-andrea@invitacion`,
    `DTSTAMP:${marcaUtc(new Date())}`,
    `DTSTART:${marcaUtc(inicio)}`,
    `DTEND:${marcaUtc(fin(inicio, duracionHoras))}`,
    `SUMMARY:${escapar(titulo)}`,
    `DESCRIPTION:${escapar(detalles)}`,
    `LOCATION:${escapar(lugar)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Descarga el .ics sin salir de la página. */
export function descargarIcs(evento, nombreArchivo = "cumpleanos.ics") {
  const blob = new Blob([buildIcs(evento)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo;
  enlace.click();
  URL.revokeObjectURL(url);
}
