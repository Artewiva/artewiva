import { useState } from "react";
import {
  formatDate,
  rubricaOf,
  type NewsArticle,
} from "../data/news";
import { cx, Reveal } from "./ui";

/**
 * Copertina con fallback: se l'immagine ospitata su artewiva.it non è
 * raggiungibile, al suo posto compare un riquadro brandizzato.
 */
export function CoverImage({
  src,
  alt,
  label,
  className,
  imgClassName,
}: {
  src: string | null;
  alt: string;
  label: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={cx(
          "grid place-items-center bg-gradient-to-br from-ink-950 via-ink-900 to-brand-700 px-6 text-center",
          className
        )}
      >
        <span className="font-display text-sm font-bold tracking-wide text-white/80">
          {label}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src ?? ""}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cx("object-cover", className, imgClassName)}
    />
  );
}

/** Etichetta della rubrica editoriale dell'articolo. */
export function RubricaTag({
  article,
  light = false,
}: {
  article: NewsArticle;
  light?: boolean;
}) {
  const rubrica = rubricaOf(article);
  return (
    <span
      className={cx(
        "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
        light
          ? "bg-brand-500 text-white"
          : "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
      )}
    >
      {rubrica.label}
    </span>
  );
}

export function ArticleCard({
  article,
  delay = 0,
  featured = false,
}: {
  article: NewsArticle;
  delay?: number;
  featured?: boolean;
}) {
  const rubrica = rubricaOf(article);
  const href = `#/articoli/${article.slug}`;

  if (featured) {
    return (
      <Reveal delay={delay}>
        <a
          href={href}
          className="group relative block overflow-hidden rounded-[2rem] bg-ink-950 ring-1 ring-ink-950/5 transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
            <CoverImage
              src={article.media.hero ?? article.media.card}
              alt={article.media.alt}
              label={article.title}
              className="h-full w-full transition duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <RubricaTag article={article} light />
              <span className="text-xs font-medium text-white/70">
                {formatDate(article.date)}
              </span>
              {article.galleryCount > 0 && (
                <span className="text-xs font-medium text-white/70">
                  · {article.galleryCount} fotogalleria
                  {article.galleryCount > 1 ? "e" : ""}
                </span>
              )}
            </div>
            <h3 className="mt-4 max-w-3xl font-display text-2xl leading-tight font-extrabold text-white sm:text-4xl">
              {article.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              {article.excerpt}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-400">
              Leggi l'articolo
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </a>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay}>
      <a
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-950/5 transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <CoverImage
            src={article.media.card}
            alt={article.media.alt}
            label={rubrica.label}
            className="h-full w-full transition duration-700 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3">
            <RubricaTag article={article} />
            <span className="text-xs text-ink-900/45">{formatDate(article.date)}</span>
          </div>
          <h3 className="mt-3 font-display text-lg leading-snug font-bold text-ink-950 group-hover:text-brand-600">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-900/55">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-ink-950/5 pt-3 text-[11px] font-semibold uppercase tracking-wider text-ink-900/40">
            <span>{article.readingMinutes} min di lettura</span>
            {article.galleryCount > 0 && <span>Fotoreport</span>}
          </div>
        </div>
      </a>
    </Reveal>
  );
}
