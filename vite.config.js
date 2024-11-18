import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ecommerce/", // Set base path to match your GitHub Pages URL
  plugins: [react()],
});
