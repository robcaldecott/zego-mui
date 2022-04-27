/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./components"),
      "@/mocks": path.resolve(__dirname, "./mocks"),
      "@/queries": path.resolve(__dirname, "./queries"),
      "@/utils": path.resolve(__dirname, "./utils"),
      "@/providers": path.resolve(__dirname, "./providers"),
      "@/types": path.resolve(__dirname, "./types"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["setupTests.ts"],
  },
});
