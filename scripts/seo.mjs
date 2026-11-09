// Post-build SEO/GEO step for the static GitHub Pages deploy.
// Writes per-route HTML (so /work/<id> and /contacts return 200 with their own
// title, description, canonical, Open Graph and JSON-LD), a noindex 404.html
// SPA fallback, sitemap.xml and llms.txt. Metadata comes from src/seo.ts.
import { build } from 'esbuild';
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const tmp = path.join(root, 'node_modules', '.seo-tmp');

mkdirSync(tmp, { recursive: true });
const entry = path.join(tmp, 'entry.ts');
writeFileSync(
  entry,
  `export * from ${JSON.stringify(path.join(root, 'src/seo.ts'))};\n` +
    `export { projects } from ${JSON.stringify(path.join(root, 'src/constants/projects.ts'))};\n`,
);
const outfile = path.join(tmp, 'seo.mjs');
await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'node', outfile, logLevel: 'silent' });
const { SITE, abs, homeSeo, contactsSeo, projectSeo, jsonLd, projects } = await import(pathToFileURL(outfile).href);
rmSync(tmp, { recursive: true, force: true });

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const lastmod = (() => {
  try {
    return execSync('git log -1 --format=%cs', { cwd: root }).toString().trim() || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
})();

const head = (page, project, { indexable = true } = {}) => {
  const url = abs(page.path);
  const ld = JSON.stringify(jsonLd(page, projects, project)).replace(/</g, '\\u003c');
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${indexable ? 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' : 'noindex,follow'}" />`,
    indexable ? `<link rel="canonical" href="${url}" />` : '',
    `<meta property="og:type" content="${page.ogType}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:image" content="${abs(page.image)}" />`,
    `<meta property="og:image:alt" content="${esc(page.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${abs(page.image)}" />`,
    `<script type="application/ld+json" id="ld-json">${ld}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
};

// Plain HTML shown before the app boots (and to crawlers that do not run JS).
// React replaces it on mount; it mirrors what the rendered page shows.
const nav = `<nav><a href="/">Work</a> · <a href="/contacts">Contacts</a></nav>`;
const body = {
  home: (page) =>
    `${nav}<h1>${esc(SITE.person)} — portrait photographer in Lisbon</h1><p>${esc(page.description)}</p><ul>` +
    projects
      .map((p) => `<li><a href="/work/${p.id}"><img src="${p.image}" alt="${esc(projectSeo(p).imageAlt)}" loading="lazy" width="320" />${esc(p.title)}</a> — ${esc(p.category)}, ${esc(p.year)}</li>`)
      .join('') +
    `</ul>`,
  contacts: (page) =>
    `${nav}<h1>${esc(SITE.person)}</h1><p>I'm a photographer based in Lisbon, originally from Saint Petersburg. I love working with light and making striking, expressive, vivid portraits that are anything but ordinary.</p>` +
    `<p>To book a shoot, just write to me by email or on Instagram: <a href="mailto:${SITE.email}">${SITE.email}</a> · <a href="${SITE.instagram}">@whirlfull</a></p>`,
  project: (page, p) =>
    `${nav}<h1>${esc(p.title)}</h1><p>${esc(page.description)}</p>` +
    p.gallery.map((src, i) => `<img src="${src}" alt="${esc(`${p.title}, figure ${String(i + 1).padStart(2, '0')} by ${SITE.person}`)}" loading="lazy" width="480" />`).join('') +
    `<p><a href="/">← All work</a></p>`,
};

const template = readFileSync(path.join(dist, 'index.html'), 'utf8');
const render = (page, project, html, opts) => {
  const out = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head(page, project, opts))
    .replace('<div id="root"></div>', `<div id="root"><div class="prerender">${html}</div></div>`);
  if (out === template) throw new Error('seo markers not found in dist/index.html');
  return out;
};
const write = (rel, content) => {
  const file = path.join(dist, rel);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const home = homeSeo(projects);
const contacts = contactsSeo();
write('index.html', render(home, undefined, body.home(home)));
write('contacts.html', render(contacts, undefined, body.contacts(contacts)));
for (const p of projects) {
  const page = projectSeo(p);
  // GitHub Pages serves /work/<id> from work/<id>.html with a 200 status.
  write(`work/${p.id}.html`, render(page, p, body.project(page, p)));
}
// SPA fallback for unknown URLs: keeps the app working but stays out of the index.
write('404.html', render({ ...home, title: `Page not found — ${SITE.name}` }, undefined, nav, { indexable: false }));

const urls = [
  { loc: abs('/'), priority: '1.0' },
  { loc: abs('/contacts'), priority: '0.6' },
  ...projects.map((p) => ({ loc: abs(`/work/${p.id}`), priority: '0.8', images: [p.hero, ...p.gallery] })),
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n` +
          [...new Set(u.images ?? [])].map((src) => `    <image:image><image:loc>${abs(src)}</image:loc></image:image>\n`).join('') +
          `  </url>`,
      )
      .join('\n') +
    `\n</urlset>\n`,
);

write(
  'llms.txt',
  `# ${SITE.name}\n\n` +
    `> Portfolio of ${SITE.person}, a portrait photographer based in Lisbon, Portugal, originally from Saint Petersburg.\n\n` +
    `Website: ${SITE.url}/\nContact: ${SITE.email}\nInstagram: ${SITE.instagram}\n\n` +
    `## What It Is\n\n` +
    `- Expressive, vivid portrait photography with a focus on working with light.\n` +
    `- Moody portraits made in darkness or through smoke, as well as light, unposed film photographs.\n` +
    `- Portrait sessions, film sessions and collaborations, booked by email or Instagram.\n\n` +
    `## Good Fit\n\n` +
    `People in or visiting Lisbon who want a striking, personal portrait session rather than standard headshots.\n\n` +
    `## Key Pages\n\n` +
    `- Work (all series): ${SITE.url}/\n` +
    `- Contacts and bookings: ${SITE.url}/contacts\n` +
    projects.map((p) => `- ${p.title} (${p.category.toLowerCase()} series, ${p.year}, ${p.gallery.length} photos): ${abs(`/work/${p.id}`)}`).join('\n') +
    `\n\n## How to Contact\n\nEmail ${SITE.email} or send a message on Instagram (@whirlfull).\n`,
);

console.log(`seo: ${projects.length} project pages, sitemap with ${urls.length} URLs, llms.txt, 404.html`);
