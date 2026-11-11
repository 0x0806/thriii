import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Relative base: the build works at a custom domain root and under a
// github.io/<repo>/ subpath without any change.
export default defineConfig(async ({ command }) => {
  const dev = command === "serve";
  const plugins: PluginOption[] = [react()];

  if (dev) {
    const overlay = await import("@replit/vite-plugin-runtime-error-modal");
    plugins.push(overlay.default());
    if (process.env.REPL_ID !== undefined) {
      const { cartographer } = await import("@replit/vite-plugin-cartographer");
      const { devBanner } = await import("@replit/vite-plugin-dev-banner");
      plugins.push(cartographer(), devBanner());
    }
  }

  return {
    base: "./",
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      assetsInlineLimit: 0,
    },
    server: {
      fs: { strict: true, deny: ["**/.*"] },
    },
  };
});
