import React, { Fragment, useEffect } from "react";
import { CoverImage, RubricaTag } from "../components/ArticleCard";
import { Button, Kicker, cx } from "../components/ui";
import {
  adjacentArticles,
  formatDate,
  getArticle,
  relatedArticles,
  rubricaOf,
  type NewsArticle,
} from "../data/news";
import { CtaBand } from "./Home";

/** Marcatore lasciato dall'import al posto delle gallerie NextGEN. */
const GALLERY_MARKER = '<figure data-artewiva="gallery"></figure>';
const GALLERY_MARKER_LOOSE = /<figure[^>]*data-artewiva[^>]*>\s*<\/figure>/g;

export default function ArticleDetail({ slug }: { slug: string }) {
  const article = getArticle(slug);

  useEffect(() => {
    if (!article) return;
    const previous = document.title;
    document.title = `${article.title} — ArteWiva`;
    return () => {
      document.title = previous;
    };
  }, [article]);

  if (!article) return <NotFound slug={slug} />;

  const rubrica = rubricaOf(article);
  const { newer, older } = adjacentArticles(article.slug);
  const related = relatedArticles(article);
  const segments = article.content
    .replace(GALLERY_MARKER_LOOSE, GALLERY_MARKER)
    .split(GALLERY_MARKER);

  return (
    <main>
      {/* Testata dell'articolo */}
      <header className="relative overflow-hidden bg-ink-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <CoverImage
          src={article.media.hero ?? article.media.card}
          alt={article.media.alt}
          label={article.title}
          className="absolute inset-0 h-full w-full opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/50" />
        <div className="relative mx-auto max-w-3xl px-5">
          <a
            href="#/articoli"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            <span>←</span> Tutti gli articoli
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <RubricaTag article={article} light />
            <span className="text-xs font-medium text-white/60">
              {formatDate(article.date)}
            </span>
            <span className="text-xs font-medium text-white/40">
              · {article.readingMinutes} min di lettura
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            {article.excerpt}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Corpo dell'articolo */}
        <article className="min-w-0">
          <figure className="overflow-hidden rounded-[2rem] bg-sand-100 ring-1 ring-ink-950/5">
            <CoverImage
              src={article.media.hero ?? article.media.card ?? article.media.full}
              alt={article.media.alt}
              label={article.title}
              className="aspect-[16/9] w-full"
            />
            <figcaption className="px-5 py-3 text-xs text-ink-900/50">
              {article.media.alt} — immagine in evidenza dell'articolo originale
              pubblicato su artewiva.it.
            </figcaption>
          </figure>

          <div className="mt-10">
            {segments.map((html, index) => (
              <Fragment key={index}>
                {html.trim() && (
                  <div className="aw-prose" dangerouslySetInnerHTML={{ __html: html }} />
                )}
                {index < segments.length - 1 && <GalleryCallout article={article} />}
              </Fragment>
            ))}
          </div>

          {article.pdfs.length > 0 && (
            <div className="mt-10 rounded-3xl bg-sand-100 p-6 ring-1 ring-ink-950/5">
              <Kicker>Documento allegato</Kicker>
              <p className="mt-3 text-sm text-ink-900/70">
                L'articolo originale include un PDF sfogliabile.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {article.pdfs.map((pdf) => (
                  <Button key={pdf} href={pdf} variant="ghost">
                    Apri il PDF ({decodeURIComponent(pdf.split("/").pop() ?? "").slice(0, 34)})
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Navigazione tra articoli */}
          <nav className="mt-12 grid gap-4 border-t border-ink-950/10 pt-8 sm:grid-cols-2">
            {older ? (
              <a
                href={`#/articoli/${older.slug}`}
                className="group rounded-3xl bg-white p-5 ring-1 ring-ink-950/5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-900/40">
                  Articolo precedente
                </p>
                <p className="mt-2 font-display text-base leading-snug font-bold text-ink-950 group-hover:text-brand-600">
                  {older.title}
                </p>
                <p className="mt-1 text-xs text-ink-900/45">{formatDate(older.date)}</p>
              </a>
            ) : (
              <span />
            )}
            {newer && (
              <a
                href={`#/articoli/${newer.slug}`}
                className="group rounded-3xl bg-white p-5 text-right ring-1 ring-ink-950/5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-900/40">
                  Articolo successivo
                </p>
                <p className="mt-2 font-display text-base leading-snug font-bold text-ink-950 group-hover:text-brand-600">
                  {newer.title}
                </p>
                <p className="mt-1 text-xs text-ink-900/45">{formatDate(newer.date)}</p>
              </a>
            )}
          </nav>
        </article>

        {/* Colonna laterale */}
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-950/5">
            <h2 className="font-display text-sm font-bold tracking-wide text-ink-950">
              La scheda
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Pubblicato">{formatDate(article.date)}</Row>
              <Row label="Rubrica">{rubrica.label}</Row>
              <Row label="Categorie">
                {article.categories.map((c) => c.name).join(", ")}
              </Row>
              <Row label="Lettura">{article.readingMinutes} min</Row>
              <Row label="Parole">{article.wordCount.toLocaleString("it-IT")}</Row>
              {article.galleryCount > 0 && (
                <Row label="Gallerie">{article.galleryCount}</Row>
              )}
              <Row label="Redazione">Artewiva</Row>
            </dl>
          </div>

          <div className="rounded-3xl bg-ink-950 p-6 text-white">
            <Kicker>Fonte originale</Kicker>
            <h2 className="mt-3 font-display text-lg leading-snug font-bold">
              Leggi l'articolo su artewiva.it
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Sulla pagina originale trovi fotografie ad alta risoluzione, gallerie
              complete e i commenti.
            </p>
            <Button href={article.link} className="mt-5 w-full">
              Apri l'originale →
            </Button>
          </div>

          {related.length > 0 && (
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-950/5">
              <h2 className="font-display text-sm font-bold tracking-wide text-ink-950">
                Altri articoli
              </h2>
              <ul className="mt-4 space-y-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <a href={`#/articoli/${item.slug}`} className="group flex gap-3">
                      <CoverImage
                        src={item.media.card}
                        alt={item.media.alt}
                        label=""
                        className="h-16 w-20 shrink-0 rounded-xl"
                      />
                      <span className="min-w-0">
                        <span className="line-clamp-2 block text-sm font-semibold leading-snug text-ink-950 group-hover:text-brand-600">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[11px] text-ink-900/45">
                          {formatDate(item.date)}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <CtaBand />
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink-950/5 pb-2 last:border-0 last:pb-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-900/40">
        {label}
      </dt>
      <dd className={cx("text-right text-ink-900/75")}>{children}</dd>
    </div>
  );
}

/**
 * Le gallerie fotografiche del sito originale sono generate lato server e non
 * sono esportabili via API: qui si rimanda alla pagina originale.
 */
function GalleryCallout({ article }: { article: NewsArticle }) {
  return (
    <div className="my-10 overflow-hidden rounded-3xl bg-ink-950 p-6 text-white sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="max-w-lg">
          <span className="text-2xl">📷</span>
          <h3 className="mt-3 font-display text-xl font-bold">
            Qui inizia il fotoreportage
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            La galleria fotografica di questo servizio è pubblicata sulla pagina
            originale Artewiva, con scatti in alta risoluzione.
          </p>
        </div>
        <Button href={article.link} variant="outline-light">
          Guarda le foto ↗
        </Button>
      </div>
    </div>
  );
}

function NotFound({ slug }: { slug: string }) {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-center justify-center px-5 pt-32 pb-20 text-center">
      <Kicker>Archivio</Kicker>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-ink-950">
        Articolo non trovato
      </h1>
      <p className="mt-3 text-sm text-ink-900/60">
        Nessun articolo corrisponde a <code className="rounded bg-sand-100 px-1.5 py-0.5">{slug}</code>.
        Potrebbe essere stato rimosso dal sito originale.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="#/articoli">Torna all'archivio</Button>
      </div>
    </main>
  );
}
