import { useState } from "react";
import { EVENTS, IMG } from "../data";
import { Button, PageHero, Reveal, SectionTitle } from "../components/ui";
import { ArticleCard } from "../components/ArticleCard";
import { ARTICLES, NEWS_ARCHIVE, formatDate } from "../data/news";
import { CtaBand } from "./Home";

/** Ultime pubblicazioni dell'archivio importato da www.artewiva.it. */
const LATEST = ARTICLES.slice(0, 6);

export default function Events() {
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);

  return (
    <main>
      <PageHero
        kicker="Eventi & News"
        title="Il diario visivo della scena palermitana."
        sub="Report a caldo, interviste, approfondimenti e il calendario degli eventi che stiamo per documentare."
        img={IMG.crowd4}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionTitle kicker="Agenda" title="Prossimi appuntamenti" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 70}>
              <div className="group flex items-center gap-5 rounded-3xl bg-white p-5 ring-1 ring-ink-950/5 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-ink-950 text-center text-white">
                  <div>
                    <p className="font-display text-xl leading-none font-extrabold text-brand-400">
                      {e.day}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold tracking-widest text-white/50">
                      {e.month}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ink-950">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-900/55">📍 {e.place}</p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                    {e.type}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
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
