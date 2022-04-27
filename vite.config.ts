/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    // setupFiles: ["./src/setupMatchMedia.ts", "./src/setupTests.ts"],
    setupFiles: ["./src/setupTests.ts"],
    // coverage: {
    //   exclude: [
    //     "**/*.test.tsx",
    //     ".storybook",
    //     "**/*.stories.tsx",
    //     "src/setup*.ts",
    //   ],
    // },
  },
});
