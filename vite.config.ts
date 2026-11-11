import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const SITE_URL = "https://thriiievents.com";

/** Writes sitemap.xml at build time so lastmod is always the build date. */
function sitemap(): PluginOption {
  return {
    name: "thriii-sitemap",
    apply: "build",
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      });
    },
  };
}

// Relative base: the build works at a custom domain root and under a
// github.io/<repo>/ subpath without any change.
export default defineConfig(async ({ command }) => {
  const dev = command === "serve";
  const plugins: PluginOption[] = [react(), sitemap()];

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
