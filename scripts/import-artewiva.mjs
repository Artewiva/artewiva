#!/usr/bin/env node
/**
 * import-artewiva.mjs
 * ---------------------------------------------------------------------------
 * Importa gli articoli pubblicati su https://www.artewiva.it/ (WordPress)
 * usando la REST API pubblica del sito:
 *
 *    https://www.artewiva.it/wp-json/wp/v2/posts
 *    https://www.artewiva.it/wp-json/wp/v2/categories
 *    https://www.artewiva.it/wp-json/wp/v2/media
 *
 * Produce il dataset statico consumato dalla sezione "Articoli" del sito:
 *
 *    src/data/artewiva-news.json
 *
 * Uso:
 *    npm run import:news                       # ultimi 300 articoli
 *    npm run import:news -- --limit 1000       # archivio più ampio
 *    npm run import:news -- --since 2020-01-01 # solo da una certa data
 *    npm run import:news -- --merge            # aggiornamento incrementale
 *    npm run import:news -- --download-images  # specchia le copertine in public/
 *
 * Opzioni principali:
 *    --limit <n>          numero massimo di articoli (default 300)
 *    --since <YYYY-MM-DD> importa solo gli articoli pubblicati da questa data
 *    --page-size <n>      dimensione pagina API (default 100, max 100)
 *    --out <path>         file di output (default src/data/artewiva-news.json)
 *    --merge              unisce al dataset esistente invece di sovrascriverlo
 *    --download-images    scarica le copertine in --images-dir
 *    --images-dir <path>  cartella immagini locale (default public/artewiva)
 *    --images-base <url>  base pubblica per le immagini salvate (default /artewiva)
 *    --concurrency <n>    richieste parallele (default 6)
 *    --api <url>          base API alternativa (utile per test)
 *    --quiet              riduce il logging
 *
 * Requisiti: Node >= 18 (usa fetch globale). Il sito è pubblico: non servono
 * credenziali.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULTS = {
  api: "https://www.artewiva.it/wp-json/wp/v2",
  site: "https://www.artewiva.it/",
  out: "src/data/artewiva-news.json",
  imagesDir: "public/artewiva",
  imagesBase: "/artewiva",
  limit: 300,
  pageSize: 100,
  concurrency: 6,
  since: null,
  merge: false,
  downloadImages: false,
  quiet: false,
};

/* -------------------------------------------------------------------------- */
/* CLI                                                                        */
/* -------------------------------------------------------------------------- */

function parseArgs(argv) {
  const opts = { ...DEFAULTS };
  const numeric = new Set(["limit", "pageSize", "concurrency"]);
  for (let i = 0; i < argv.length; i += 1) {
    const raw = argv[i];
    if (!raw.startsWith("--")) continue;
    const [flag, inline] = raw.replace(/^--/, "").split("=");
    const key = flag.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (!(key in opts)) {
      if (flag === "help") {
        console.log(
          "Uso: node scripts/import-artewiva.mjs [--limit N] [--since YYYY-MM-DD] [--merge] [--download-images]"
        );
        process.exit(0);
      }
      console.warn(`! opzione ignorata: --${flag}`);
      continue;
    }
    if (typeof opts[key] === "boolean") {
      opts[key] = inline === undefined ? true : inline !== "false";
    } else {
      const value = inline ?? argv[(i += 1)];
      opts[key] = numeric.has(key) ? Number(value) : value;
    }
  }
  return opts;
}

/* -------------------------------------------------------------------------- */
/* API WordPress                                                              */
/* -------------------------------------------------------------------------- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function apiFetch(url, { retries = 4 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "user-agent": "artewiva-import/1.0 (+https://www.artewiva.it/)",
        },
      });
      if (res.status === 400 && /rest_post_invalid_page_number/.test(await res.text())) {
        return { items: [], headers: res.headers, beyondLastPage: true };
      }
      if (!res.ok) throw new Error(`HTTP ${res.status} su ${url}`);
      const items = await res.json();
      return {
        items: Array.isArray(items) ? items : [items],
        headers: res.headers,
        totalPages: Number(res.headers.get("x-wp-totalpages") ?? 1),
        total: Number(res.headers.get("x-wp-total") ?? items.length),
      };
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;
      await sleep(500 * 2 ** attempt);
    }
  }
  throw lastError;
}

/** Scarica N risorse con concorrenza limitata, preservando l'ordine. */
async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

const POST_FIELDS = [
  "id",
  "date",
  "modified",
  "slug",
  "link",
  "title",
  "excerpt",
  "content",
  "categories",
  "featured_media",
  "tags",
].join(",");

async function fetchPosts(opts, wanted) {
  const collected = [];
  let page = 1;
  let totalPages = 1;
  let archiveTotal = 0;

  while (collected.length < wanted && page <= totalPages) {
    const url = new URL(`${opts.api}/posts`);
    url.searchParams.set("per_page", String(opts.pageSize));
    url.searchParams.set("page", String(page));
    url.searchParams.set("orderby", "date");
    url.searchParams.set("order", "desc");
    url.searchParams.set("_fields", POST_FIELDS);
    if (opts.since) url.searchParams.set("after", `${opts.since}T00:00:00`);

    const { items, totalPages: tp, total } = await apiFetch(url.toString());
    totalPages = tp ?? 1;

    if (!opts.quiet) {
      const all = typeof total === "number" ? ` (archivio: ${total} articoli)` : "";
      console.log(`  · pagina ${page}/${totalPages} → ${items.length} articoli${all}`);
    }

    for (const post of items) {
      if (post && post.id && post.slug) collected.push(post);
      if (collected.length >= wanted) break;
    }
    if (items.length === 0) break;
    page += 1;
  }

  return { posts: collected.slice(0, wanted), archiveTotal };
}

async function fetchCategories(opts) {
  const url = new URL(`${opts.api}/categories`);
  url.searchParams.set("per_page", "100");
  url.searchParams.set("orderby", "count");
  url.searchParams.set("order", "desc");
  url.searchParams.set("_fields", "id,name,slug,count,parent");
  const { items } = await apiFetch(url.toString());
  return items;
}

async function fetchMedia(opts, ids) {
  const unique = [...new Set(ids.filter(Boolean))];
  const map = new Map();
  const chunks = [];
  for (let i = 0; i < unique.length; i += opts.pageSize) {
    chunks.push(unique.slice(i, i + opts.pageSize));
  }

  await mapLimit(chunks, 3, async (chunk) => {
    const url = new URL(`${opts.api}/media`);
    url.searchParams.set("include", chunk.join(","));
    url.searchParams.set("per_page", String(opts.pageSize));
    url.searchParams.set(
      "_fields",
      "id,source_url,alt_text,media_details"
    );
    const { items } = await apiFetch(url.toString());
    for (const media of items) map.set(media.id, media);
  });

  return map;
}

/* -------------------------------------------------------------------------- */
/* Pulizia HTML                                                               */
/* -------------------------------------------------------------------------- */

const NAMED_ENTITIES = {
  nbsp: " ",
  hellip: "…",
  quot: '"',
  laquo: "«",
  raquo: "»",
  ldquo: "“",
  rdquo: "”",
  lsquo: "‘",
  rsquo: "’",
  ndash: "–",
  mdash: "—",
  egrave: "è",
  eacute: "é",
  agrave: "à",
  ograve: "ò",
  ugrave: "ù",
  igrave: "ì",
};

const decodeEntities = (input) =>
  String(input ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "a", "ul", "ol", "li", "blockquote",
  "h2", "h3", "h4", "h5", "h6", "figure", "figcaption", "img", "hr", "small", "sup",
]);

/** Attributi conservati, per tag (tutto il resto viene scartato). */
const ALLOWED_ATTRS = {
  img: new Set(["src", "alt", "loading"]),
  a: new Set(["href", "target", "rel"]),
  figure: new Set(["data-artewiva"]),
};
const VOID_TAGS = new Set(["br", "hr", "img"]);

/**
 * Normalizza l'HTML degli articoli: rimuove script/stili/wrapper inutili,
 * riscrive i link assoluti, semplifica le immagini e trasforma i placeholder
 * delle gallerie NextGEN e dei flipbook PDF in marcatori usati dalla UI.
 */
function cleanContent(html, site) {
  let out = String(html ?? "");

  // 1. Flipbook PDF (window.option_df_<id>) → link "sfoglia il PDF".
  const pdfs = [];
  out = out.replace(
    /window\.option_df_\d+\s*=\s*\{[\s\S]*?"source"\s*:\s*"([^"]+)"[\s\S]*?\};?/g,
    (_match, rawUrl) => {
      const url = normalizeUrl(rawUrl.replace(/\\\//g, "/"), site);
      if (url) pdfs.push(url);
      return "";
    }
  );

  // 2. Via script, stili, iframe, commenti e widget video non riproducibili.
  out = out
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<div[^>]*class="[^"]*(?:ngg|slideshow|su-spoiler)[^"]*"[^>]*>/gi, "")
    .replace(/<span[^>]*>\s*<\/span>/gi, "");

  // 3. Gallerie NextGEN: il markup è generato solo lato sito originale.
  let galleryCount = 0;
  out = out.replace(/ngg_shortcode_\d+_placeholder/gi, () => {
    galleryCount += 1;
    return '<figure data-artewiva="gallery"></figure>';
  });

  // 4. Immagini: si tengono solo src/alt, con URL https.
  out = out.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    if (!src) return "";
    const alt = /\balt\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1] ?? "";
    const url = normalizeUrl(src, site);
    if (!url) return "";
    return `<img src="${url}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy" />`;
  });

  // 5. Link: assoluti e con target coerente.
  out = out.replace(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi, (tag, href) => {
    const url = normalizeUrl(href, site);
    if (!url) return "";
    const external = !url.startsWith(site) && !url.includes("artewiva.it");
    return `<a href="${url}"${external ? ' target="_blank" rel="noreferrer noopener"' : ""}>`;
  });

  // 6. Tag non ammessi → contenuto mantenuto, markup rimosso; sugli altri si
  //    conservano solo gli attributi della whitelist.
  out = out.replace(/<(\/?)([a-z][a-z0-9]*)\b([^>]*)>/gi, (_tag, slash, name, attrs) => {
    const lower = name.toLowerCase();
    if (!ALLOWED_TAGS.has(lower)) return "";
    if (slash) return VOID_TAGS.has(lower) ? "" : `</${lower}>`;
    const allowed = ALLOWED_ATTRS[lower];
    const kept = allowed
      ? [...attrs.matchAll(/([a-z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)]
          .filter((m) => allowed.has(m[1].toLowerCase()))
          .map((m) => `${m[1].toLowerCase()}="${(m[2] ?? m[3] ?? "").replace(/"/g, "&quot;")}"`)
          .join(" ")
      : "";
    const space = kept ? ` ${kept}` : "";
    return VOID_TAGS.has(lower) ? `<${lower}${space} />` : `<${lower}${space}>`;
  });

  // 7. Pulizie finali.
  out = out
    .replace(/(<p>\s*<\/p>\s*)+/gi, "")
    .replace(/(<br\s*\/?>\s*){3,}/gi, "<br /><br />")
    .replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, "")
    .replace(/\s+<\/p>/g, "</p>")
    .trim();

  return { html: out, galleryCount, pdfs };
}

function normalizeUrl(url, site) {
  if (!url) return "";
  const decoded = decodeEntities(url);
  try {
    const parsed = new URL(decoded, site);
    if (!/^https?:$/.test(parsed.protocol)) return "";
    // Il sito originale serve alcune risorse via http:// → forziamo https.
    if (parsed.hostname.endsWith("artewiva.it")) parsed.protocol = "https:";
    return parsed.toString();
  } catch {
    return "";
  }
}

/* -------------------------------------------------------------------------- */
/* Trasformazione articoli                                                    */
/* -------------------------------------------------------------------------- */

const stripHtml = (html) => decodeEntities(html);

const readingMinutes = (text) => Math.max(1, Math.round(text.split(/\s+/).length / 200));

/** Normalizza il testo per estratti e conteggi (spazi, punteggiatura, rumore). */
function tidyText(text) {
  return String(text ?? "")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/\b(fotoreport|foto report|comunicato stampa|leggi tutto|continua a leggere)\s*$/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function buildExcerpt(post, plainText) {
  // 1. L'estratto ufficiale di WordPress, quando è significativo.
  const wpExcerpt = tidyText(stripHtml(post.excerpt?.rendered ?? "").replace(/\[…\]|\s*…$/u, ""));
  if (wpExcerpt.length >= 24) return wpExcerpt;

  // 2. Altrimenti le prime frasi del testo dell'articolo.
  const text = tidyText(plainText);
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.length > 20);
  const fallback = (sentences.slice(0, 2).join(" ") || text).trim();
  return fallback.length > 240 ? `${fallback.slice(0, 237).trimEnd()}…` : fallback;
}

function slugifyCategory(item) {
  return decodeEntities(item?.name ?? "");
}

function transformPost(post, mediaMap, categoryMap, site) {
  const title = stripHtml(post.title?.rendered ?? "").trim();
  const rawContent = post.content?.rendered ?? "";
  const { html, galleryCount, pdfs } = cleanContent(rawContent, site);
  const plainText = stripHtml(html);
  const media = mediaMap.get(post.featured_media);
  const details = media?.media_details ?? {};
  const sizes = details.sizes ?? {};
  const sizeUrl = (key) => normalizeUrl(sizes[key]?.source_url ?? "", site);
  const full = normalizeUrl(media?.source_url ?? "", site);
  // Copertina: si preferisce una misura intermedia (più leggera) con fallback.
  const card = sizeUrl("medium_large") || sizeUrl("large") || sizeUrl("medium") || full;
  const hero = sizeUrl("large") || sizeUrl("medium_large") || full;
  const cardSize = sizeUrl("medium_large")
    ? sizes.medium_large
    : sizeUrl("large")
      ? sizes.large
      : sizeUrl("medium")
        ? sizes.medium
        : null;

  const categories = (post.categories ?? [])
    .map((id) => categoryMap.get(id))
    .filter(Boolean)
    .map((c) => ({ id: c.id, name: slugifyCategory(c), slug: c.slug }));

  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    modified: post.modified ?? post.date,
    link: normalizeUrl(post.link, site),
    title: title || `Articolo #${post.id}`,
    excerpt: buildExcerpt(post, plainText),
    content: html,
    categories,
    primaryCategory: categories[0]?.name ?? "Artewiva",
    media: {
      full: full || null,
      hero: hero || null,
      card: card || null,
      alt: decodeEntities(media?.alt_text ?? "") || title,
      width: cardSize?.width ?? details.width ?? null,
      height: cardSize?.height ?? details.height ?? null,
    },
    galleryCount,
    pdfs,
    readingMinutes: readingMinutes(plainText),
    wordCount: plainText ? plainText.split(/\s+/).length : 0,
  };
}

/* -------------------------------------------------------------------------- */
/* Immagini                                                                   */
/* -------------------------------------------------------------------------- */

const EXT_BY_TYPE = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

async function downloadImages(articles, opts) {
  await mkdir(opts.imagesDir, { recursive: true });
  let saved = 0;

  await mapLimit(articles, Math.min(opts.concurrency, 4), async (article) => {
    for (const key of ["card", "full"]) {
      const url = article.media?.[key];
      if (!url || !url.includes("/wp-content/uploads/")) continue;
      const rel = url.split("/wp-content/uploads/")[1];
      if (!rel) continue;
      const target = path.join(opts.imagesDir, rel);
      try {
        await mkdir(path.dirname(target), { recursive: true });
        const res = await fetch(url, { headers: { "user-agent": "artewiva-import/1.0" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const type = res.headers.get("content-type") ?? "";
        const buffer = Buffer.from(await res.arrayBuffer());
        const finalPath = /\.(jpe?g|png|webp|gif|avif)$/i.test(target)
          ? target
          : `${target}${EXT_BY_TYPE[type.split(";")[0]] ?? ""}`;
        await writeFile(finalPath, buffer);
        const relPublic = path
          .relative(path.join(opts.imagesDir, ".."), finalPath)
          .split(path.sep)
          .join("/");
        article.media[key] = `${opts.imagesBase.replace(/\/$/, "")}/${relPublic}`.replace(
          /^\/public\//,
          "/"
        );
        saved += 1;
      } catch (error) {
        if (!opts.quiet) console.warn(`  ! immagine non salvata (${url}): ${error.message}`);
      }
    }
  });

  if (!opts.quiet) console.log(`  · ${saved} immagini salvate in ${opts.imagesDir}`);
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const started = Date.now();
  const root = process.cwd();

  console.log("Artewiva → import articoli");
  console.log(`  · API: ${opts.api}`);
  console.log(`  · limite: ${opts.limit}${opts.since ? ` (dal ${opts.since})` : ""}`);

  const existing = opts.merge
    ? await readFile(path.join(root, opts.out), "utf8")
        .then((raw) => JSON.parse(raw))
        .catch(() => null)
    : null;

  const { posts, archiveTotal: postsArchiveTotal } = await fetchPosts(opts, opts.limit);
  if (posts.length === 0) {
    console.error("Nessun articolo ricevuto: import interrotto.");
    process.exit(1);
  }

  const rawCategories = await fetchCategories(opts);
  const categoryMap = new Map(rawCategories.map((c) => [c.id, c]));

  // Il conteggio restituito dall'endpoint /posts può essere limitato dalla
  // configurazione del sito: la categoria più popolosa è una stima affidabile
  // della dimensione reale dell'archivio.
  const archiveTotal =
    Math.max(
      postsArchiveTotal,
      ...rawCategories.map((c) => Number(c.count) || 0)
    ) || posts.length;

  console.log(`  · recupero copertine (${posts.filter((p) => p.featured_media).length})`);
  const mediaMap = await fetchMedia(
    opts,
    posts.map((p) => p.featured_media)
  );

  let articles = posts.map((post) => transformPost(post, mediaMap, categoryMap, opts.site));

  if (existing?.articles?.length) {
    const seen = new Set(articles.map((a) => a.id));
    const kept = existing.articles.filter((a) => !seen.has(a.id));
    articles = [...articles, ...kept];
    console.log(`  · merge: ${kept.length} articoli già presenti conservati`);
  }

  if (opts.downloadImages) await downloadImages(articles, opts);

  // Categorie effettivamente presenti nell'archivio importato.
  const usedCategories = new Map();
  for (const article of articles) {
    for (const category of article.categories) {
      const entry = usedCategories.get(category.id) ?? { ...category, count: 0 };
      entry.count += 1;
      usedCategories.set(category.id, entry);
    }
  }

  const output = {
    source: opts.site,
    api: opts.api,
    generatedAt: new Date().toISOString(),
    count: articles.length,
    archiveTotal,
    olderOnSite: Math.max(0, archiveTotal - articles.length),
    categories: [...usedCategories.values()].sort((a, b) => b.count - a.count),
    articles,
  };

  const outPath = path.resolve(root, opts.out);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, `${JSON.stringify(output)}\n`, "utf8");

  const size = (JSON.stringify(output).length / 1024).toFixed(0);
  console.log(
    `✓ ${articles.length} articoli importati in ${opts.out} (${size} KB) in ${(
      (Date.now() - started) / 1000
    ).toFixed(1)}s`
  );
  console.log(`  · categorie: ${[...usedCategories.values()].map((c) => c.name).join(", ")}`);
}

main().catch((error) => {
  console.error("Import fallito:", error);
  process.exit(1);
});
