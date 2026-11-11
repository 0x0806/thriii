# THRIII Events

Marketing site for THRIII Events (event management and lighting design, Ajman, UAE). React 18, Vite, Tailwind.

## Develop

```bash
npm ci
npm run dev          # dev server (Express + Vite)
npm run check        # type check
npm run build:pages  # static build into dist/public
npm run preview:pages
```

## Deploy (GitHub Pages)

Every push to `main` runs `.github/workflows/pages.yml`: type check, `vite build`, publish `dist/public`.

- Repo setting: **Settings > Pages > Source = GitHub Actions**.
- The build uses a relative base (`base: "./"`), so it works at the custom domain (`client/public/CNAME`) and under `github.io/thriii/`.
- Reference files in `client/public` through `asset()` from `client/src/lib/site.ts`, never a leading `/`.
- Forms post to FormSubmit (`hello@thriiievents.com`); the address must be confirmed once with FormSubmit.
- Photographs are stand-ins (Unsplash, Wikimedia Commons). Replace them in `client/src/assets/photos` and update `client/src/lib/photos.ts` and the credits dialog in `footer.tsx`.
