/** Cinta washi que sujeta una foto o una tarjeta al papel. */
export function WashiTape({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`washi absolute z-20 h-6 w-24 rounded-[1px] ${className}`}
    />
  );
}

/**
 * Foto revelada y pegada al álbum. El marco blanco y el pie manuscrito son
 * parte de la foto, no adorno alrededor de ella.
 */
export function Polaroid({
  src,
  alt,
  pie,
  rotacion = -1.5,
  className = "",
  imgClassName = "",
  ...props
}) {
  return (
    <figure
      className={`grano relative bg-white p-2.5 pb-9 shadow-[0_12px_28px_-10px_rgba(26,20,22,0.45)] ${className}`}
      style={{ rotate: `${rotacion}deg` }}
      {...props}
    >
      <div className="relative overflow-hidden bg-hueso">
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imgClassName}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      {pie && (
        <figcaption className="absolute inset-x-0 bottom-1.5 text-center font-hand text-lg leading-none text-tinta/70">
          {pie}
        </figcaption>
      )}
    </figure>
  );
}
