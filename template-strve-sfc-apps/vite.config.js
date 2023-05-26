import path from "path";
import { defineConfig } from "vite";
import { strve } from "vite-plugin-strve";

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  // options
  server: {
    strictPort: true,
    port: 3002,
  },
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  plugins: [strve()],
});
