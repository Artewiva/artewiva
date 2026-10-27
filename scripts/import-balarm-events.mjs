#!/usr/bin/env node
/**
 * import-balarm-events.mjs
 * ---------------------------------------------------------------------------
 * Importa l'agenda di Balarm.it ("Tutti gli eventi a Palermo e provincia")
 * nel dataset statico consumato dalle sezioni EVENTI / "Prossimi eventi":
 *
 *    src/data/balarm-events.json
 *
 * Pagine lette (in ordine): oggi, domani, weekend, prossima settimana.
 * Vengono estratti SOLO dati di servizio — titolo, categoria, date, luogo e
 * link alla scheda originale. Nessun brano degli articoli e nessuna immagine
 * della fonte viene copiato nel progetto.
 *
 * Uso:
 *    npm run import:events
 *    node scripts/import-balarm-events.mjs --url https://www.balarm.it/... --dry-run
 *    node scripts/import-balarm-events.mjs --from-file pagina.html --out /tmp/e.json
 *    npm run test:import-events        # test del parser, senza rete
 *
 * Opzioni:
 *    --url <url>          pagina da leggere (ripetibile; default: 4 pagine "quando")
 *    --from-file <path>   file locale HTML o markdown (ripetibile, niente rete)
 *    --out <path>         file JSON di output (default src/data/balarm-events.json)
 *    --date <YYYY-MM-DD>  data da scrivere in generatedAt (default: oggi)
 *    --merge              unisce gli eventi al dataset esistente per id
 *    --min-events <n>     minimo eventi attesi, altrimenti errore (default 20)
 *    --dry-run            non scrive il file
 *    --quiet              riduce il logging
 *
 * Requisiti: Node >= 18 (usa fetch globale). Nessuna dipendenza esterna.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

export const DEFAULT_SOURCE =
  "https://www.balarm.it/tutti-gli-eventi-a-palermo-e-provincia-di-oggi";

export const DEFAULT_PAGES = [
  DEFAULT_SOURCE,
  "https://www.balarm.it/tutti-gli-eventi-a-palermo-e-provincia-di-domani",
  "https://www.balarm.it/tutti-gli-eventi-a-palermo-e-provincia-del-weekend",
  "https://www.balarm.it/tutti-gli-eventi-a-palermo-e-provincia-della-prossima-settimana",
];

const CATEGORY_NAMES = [
  "Eventi da non perdere",
  "Eventi gratuiti",
  "Festival e rassegne",
  "Concerti",
  "Opera, musical e danza",
  "Teatro e cabaret",
  "Musica e aperitivi",
  "Dove mangiare",
  "Sagre di paese",
  "Mercatini e artigianato",
  "Visite ed escursioni",
  "Esperienze",
  "Bambini e ragazzi",
  "Sport e giochi",
  "Libri, film e incontri",
  "Mostre",
];

const CATEGORY_LOOKUP = new Map(
  CATEGORY_NAMES.map((name) => [name.toLocaleUpperCase("it"), name])
);

const MONTHS = {
  gennaio: 1, febbraio: 2, marzo: 3, aprile: 4, maggio: 5, giugno: 6,
  luglio: 7, agosto: 8, settembre: 9, ottobre: 10, novembre: 11, dicembre: 12,
};

const MONTH_RE = new RegExp(`\\b(?:${Object.keys(MONTHS).join("|")})\\b`, "i");

const pad = (n) => String(n).padStart(2, "0");

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* -------------------------------------------------------------------------- */
/* HTML -> testo in stile markdown                                            */
/* -------------------------------------------------------------------------- */

const ENTITIES = {
  amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", laquo: "«", raquo: "»",
  egrave: "è", eacute: "é", agrave: "à", ograve: "ò", ugrave: "ù", igrave: "ì",
  deg: "°", hellip: "…", ndash: "–", mdash: "—",
};

export function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (all, name) => ENTITIES[name.toLowerCase()] ?? all);
}

const stripTags = (html) => html.replace(/<[^>]*>/g, " ");

/** Converte l'HTML di una pagina in righe simili al markdown del listing. */
export function htmlToMarkdown(html) {
  let s = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  s = s.replace(/<li\b[^>]*>/gi, "\n- ");
  s = s.replace(/<h([1-6])\b[^>]*>/gi, (_, n) => `\n${"#".repeat(Number(n))} `);
  s = s.replace(/<\/h[1-6]>/gi, "\n");
  s = s.replace(
    /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, inner) =>
      `[${decodeEntities(stripTags(inner)).replace(/\s+/g, " ").trim()}](${href})`
  );
  s = s.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/src\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";
    return `![](${src})`;
  });
  s = s.replace(
    /<\/?(?:br|p|div|ul|ol|li|tr|td|table|section|article|figure|figcaption|em|span|strong|small|time|header|footer)\b[^>]*>/gi,
    "\n"
  );
  s = decodeEntities(stripTags(s));
  return s
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n");
}

/* -------------------------------------------------------------------------- */
/* Date in italiano                                                           */
/* -------------------------------------------------------------------------- */

function parsePart(text, fallbackMonth, fallbackYear, referenceYear) {
  const m = text
    .trim()
    .match(/^(\d{1,2})(?:\s+([a-zà-ù]+))?(?:\s+(\d{4}))?$/i);
  if (!m) return null;
  const day = Number(m[1]);
  const month = m[2] ? MONTHS[m[2].toLowerCase()] : fallbackMonth;
  const year = m[3] ? Number(m[3]) : (fallbackYear ?? referenceYear);
  if (!month || !year || day < 1 || day > 31) return null;
  return `${year}-${pad(month)}-${pad(day)}`;
}

/**
 * Converte etichette come "27 ottobre 2026", "Dal 23 al 31 ottobre 2026",
 * "Dal 20 ottobre 2026 al 29 gennaio 2027" in { start, end } ISO.
 */
export function parseItalianDateRange(label, referenceYear = new Date().getFullYear()) {
  if (!label) return null;
  const clean = label
    .replace(/^Dal\s+/i, "")
    .replace(/[_*]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // "all'8 novembre", "al 17 novembre", "a 1 dicembre", "al 2 novembre 2026".
  // Il lookahead sul numero evita di scambiare per separatore la "a" di "aprile".
  const sep = clean.match(/\s+(?:all['’]?\s*|alla\s+|al\s+|a\s+)(?=\d)/i);
  const left = (sep ? clean.slice(0, sep.index) : clean).trim();
  const right = sep ? clean.slice(sep.index + sep[0].length).trim() : null;

  if (right) {
    const end = parsePart(right, null, null, referenceYear);
    const endMonth = end ? Number(end.slice(5, 7)) : null;
    const endYear = end ? Number(end.slice(0, 4)) : null;
    const start = parsePart(left, endMonth, endYear, referenceYear);
    if (start && end && start <= end) return { start, end };
    return null;
  }
  const single = parsePart(left, null, null, referenceYear);
  return single ? { start: single, end: single } : null;
}

/* -------------------------------------------------------------------------- */
/* Parsing del documento                                                      */
/* -------------------------------------------------------------------------- */

function normalizeLine(line) {
  return line
    .replace(/\\-/g, "-")
    .replace(/\\_/g, "_")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]")
    .replace(/\\\\/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function absolutize(href, base = "https://www.balarm.it/") {
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}

function isEventUrl(url) {
  return /^https?:\/\/(www\.)?balarm\.it\/(eventi|news)\/[a-z0-9%-]+-\d+\/?$/i.test(url);
}

function idFromUrl(url) {
  return url.match(/-(\d+)\/?$/)?.[1] ?? null;
}

function matchCategory(text) {
  const key = text.replace(/[#*_]/g, "").replace(/\s+/g, " ").trim().toLocaleUpperCase("it");
  return CATEGORY_LOOKUP.get(key) ?? null;
}

function findDateLabel(line) {
  const s = line.replace(/^[-*]\s*/, "").replace(/[_*]/g, "").trim();
  if (!s || s.length > 95 || s.includes("](") || s.includes("http")) return null;
  if (!/^\d{1,2}\b/.test(s) && !/^Dal\s+\d{1,2}\b/i.test(s)) return null;
  if (!MONTH_RE.test(s)) return null;
  return s;
}

function cityFromVenue(text) {
  if (/sicilia/i.test(text)) return "Sicilia";
  const known = [
    "Termini Imerese", "Castelbuono", "Cefalù", "Bagheria", "Carini", "Cinisi",
    "Monreale", "Marineo", "Mezzojuso", "Capaci", "Polizzi Generosa",
    "Corleone", "Casteldaccia", "Finale di Pollina", "Ustica",
  ];
  const hit = known.find((k) => text.toLocaleLowerCase("it").includes(k.toLocaleLowerCase("it")));
  return hit ? `${hit} (Pa)` : "Palermo";
}

/** Cerca luogo e città in una riga (link /luoghi/ oppure testo "Luogo - Città"). */
export function extractVenueFromLine(line) {
  const s = line
    .replace(/\\-/g, "-")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\s*\/\s*/g, " | ")
    .trim();
  const segments = s.split(/\s*[|/]\s*/).map((x) => x.trim()).filter(Boolean);
  for (const seg of segments.reverse()) {
    if (seg.length > 130 || /\[\.\.\.\]/.test(seg) || /^[_*]\s*$/.test(seg)) continue;
    if (/^(?:Dal\s+)?\d{1,2}\b/.test(seg) && MONTH_RE.test(seg)) continue;
    const dash = seg.match(/^(.*?)\s+-\s+([^-]+)$/);
    if (dash && dash[1].trim()) {
      return { venue: dash[1].trim(), city: dash[2].trim() };
    }
    if (/^vari luoghi/i.test(seg)) {
      return { venue: seg, city: cityFromVenue(seg) };
    }
  }
  return null;
}

const LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g;

/**
 * Estrae gli eventi da una pagina HTML o dal suo equivalente markdown.
 * Ritorna oggetti `CityEvent` senza dipendere da I/O o dalla rete.
 */
export function parseEventDocument(text, options = {}) {
  const referenceYear = Number((options.date ?? todayISO()).slice(0, 4));
  const looksLikeHtml = /<\s*(?:html|div|li|ul|section|a|h[1-6])\b/i.test(text);
  const markdown = looksLikeHtml ? htmlToMarkdown(text) : text;
  const lines = markdown.split("\n").map(normalizeLine);

  const blocks = [];
  let category = "Eventi";
  let current = null;

  const newBlock = () => ({
    category, title: "", url: "", dateLabel: "", venue: "", city: "",
  });
  const finalize = () => {
    if (current?.title && current.url) blocks.push(current);
    current = null;
  };

  for (const line of lines) {
    if (!line) continue;

    const heading = line.match(/^#{1,6}\s+(.+)$/);
    if (heading) {
      const matched = matchCategory(heading[1]);
      if (matched) {
        finalize();
        category = matched;
        // Un'intestazione di sezione non contiene link: nient'altro da fare.
        continue;
      }
      // I titoli "in evidenza" sono spesso dentro <h3>: non sono categorie,
      // quindi la riga va comunque analizzata come link qui sotto.
    }

    // Ogni <li> (o riga che inizia con "- ") apre una nuova scheda evento.
    // Dopo la conversione HTML un <li> con tag annidati può lasciare un "-"
    // da solo sulla riga: anche quello è un confine.
    if (!heading && /^[-*](?:\s|$)/.test(line)) {
      finalize();
      current = newBlock();
    } else if (!current) {
      current = newBlock();
    }

    const links = [...line.matchAll(LINK_RE)];
    for (const [, rawText, rawHref] of links) {
      const url = absolutize(rawHref.trim());
      const label = rawText.replace(/!\[[^\]]*\]\([^)]*\)/g, "").trim();
      if (/\/luoghi\//i.test(url)) {
        if (!current.venue && label) current.venue = label;
      } else if (isEventUrl(url)) {
        if (!label || label.startsWith("![")) continue;
        if (current.title && current.url && idFromUrl(current.url) !== idFromUrl(url)) {
          finalize();
          current = newBlock();
        }
        if (!current.title) {
          current.title = label;
          current.url = url;
        }
      }
    }

    const dateLabel = findDateLabel(line);
    if (dateLabel && !current.dateLabel) current.dateLabel = dateLabel;

    const venue = extractVenueFromLine(line);
    if (venue) {
      if (!current.venue) current.venue = venue.venue;
      if (!current.city) current.city = venue.city;
    } else if (/^[-*]?\s*vari luoghi/i.test(line) && !current.venue) {
      const plain = line.replace(/^[-*]\s*/, "").trim();
      current.venue = plain;
      current.city = cityFromVenue(plain);
    }
  }
  finalize();

  const events = [];
  for (const block of blocks) {
    const id = idFromUrl(block.url);
    const range = parseItalianDateRange(block.dateLabel, referenceYear);
    if (!id || !range) continue;
    events.push({
      id,
      title: block.title,
      url: block.url,
      category: block.category,
      dateLabel: block.dateLabel,
      start: range.start,
      end: range.end,
      venue: block.venue || "Palermo e provincia",
      city: block.city || "Palermo",
    });
  }
  return events;
}

/* -------------------------------------------------------------------------- */
/* Aggregazione                                                               */
/* -------------------------------------------------------------------------- */

/** Unisce più sorgenti per id, preferendo la scheda con più informazioni. */
export function dedupeEvents(events) {
  const byId = new Map();
  for (const event of events) {
    const prev = byId.get(event.id);
    if (!prev) {
      byId.set(event.id, event);
      continue;
    }
    const score = (e) =>
      (e.venue && e.venue !== "Palermo e provincia" ? 2 : 0) +
      (e.category !== "Eventi" ? 2 : 0) +
      (e.title?.length ?? 0) / 1000;
    byId.set(event.id, score(event) > score(prev) ? { ...prev, ...event } : { ...event, ...prev });
  }
  return [...byId.values()].sort(
    (a, b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title)
  );
}

export function buildDataset(events, options = {}) {
  const pages = options.pages?.length ? options.pages : DEFAULT_PAGES;
  return {
    source: "Balarm.it",
    sourceName: "Balarm.it — eventi a Palermo e provincia",
    sourceUrl: options.sourceUrl ?? pages[0] ?? DEFAULT_SOURCE,
    sourcePages: pages,
    generatedAt: options.date ?? todayISO(),
    count: events.length,
    events,
  };
}

/* -------------------------------------------------------------------------- */
/* CLI                                                                        */
/* -------------------------------------------------------------------------- */

function parseArgs(argv) {
  const opts = {
    out: "src/data/balarm-events.json",
    urls: [],
    files: [],
    date: todayISO(),
    merge: false,
    minEvents: 20,
    dryRun: false,
    quiet: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--url": opts.urls.push(argv[++i]); break;
      case "--from-file": opts.files.push(argv[++i]); break;
      case "--out": opts.out = argv[++i]; break;
      case "--date": opts.date = argv[++i]; break;
      case "--min-events": opts.minEvents = Number(argv[++i]); break;
      case "--merge": opts.merge = true; break;
      case "--dry-run": opts.dryRun = true; break;
      case "--quiet": opts.quiet = true; break;
      case "--help": case "-h": opts.help = true; break;
      default:
        if (arg.startsWith("-")) console.warn(`! opzione ignorata: ${arg}`);
    }
  }
  if (!opts.urls.length && !opts.files.length) opts.urls = [...DEFAULT_PAGES];
  return opts;
}

const HELP = `Uso: node scripts/import-balarm-events.mjs [opzioni]

  --url <url>          pagina Balarm da leggere (ripetibile)
  --from-file <path>   file HTML/markdown locale (ripetibile, nessuna rete)
  --out <path>         output JSON (default src/data/balarm-events.json)
  --date <YYYY-MM-DD>  data generazione (default oggi)
  --merge              unisci al dataset esistente
  --min-events <n>     minimo eventi richiesti (default 20)
  --dry-run            non scrivere il file
  --quiet              meno output
`;

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; ArteWivaAgendaBot/1.0; +https://www.artewiva.it/)",
      accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} per ${url}`);
  return res.text();
}

async function main(argv = process.argv.slice(2)) {
  const opts = parseArgs(argv);
  if (opts.help) {
    console.log(HELP);
    return;
  }
  const log = (...args) => { if (!opts.quiet) console.log(...args); };
  const collected = [];

  for (const file of opts.files) {
    const text = await readFile(file, "utf8");
    const events = parseEventDocument(text, { date: opts.date });
    log(`· ${file}: ${events.length} eventi`);
    collected.push(...events);
  }
  for (const url of opts.urls) {
    try {
      const text = await fetchPage(url);
      const events = parseEventDocument(text, { date: opts.date });
      log(`· ${url}: ${events.length} eventi`);
      collected.push(...events);
    } catch (error) {
      console.warn(`! impossibile leggere ${url}: ${error.message}`);
    }
  }

  let events = dedupeEvents(collected);

  if (opts.merge) {
    try {
      const existing = JSON.parse(await readFile(opts.out, "utf8"));
      if (Array.isArray(existing.events)) {
        events = dedupeEvents([...existing.events, ...events]);
        log(`· merge con dataset esistente: ${events.length} eventi totali`);
      }
    } catch {
      log("· nessun dataset esistente, merge ignorato");
    }
  }

  // Protezione: se il markup della fonte è cambiato e il parser non produce
  // risultati sufficienti, NON sovrascrivere il dataset funzionante.
  if (events.length < opts.minEvents) {
    throw new Error(
      `Trovati solo ${events.length} eventi (minimo ${opts.minEvents}): ` +
      "il dataset esistente è stato lasciato invariato. Controlla il parser."
    );
  }

  const pages = opts.urls.length ? opts.urls : DEFAULT_PAGES;
  const dataset = buildDataset(events, {
    pages,
    sourceUrl: opts.files.length && !opts.urls.length ? DEFAULT_SOURCE : pages[0],
    date: opts.date,
  });

  if (opts.dryRun) {
    log(`· dry-run: ${dataset.count} eventi, nessun file scritto`);
    return dataset;
  }
  await writeFile(opts.out, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");
  log(`✓ ${path.resolve(opts.out)} — ${dataset.count} eventi importati`);
  return dataset;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`✗ ${error.message}`);
    process.exitCode = 1;
  });
}

export { main };
