# Invitación · Los 21 de Andrea

Invitación digital de una sola vista, pensada para abrirse en el teléfono y
compartirse por WhatsApp. React + Vite + Tailwind, publicada en GitHub Pages.

## Cómo trabajar en ella

```bash
npm install
npm run dev      # http://localhost:5173/Andrea_invitacion/
npm run build    # genera dist/
npm run preview  # sirve dist/ como se verá publicada
```

La subruta `/Andrea_invitacion/` es obligatoria: sin ella verás una página en blanco.

## Cambiar el contenido

Todo el texto, las fechas, las fotos y el teléfono están en un solo archivo:

**`src/data/invitation.js`**

No hace falta tocar ningún componente para cambiar lo que dice la invitación.
Edita ese archivo, haz commit y push: GitHub Actions reconstruye y publica solo.

Detalles que importan:

- **`fechaEvento`** lleva el offset de zona horaria (`-06:00`). Sin él, la cuenta
  regresiva marcaría algo distinto en cada teléfono.
- **`ubicacion`** está vacía y por eso esa sección no aparece. En cuanto le pongas
  `direccion`, la sección se muestra sola.
- Las rutas de fotos usan `asset("images/...")`, que resuelve la subruta del
  repositorio. No pongas rutas absolutas tipo `/images/...`: se rompen al publicar.

## Cambiar las fotos o la canción

Deja los archivos en `public/images/` y `public/audio/` con nombres sin espacios
ni acentos, y apunta a ellos desde `src/data/invitation.js`.

Los originales sin procesar están en `assets/`.

Si cambias la foto principal, regenera la imagen de preview de WhatsApp:

```bash
npx sharp-cli --input public/images/hero-noche.jpg --output public/og-image.jpg \
  resize 1200 630 --fit cover --position attention
```

## Antes del primer deploy

El repositorio (`Andrea_invitacion`) y las URL absolutas del preview ya están
configurados. Falta una sola cosa, y hay que hacerla a mano en GitHub:

**Settings → Pages → Source: GitHub Actions**

Después, cada push a `main` publica en
`https://marcovargas0803.github.io/Andrea_invitacion/`.

### Si conectas un dominio propio

En `vite.config.js` pon `const REPO = "";`, crea `public/CNAME` con el dominio
dentro, y actualiza las dos URL de `index.html`.

## Estructura

```
src/
├─ components/     una sección por archivo; ui/ son las piezas reutilizables
├─ hooks/          cuenta regresiva, audio, compartir, bloqueo de scroll
├─ services/       lógica pura: fechas y calendario, WhatsApp, confeti
├─ data/           el contenido
└─ styles/         tokens de color y tipografía (Tailwind v4 @theme)
```

`legacy/index.html` es el prototipo original de una sola página. Se puede borrar
cuando ya no haga falta comparar.
