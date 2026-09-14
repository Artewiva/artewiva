import React, { useEffect, useMemo, useState } from "react";
import { ArticleCard, CoverImage } from "../components/ArticleCard";
import { Button, Kicker, PageHero, cx } from "../components/ui";
import { IMG } from "../data";
import {
  ARTICLES,
  NEWS,
  NEWS_ARCHIVE,
  RUBRICHE,
  YEARS,
  filterArticles,
  formatDate,
  getRubrica,
  matchesRubrica,
  sortArticles,
  type SortKey,
} from "../data/news";
import { CtaBand } from "./Home";

const PAGE_SIZE = 9;

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recenti", label: "Più recenti" },
  { key: "meno-recenti", label: "Meno recenti" },
  { key: "lettura", label: "Più lunghi" },
];

export default function Articles() {
  const [query, setQuery] = useState("");
  const [rubrica, setRubrica] = useState("tutte");
  const [year, setYear] = useState("tutti");
  const [sort, setSort] = useState<SortKey>("recenti");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(
    () => sortArticles(filterArticles({ rubrica, year, query }), sort),
    [rubrica, year, query, sort]
  );

  // Ogni cambio di filtro riparte dalla prima pagina di risultati.
  useEffect(() => setVisible(PAGE_SIZE), [rubrica, year, query, sort]);

  const isDefaultView =
    rubrica === "tutte" && year === "tutti" && sort === "recenti" && query.trim().length < 2;

  const [featured, ...rest] = results;
  const gridItems = isDefaultView ? rest.slice(0, visible - 1) : results.slice(0, visible);
  const remaining = (isDefaultView ? results.length - 1 : results.length) - gridItems.length;

  const activeRubrica = getRubrica(rubrica);
  const heroImage =
    ARTICLES[0]?.media.hero ?? ARTICLES[0]?.media.card ?? IMG.crowd4;

  const counters = [
    { value: String(NEWS_ARCHIVE.count), label: "Articoli importati" },
    {
      value: `${NEWS_ARCHIVE.oldest.slice(0, 4)}–${NEWS_ARCHIVE.newest.slice(0, 4)}`,
      label: "Anni coperti",
    },
    { value: String(NEWS_ARCHIVE.withGallery), label: "Foto reportage" },
    { value: String(RUBRICHE.length), label: "Rubriche" },
  ];

  return (
    <main>
      <PageHero
        kicker="Articoli · Archivio"
        title="Tutto quello che abbiamo raccontato, dal 2017 a oggi."
        sub="Gli articoli pubblicati su www.artewiva.it, importati in questo sito con testo, copertine e date originali. Cerca, filtra per rubrica o per anno e leggi senza lasciare la pagina."
        img={heroImage}
      />

      {/* Numeri dell'archivio */}
      <section className="mx-auto -mt-10 max-w-6xl px-5">
        <div className="grid gap-3 rounded-3xl bg-white p-5 shadow-[0_24px_60px_-40px_rgba(12,11,15,0.6)] ring-1 ring-ink-950/5 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((c) => (
            <div key={c.label} className="rounded-2xl bg-sand-50 px-5 py-4">
              <p className="font-display text-2xl font-extrabold text-ink-950">{c.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-900/45">
                {c.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 px-2 text-xs text-ink-900/50">
          Archivio sincronizzato con{" "}
          <a
            href={NEWS.source}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-brand-600 hover:underline"
          >
            www.artewiva.it
          </a>{" "}
          il {formatDate(NEWS.generatedAt.slice(0, 10))}
          {NEWS.archiveTotal > NEWS.count
            ? ` · oltre ${(NEWS.archiveTotal - (NEWS.archiveTotal % 100)).toLocaleString("it-IT")} contenuti nell'archivio originale`
            : ""}
          .
        </p>
      </section>

      {/* Ricerca e filtri */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <div className="rounded-3xl bg-white p-5 ring-1 ring-ink-950/5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Cerca negli articoli</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca per titolo, artista, luogo…"
                className="w-full rounded-full bg-sand-50 px-5 py-3 pr-11 text-sm text-ink-950 ring-1 ring-ink-950/10 outline-none transition placeholder:text-ink-900/35 focus:ring-2 focus:ring-brand-500"
              />
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink-900/30">
                ⌕
              </span>
            </label>

            <div className="flex flex-wrap gap-3">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="rounded-full bg-sand-50 px-4 py-3 text-sm font-medium text-ink-950 ring-1 ring-ink-950/10 outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="tutti">Tutti gli anni</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full bg-sand-50 px-4 py-3 text-sm font-medium text-ink-950 ring-1 ring-ink-950/10 outline-none focus:ring-2 focus:ring-brand-500"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <FilterChip active={rubrica === "tutte"} onClick={() => setRubrica("tutte")}>
              Tutte le rubriche
            </FilterChip>
            {RUBRICHE.map((r) => {
              const count = ARTICLES.filter((a) => matchesRubrica(a, r)).length;
              if (count === 0) return null;
              return (
                <FilterChip
                  key={r.slug}
                  active={rubrica === r.slug}
                  onClick={() => setRubrica(rubrica === r.slug ? "tutte" : r.slug)}
                >
                  {r.label}
                  <span className="ml-1.5 text-ink-900/35">{count}</span>
                </FilterChip>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker>{activeRubrica ? activeRubrica.label : "Archivio completo"}</Kicker>
            <p className="mt-3 font-display text-xl font-bold text-ink-950">
              {results.length === 1 ? "1 articolo" : `${results.length} articoli`}
              {activeRubrica && (
                <span className="ml-2 text-sm font-medium text-ink-900/45">
                  — {activeRubrica.blurb}
                </span>
              )}
            </p>
          </div>
          {(rubrica !== "tutte" || year !== "tutti" || query.trim().length >= 2) && (
            <button
              onClick={() => {
                setRubrica("tutte");
                setYear("tutti");
                setQuery("");
                setSort("recenti");
              }}
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Azzera i filtri
            </button>
          )}
        </div>
      </section>

      {/* Risultati */}
      <section className="mx-auto max-w-6xl px-5 pt-8 pb-16 sm:pb-20">
        {results.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-ink-950/5">
            <p className="font-display text-xl font-bold text-ink-950">
              Nessun articolo trovato
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-900/55">
              Prova con un altro termine, oppure sfoglia l'archivio completo sul sito
              originale.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => {
                  setQuery("");
                  setRubrica("tutte");
                  setYear("tutti");
                }}
              >
                Azzera i filtri
              </Button>
              <Button href={NEWS.source} variant="ghost">
                Vai su artewiva.it
              </Button>
            </div>
          </div>
        ) : (
          <>
            {isDefaultView && featured && (
              <div className="mb-6">
                <ArticleCard article={featured} featured />
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gridItems.map((article, i) => (
                <ArticleCard key={article.id} article={article} delay={(i % 3) * 70} />
              ))}
            </div>

            {remaining > 0 && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <Button size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  Mostra altri {Math.min(PAGE_SIZE, remaining)} articoli
                </Button>
                <p className="text-xs text-ink-900/45">
                  {gridItems.length + (isDefaultView ? 1 : 0)} di {results.length} in
                  visualizzazione
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Nota di provenienza + rimando al sito originale */}
      <section className="px-3 pb-4 sm:px-5">
        <div className="mx-auto grid max-w-6xl gap-4 overflow-hidden rounded-[2.5rem] bg-ink-950 p-7 text-white sm:p-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Kicker>Provenienza dei contenuti</Kicker>
            <h2 className="mt-4 font-display text-2xl leading-tight font-extrabold sm:text-3xl">
              Questo archivio è alimentato dal sito ufficiale Artewiva.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
              Titoli, testi, date e fotografie provengono da www.artewiva.it e sono
              aggiornati automaticamente tramite la pipeline di import del progetto
              (script <code className="rounded bg-white/10 px-1.5 py-0.5">import-artewiva.mjs</code>).
              Per commenti, gallerie fotografiche complete e contenuti storici fai
              riferimento al sito originale.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={NEWS.source} variant="primary">
                Sfoglia artewiva.it
              </Button>
              <Button href="#/eventi" variant="outline-light">
                Eventi e agenda
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-white/10">
            <CoverImage
              src={featured?.media.card ?? null}
              alt={featured?.media.alt ?? ""}
              label="Artewiva"
              className="h-full min-h-[220px] w-full"
            />
          </div>
        </div>
      </section>

      <div className="pt-12">
        <CtaBand />
      </div>
    </main>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-ink-950 text-white shadow-[0_10px_24px_-14px_rgba(12,11,15,0.9)]"
          : "bg-sand-50 text-ink-900/70 ring-1 ring-ink-950/10 hover:bg-sand-100 hover:text-ink-950"
      )}
    >
      {children}
    </button>
  );
}


