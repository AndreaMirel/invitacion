import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Nombre del repositorio en GitHub. La página se sirve en
// https://<usuario>.github.io/<REPO>/ , así que Vite necesita esa subruta.
// Si más adelante conectas un dominio propio: pon REPO = "" y añade public/CNAME.
const REPO = "andrea-invitacion";

export default defineConfig({
  base: process.env.VITE_BASE ?? (REPO ? `/${REPO}/` : "/"),
  plugins: [react(), tailwindcss()],
});
