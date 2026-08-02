/**
 * Confirmaciones por WhatsApp. No hay servidor: la invitada llega a su propio
 * chat con el mensaje ya escrito y solo tiene que darle enviar.
 */

const LADA_MEXICO = "52";

/** Deja solo dígitos y antepone la lada 52 si el número viene a 10 dígitos. */
export function normalizarTelefono(telefono) {
  const digitos = String(telefono ?? "").replace(/\D/g, "");
  return digitos.length === 10 ? LADA_MEXICO + digitos : digitos;
}

/**
 * Arma el mensaje de confirmación. WhatsApp interpreta *texto* como negritas.
 */
export function buildRsvpMessage({ nombre, respuesta, nota = "" }) {
  const lineas = [`Hola, soy *${nombre.trim()}*.`, respuesta];

  if (nota.trim()) lineas.push(nota.trim());

  return lineas.join("\n");
}

export function buildWhatsappUrl(telefono, mensaje) {
  return `https://wa.me/${normalizarTelefono(telefono)}?text=${encodeURIComponent(mensaje)}`;
}
