/**
 * Archivio articoli importato da www.artewiva.it.
 *
 * Il dataset `artewiva-news.json` è generato da `scripts/import-artewiva.mjs`
 * leggendo la REST API pubblica del sito (WordPress) e viene aggiornato dalla
 * pipeline GitHub Actions `.github/workflows/import-artewiva.yml`.
 *
 * Le immagini restano ospitate su artewiva.it: il dataset conserva solo gli URL.
 */
import dataset from "./artewiva-news.json";

export type NewsCategory = {
  id: number;
  name: string;
  slug: string;
};

export type NewsArticle = {
  id: number;
  slug: string;
  /** Data di pubblicazione originale (ISO, senza fuso). */
  date: string;
  modified: string;
  /** URL dell'articolo originale su artewiva.it */
  link: string;
  title: string;
  excerpt: string;
  /** HTML dell'articolo, ripulito dagli elementi non riproducibili. */
  content: string;
  categories: NewsCategory[];
  primaryCategory: string;
  media: {
    full: string | null;
    hero: string | null;
    card: string | null;
    alt: string;
    width: number | null;
    height: number | null;
  };
  /** Numero di fotogallerie NextGEN presenti nell'articolo originale. */
  galleryCount: number;
  /** PDF (programmi, cartelle stampa) agganciati all'articolo. */
  pdfs: string[];
  readingMinutes: number;
  wordCount: number;
};

export type NewsDataset = {
  source: string;
  api: string;
  generatedAt: string;
  count: number;
  archiveTotal: number;
  olderOnSite: number;
  categories: (NewsCategory & { count: number })[];
  articles: NewsArticle[];
};

export const NEWS: NewsDataset = dataset as unknown as NewsDataset;

/** Articoli ordinati dal più recente. */
export const ARTICLES: NewsArticle[] = [...NEWS.articles].sort((a, b) =>
  b.date.localeCompare(a.date)
);

/* -------------------------------------------------------------------------- */
/* Rubriche editoriali                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Le categorie WordPress del sito originale sono in parte tecniche
 * (NEWS, MEDIA GALLERY): qui vengono raggruppate in rubriche leggibili.
 */
export type Rubrica = {
  slug: string;
  label: string;
  blurb: string;
  /** Slug delle categorie WordPress che alimentano la rubrica. */
  categories: string[];
  /** Rubrica speciale: articoli con fotogalleria. */
  galleriesOnly?: boolean;
};

export const RUBRICHE: Rubrica[] = [
  {
    slug: "reportage",
    label: "Reportage live",
    blurb: "Concerti, festival e serate raccontati dal vivo.",
    categories: ["foto-reportage-eventi"],
  },
  {
    slug: "interviste",
    label: "Interviste",
    blurb: "Voci, artisti e protagonisti della scena.",
    categories: ["interviste"],
  },
  {
    slug: "fotoreport",
    label: "Fotoreportage",
    blurb: "Storie per immagini, come le racconta l'obiettivo.",
    categories: [],
    galleriesOnly: true,
  },
  {
    slug: "video",
    label: "Video & TV",
    blurb: "Format video e produzioni Artewiva TV.",
    categories: ["video", "format-tv"],
  },
  {
    slug: "musica",
    label: "Musica",
    blurb: "Dischi, videoclip e progetti musicali.",
    categories: ["musica-inedita", "articoli", "artisti-band", "mostre-musica"],
  },
  {
    slug: "recensioni",
    label: "Recensioni",
    blurb: "Album, libri e spettacoli passati al setaccio.",
    categories: ["recensioni", "libri-al-centro"],
  },
  {
    slug: "arti",
    label: "Arti & Mostre",
    blurb: "Arti performative, figurative e mostre.",
    categories: ["arti-performative", "arti-figurative", "mostre"],
  },
  {
    slug: "news",
    label: "News",
    blurb: "Comunicati, annunci e appuntamenti.",
    categories: ["location", "media-gallery"],
  },
];

const RUBRICHE_BY_SLUG = new Map(RUBRICHE.map((r) => [r.slug, r]));

export function getRubrica(slug: string): Rubrica | undefined {
  return RUBRICHE_BY_SLUG.get(slug);
}

export function matchesRubrica(article: NewsArticle, rubrica: Rubrica): boolean {
  if (rubrica.galleriesOnly) return article.galleryCount > 0;
  return article.categories.some((c) => rubrica.categories.includes(c.slug));
}

/** Rubrica mostrata sulle card: la prima "specifica" che corrisponde. */
export function rubricaOf(article: NewsArticle): Rubrica {
  const specific = RUBRICHE.filter((r) => r.slug !== "news" && r.slug !== "fotoreport");
  return (
    specific.find((r) => matchesRubrica(article, r)) ??
    (matchesRubrica(article, RUBRICHE_BY_SLUG.get("fotoreport")!)
      ? RUBRICHE_BY_SLUG.get("fotoreport")!
      : RUBRICHE_BY_SLUG.get("news")!)
  );
}

/* -------------------------------------------------------------------------- */
/* Utilità di consultazione                                                   */
/* -------------------------------------------------------------------------- */

const MESI = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MESI[m - 1]} ${y}`;
}

export function formatShortDate(iso: string): string {
  const [y, m] = iso.slice(0, 10).split("-").map(Number);
  return m ? `${MESI[m - 1].slice(0, 3)} ${y}` : iso;
}

export function yearOf(iso: string): string {
  return iso.slice(0, 4);
}

export const YEARS: string[] = [
  ...new Set(ARTICLES.map((a) => yearOf(a.date))),
].sort((a, b) => b.localeCompare(a));

export const NEWS_ARCHIVE = {
  count: ARTICLES.length,
  oldest: ARTICLES[ARTICLES.length - 1]?.date ?? "",
  newest: ARTICLES[0]?.date ?? "",
  withGallery: ARTICLES.filter((a) => a.galleryCount > 0).length,
  sources: RUBRICHE.filter((r) => ARTICLES.some((a) => matchesRubrica(a, r))),
};

/** Normalizza per la ricerca: minuscole e senza accenti. */
const norm = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function searchArticles(list: NewsArticle[], query: string): NewsArticle[] {
  const q = norm(query.trim());
  if (q.length < 2) return list;
  const terms = q.split(/\s+/);
  return list.filter((article) => {
    const haystack = norm(
      `${article.title} ${article.excerpt} ${article.categories.map((c) => c.name).join(" ")}`
    );
    return terms.every((term) => haystack.includes(term));
  });
}

export type SortKey = "recenti" | "meno-recenti" | "lettura";

export function sortArticles(list: NewsArticle[], sort: SortKey): NewsArticle[] {
  const copy = [...list];
  if (sort === "meno-recenti") return copy.sort((a, b) => a.date.localeCompare(b.date));
  if (sort === "lettura") return copy.sort((a, b) => b.readingMinutes - a.readingMinutes);
  return copy.sort((a, b) => b.date.localeCompare(a.date));
}

export function filterArticles({
  rubrica = "tutte",
  year = "tutti",
  query = "",
}: {
  rubrica?: string;
  year?: string;
  query?: string;
}): NewsArticle[] {
  let list = ARTICLES;
  const r = getRubrica(rubrica);
  if (r) list = list.filter((a) => matchesRubrica(a, r));
  if (year !== "tutti") list = list.filter((a) => yearOf(a.date) === year);
  if (query.trim().length >= 2) list = searchArticles(list, query);
  return list;
}

export function getArticle(slug: string): NewsArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Articoli precedente/successivo rispetto a quello aperto. */
export function adjacentArticles(slug: string): {
  newer?: NewsArticle;
  older?: NewsArticle;
} {
  const index = ARTICLES.findIndex((a) => a.slug === slug);
  if (index < 0) return {};
  return { newer: ARTICLES[index - 1], older: ARTICLES[index + 1] };
}

/** Articoli correlati: stessa rubrica, poi stesso anno, escluso quello corrente. */
export function relatedArticles(article: NewsArticle, limit = 3): NewsArticle[] {
  const rubrica = rubricaOf(article);
  const sameRubrica = ARTICLES.filter(
    (a) => a.slug !== article.slug && matchesRubrica(a, rubrica)
  );
  const sameYear = ARTICLES.filter(
    (a) =>
      a.slug !== article.slug &&
      yearOf(a.date) === yearOf(article.date) &&
      !sameRubrica.some((s) => s.slug === a.slug)
  );
  return [...sameRubrica, ...sameYear].slice(0, limit);
}
