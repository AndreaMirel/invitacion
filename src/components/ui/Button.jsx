const VARIANTES = {
  /* Acción principal: una sola por pantalla. */
  solida:
    "bg-cereza text-crema shadow-[0_8px_20px_-8px_rgba(198,32,58,0.7)] hover:bg-vino active:scale-[0.98]",
  /* Acciones secundarias: papel recortado sobre papel. */
  contorno:
    "bg-crema text-vino border-2 border-dashed border-cereza/50 hover:border-cereza hover:bg-blush active:scale-[0.98]",
  /* Terciarias: solo texto. */
  texto: "text-vino underline decoration-rosa decoration-2 underline-offset-4 hover:decoration-cereza",
};

const TAMANOS = {
  md: "px-5 py-2.5 text-xs",
  lg: "px-7 py-3.5 text-sm",
};

export function Button({
  as: Componente = "button",
  variante = "solida",
  tamano = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <Componente
      className={`inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-45 ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`}
      {...props}
    >
      {children}
    </Componente>
  );
}
