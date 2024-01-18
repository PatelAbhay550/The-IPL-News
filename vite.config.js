import prerender from "prerender-node";
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    {
      // Add prerender middleware
      configureServer: ({ middlewares }) => {
        middlewares.use(prerender({ prerenderToken: "Y3vVUs1l2t1Avn6xZMLM" }));
      },
    },
  ],
});
