import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://raparisonbryan.fr",
  integrations: [react()],
  output: "server",
  adapter: vercel(),
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});