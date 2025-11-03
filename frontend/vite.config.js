import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vitest config for testing
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js"
  }
});
