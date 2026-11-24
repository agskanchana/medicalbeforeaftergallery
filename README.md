# MBA Gallery — marketing site

Marketing, documentation and blog site for the **Medical Before After Gallery** WordPress plugin
(free) and its **Pro** add-on. Built with [Astro](https://astro.build), deployed free to GitHub
Pages at the apex domain `medicalbeforeaftergallery.com`.

## Develop

```powershell
# PowerShell (this machine intercepts TLS, so npm needs the system trust store)
$env:NODE_OPTIONS="--use-system-ca"; npm install
npm run dev          # local dev server at http://localhost:4321
npm run build        # production build to ./dist
npm run preview      # preview the production build
```

```bash
# bash / git-bash equivalent
NODE_OPTIONS=--use-system-ca npm install
```

> The `--use-system-ca` flag is only needed locally because this machine intercepts TLS.
> CI (GitHub Actions) is unaffected and uses a plain `npm install`.

## Project structure

```
public/            CNAME, favicon, robots.txt, OG image, logo, GSC verification, .nojekyll
  images/demos/    one screenshot per demo page (800×450 WebP)      ← scripts/capture-demo-shots.mjs
  images/features/ larger screenshots for home/features (1600×900)  ← scripts/capture-demo-shots.mjs
  video/           the feature video (MP4 + WebM), poster, captions   ← scripts/video/record.mjs
src/
  components/      Header, Footer, Seo (+ Organization JSON-LD), Analytics, FreemiusCheckout,
                   ContactForm, ComparisonTable, Pricing, Faq, Testimonials, CtaBanner, BlogCard,
                   DocsSidebar, FeatureShowcase, FeatureCards, DemoCard, VideoTour
  layouts/         BaseLayout, BlogPostLayout, DocsLayout
  data/            site, nav, features, showcase, comparison, pricing, faq, testimonials,
                   demos (+ demo-check.json), specialties, video.json   (edit copy here)
  content/
    blog/          Markdown blog posts  (add a .md file = a new post)
    docs/          Markdown docs        (frontmatter: group, groupOrder, order)
  pages/           index, features, pricing, faq, demo, contact, privacy, terms, 404,
                   for/[slug] (specialty pages), llms.txt.ts,
                   blog/ (index, [slug], tags), docs/ (index, [...slug]), rss.xml.ts
  utils/demos.ts   joins the demo list with the last check: only working demos are linked
  styles/global.css   design tokens + base styles
scripts/           capture-demo-shots.mjs, check-site.mjs, video/ (see below), gen-og.mjs,
                   gen-logo.mjs, migrate-blog.mjs, lib/static-server.mjs
```

## Editing content

- **Marketing copy / features / pricing / FAQ:** edit the files in `src/data/`.
- **Blog:** add a Markdown file to `src/content/blog/` with frontmatter
  (`title, description, date, tags, author, category, image`). It appears automatically with an
  index card, tag pages and RSS entry. Set `draft: true` to hide it in production.
- **Docs:** add a Markdown file to `src/content/docs/` with `title, description, group,
  groupOrder, order`. The sidebar, breadcrumbs and prev/next update automatically.

## Demos, screenshots and the video

The demo site (`demo.medicalbeforeaftergallery.com`) is a static export of a WordPress site. When it
is rebuilt:

1. Update `src/data/demos.ts` (one entry per demo page: path, title, description, group; `of` puts a page on
   another demo’s card as a variant). `/demo/` is the one landing page: the demo site’s own home redirects to it.
2. Check every page and capture the screenshots — one Chrome, nothing leaves the machine:

   ```bash
   NODE_PATH=<folder with playwright-core> node scripts/capture-demo-shots.mjs --demo=<export folder>
   ```

   It serves the export, opens each page, checks that the gallery or embed renders, that a case
   window opens and closes (or the embed's control responds), that there are no console errors or
   failed requests, and writes `src/data/demo-check.json`. **Pages that fail are left off the site**
   (the `/demo/` page, the feature sections and the specialty pages only link pages that passed).
   Screenshots go to `public/images/demos/` and `public/images/features/`.
   Only ever point it at the demo export — never at a development site.
3. The feature video (Pro features, drawn on a canvas, with a spoken voiceover). Scenes are in
   `scripts/video/scenes.json`, the spoken lines (also the captions) in `scripts/video/narration.json`.

   ```bash
   NODE_PATH=<folder with playwright-core> node scripts/video/capture.mjs --demo=<export folder>  # photographs
   NODE_OPTIONS=--use-system-ca node scripts/video/narrate.mjs   # voice, only for lines that changed
   NODE_PATH=<folder with playwright-core> node scripts/video/record.mjs                          # ~3 min, real time
   NODE_PATH=<folder with playwright-core> node scripts/video/check.mjs                           # sound, length, frames
   ```

   `narrate.mjs` uses Gemini text-to-speech (key in `GEMINI_API_KEY`, sent only in a request header) and keeps the
   clips in `scripts/video/voice/`, so a new recording makes no API call. The free tier allows 10 clips a day per
   model. Serve the repository root and open `/scripts/video/index.html` to watch it (`?t=12` shows one frame).

`/llms.txt` is generated from `src/data/` at build time.

## Configuration / before going live

Edit `src/data/site.ts`:

1. **`web3formsKey`** — replace with a real access key from [web3forms.com](https://web3forms.com)
   (free). Until then the contact form shows a "not configured" message instead of sending.
2. **Versions and WordPress.org figures** — `freeVersion`, `proVersion` and `wpOrg` (rating, number of
   reviews, active installations). Copy them from WordPress.org by hand; never round up.
3. **Testimonials** — `testimonials.ts` holds the WordPress.org reviews, quoted word for word with a
   link to each. Add new reviews the same way.
4. **Social profiles** — `site.social`: filled-in profiles appear in the footer and in the
   Organization structured data (`sameAs`).
5. Pro price lives in `src/data/site.ts` (`proPrice`). Freemius IDs and the GA id are already set.

## Deploy (GitHub Pages, apex domain)

1. Push this project to the repo that owns `medicalbeforeaftergallery.com`.
2. Repo **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Set the **custom domain** to `medicalbeforeaftergallery.com` (DNS apex A records →
   `185.199.108.153/.109/.110/.111`). `public/CNAME` keeps it bound on every deploy.
4. Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with Astro and deploys.

The live demo at `demo.medicalbeforeaftergallery.com` is a separate repo and is unaffected.
