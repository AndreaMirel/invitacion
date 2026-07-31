/**
 * El moño rojo que Andrea trae en las fotos, convertido en la marca de la
 * página: aparece sujetando las tarjetas y encabezando cada sección.
 */
export function Bow({ className = "", size = 28 }) {
  return (
    <svg
      viewBox="0 0 48 32"
      width={size}
      height={(size * 32) / 48}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22.6 16 6.9 5.2C4.6 3.6 1.6 5.4 1.9 8.2l1.7 15.4c.3 2.7 3.4 4 5.5 2.3L22.6 16Z"
        fill="currentColor"
      />
      <path
        d="M25.4 16 41.1 5.2c2.3-1.6 5.3.2 5 3l-1.7 15.4c-.3 2.7-3.4 4-5.5 2.3L25.4 16Z"
        fill="currentColor"
      />
      <path
        d="M24 21.6c2.5 0 4.6-2.5 4.6-5.6S26.5 10.4 24 10.4 19.4 12.9 19.4 16s2.1 5.6 4.6 5.6Z"
        fill="currentColor"
      />
      <path d="M20 20.4 15.6 31M28 20.4 32.4 31" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
