import { useMemo, useState } from "react";
import { IMG } from "../data";
import { Button, PageHero, Reveal, SectionTitle, cx } from "../components/ui";
import { ArticleCard } from "../components/ArticleCard";
import { EventCard } from "../components/EventCard";
import { ARTICLES, NEWS_ARCHIVE, formatDate } from "../data/news";
import {
  AGENDA_EVENTS,
  EVENT_CATEGORIES,
  EVENT_SOURCE,
  filterEvents,
  formatLongDate,
} from "../data/events";
import { CtaBand } from "./Home";

/** Ultime pubblicazioni dell'archivio importato da www.artewiva.it. */
const LATEST = ARTICLES.slice(0, 6);
const PAGE_SIZE = 12;

export default function Events() {
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);
  const [category, setCategory] = useState("Tutti");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => filterEvents(AGENDA_EVENTS, { query, category }),
    [query, category]
  );
  const shown = filtered.slice(0, visible);
  const categories = EVENT_CATEGORIES.filter((c) => c.count > 0);

  const resetVisible = () => setVisible(PAGE_SIZE);

  return (
    <main>
      <PageHero
        kicker="Eventi & News"
        title="L'agenda culturale di Palermo, in un unico posto."
        sub="Concerti, teatro, mostre, visite e sagre: gli eventi in città e provincia importati da Balarm.it, accanto ai nostri report e approfondimenti."
        img={IMG.crowd4}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            kicker="Agenda"
            title="Prossimi appuntamenti"
            sub={`${AGENDA_EVENTS.length} eventi in calendario tra oggi e le prossime settimane. Ogni scheda rimanda all'originale su Balarm.it per orari, biglietti e programma completo.`}
          />
          <a
            href={EVENT_SOURCE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Apri la fonte: Balarm.it ↗
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetVisible();
              }}
              placeholder="Cerca un evento, un luogo, una categoria…"
              aria-label="Cerca negli eventi"
              className="w-full rounded-full bg-white px-5 py-3.5 text-sm text-ink-950 ring-1 ring-ink-950/10 outline-none placeholder:text-ink-900/40 focus:ring-brand-500 sm:max-w-md"
            />
            <p className="shrink-0 text-sm text-ink-900/50">
              {filtered.length} {filtered.length === 1 ? "evento trovato" : "eventi trovati"}
            </p>
          </div>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {["Tutti", ...categories.map((c) => c.name)].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setCategory(name);
                  resetVisible();
                }}
                className={cx(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition",
                  category === name
                    ? "bg-ink-950 text-white"
                    : "bg-white text-ink-900/65 ring-1 ring-ink-950/10 hover:ring-brand-500"
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((event, i) => (
                <Reveal key={event.id} delay={(i % 3) * 60}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
            {visible < filtered.length && (
              <div className="mt-9 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                >
                  Mostra altri eventi ({filtered.length - visible}) ↓
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center ring-1 ring-ink-950/5">
            <p className="font-display text-lg font-bold text-ink-950">
              Nessun evento trovato
            </p>
            <p className="mt-2 text-sm text-ink-900/55">
              Prova con un'altra parola chiave oppure rimetti tutte le categorie.
            </p>
            <Button
              variant="ghost"
              className="mt-6"
              onClick={() => {
                setQuery("");
                setCategory("Tutti");
                resetVisible();
              }}
            >
              Azzera i filtri
            </Button>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-5 rounded-3xl bg-ink-950 p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="font-display text-xl font-bold">Agenda a cura di Balarm.it</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
              Titoli, date e luoghi sono importati dalle pagine degli eventi di
              Palermo e provincia. Non ripubblichiamo testi o immagini della
              fonte: per dettagli, orari e prenotazioni apri la scheda originale.
            </p>
            <p className="mt-3 text-xs text-white/40">
              Snapshot del {formatLongDate(EVENT_SOURCE.generatedAt)} ·{" "}
              {EVENT_SOURCE.count} eventi importati ·{" "}
              {AGENDA_EVENTS.length} ancora in calendario
            </p>
          </div>
          <a
            href={EVENT_SOURCE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Vai su Balarm.it ↗
          </a>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              kicker="Dal blog"
              title="Ultime pubblicazioni"
              sub={`Articoli importati da www.artewiva.it: ${NEWS_ARCHIVE.count} pubblicazioni dal ${formatDate(NEWS_ARCHIVE.oldest)} a oggi, con testo e copertine originali.`}
            />
            <Button href="#/articoli" variant="ghost">
              Vai all'archivio completo →
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LATEST.map((article, i) => (
              <ArticleCard key={article.id} article={article} delay={(i % 3) * 60} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-[2rem] bg-ink-950 p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <SectionTitle
                light
                kicker="Newsletter"
                title="Non perderti il prossimo live."
                sub="Una mail al mese con i nuovi report, le gallerie appena pubblicate e gli eventi da segnare in agenda."
              />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSub(true);
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                className="w-full rounded-full bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/40 ring-1 ring-white/15 outline-none focus:ring-brand-500"
              />
              <Button type="submit" size="lg" className="shrink-0">
                {sub ? "Iscritto ✓" : "Iscriviti"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
