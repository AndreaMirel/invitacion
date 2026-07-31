/**
 * ÚNICO archivo que hay que tocar para cambiar el contenido de la invitación.
 * Textos, fechas, fotos y teléfono viven aquí. Ningún componente inventa copy.
 *
 * Para cambiar algo: edita este archivo, haz commit y push.
 * GitHub Actions reconstruye y publica solo.
 */

/** Resuelve una ruta de public/ respetando la subruta del repo en GitHub Pages. */
export const asset = (ruta) => `${import.meta.env.BASE_URL}${ruta}`;

export const invitation = {
  cumpleanera: "Andrea",
  edad: 21,

  /* La fecha DEBE llevar el offset de zona horaria (-06:00 = centro de México).
     Sin él, cada teléfono la interpretaría en su propia zona y la cuenta
     regresiva marcaría algo distinto para cada invitada. */
  fechaEvento: "2026-08-15T19:00:00-06:00",
  duracionHoras: 5,
  limiteRsvp: "2026-08-10T23:59:00-06:00",

  /* Número que recibe las confirmaciones, con lada de país. */
  whatsapp: "522297813356",

  sobre: {
    eyebrow: "Fiesta de cumpleaños",
    intro: "Estás invitada a mi",
    titulo: "convivio de cumpleaños",
    sello: "21",
    pista: "Toca el sobre para abrirlo",
  },

  hero: {
    encabezado: "Estás invitada a",
    subtitulo: "Mis veintiuno",
    foto: asset("images/hero-noche.jpg"),
    fotoAlt: "Andrea de noche en la calle, abrazada con sus invitados de honor",
  },

  cancion: {
    seccion: "La canción de la noche",
    titulo: "good 4 u",
    artista: "Olivia Rodrigo × BTS",
    archivo: asset("audio/cancion.mp3"),
    nota: "Súbele. Va a sonar toda la noche.",
  },

  cuentaRegresiva: {
    seccion: "Faltan",
    terminado: "Hoy es el día",
  },

  dressCode: {
    seccion: "Código de vestimenta",
    titulo: "Olivia Rodrigo × K-Drama",
    descripcion:
      "Negro de pies a cabeza, un detalle rojo y la actitud de la protagonista. Entre el pop-punk y el último capítulo.",
    foto: asset("images/dress-code.jpg"),
    fotoAlt: "Referencia de vestuario: total black con luz cálida",
    paleta: [
      { nombre: "Negro", hex: "#1A1416" },
      { nombre: "Cereza", hex: "#C6203A" },
      { nombre: "Hueso", hex: "#F3E9E4" },
    ],
  },

  galeria: {
    seccion: "El álbum",
    nota: "Toca una foto para verla en grande",
    fotos: [
      {
        src: asset("images/olivia.jpg"),
        alt: "Andrea con Olivia Rodrigo en la calle de noche",
        pie: "la de la playera",
        rotacion: -2.5,
      },
      {
        src: asset("images/kdrama-grupo.jpg"),
        alt: "Andrea sonriendo entre dos amigos, frente a una cortina clara",
        pie: "backstage",
        rotacion: 2,
      },
    ],
  },

  /* Sección de ubicación: se muestra sola en cuanto `direccion` tenga texto.
     Déjala vacía si prefieres dar la dirección por WhatsApp. */
  ubicacion: {
    seccion: "Dónde",
    nombre: "",
    direccion: "",
    referencia: "",
    mapsUrl: "",
  },

  rsvp: {
    seccion: "Confirmación de asistencia",
    instruccion: "Confírmame antes del {fecha} para apartarte lugar.",
    boton: "Confirmar asistencia",
    modal: {
      titulo: "Confirmar asistencia",
      subtitulo: "Tu respuesta se envía por WhatsApp",
      opciones: [
        { valor: "si", etiqueta: "Sí, ahí estaré", mensaje: "Sí, ahí estaré 🎉" },
        { valor: "no", etiqueta: "No voy a poder", mensaje: "No voy a poder llegar 🥺" },
      ],
      enviar: "Enviar por WhatsApp",
    },
  },

  despedida: {
    mensaje:
      "Gracias por ser parte de mi historia. Hagamos que esta noche valga la pena contarla.",
    firma: "Te espero",
  },

  compartir: {
    titulo: "Los 21 de Andrea",
    texto: "Estás invitada al cumpleaños de Andrea",
    copiado: "Enlace copiado",
  },
};
