import { useEffect, useState } from "react";
import {
  EVENTS,
  HERO_SLIDES,
  IMG,
  PROJECTS,
  SERVICES,
  STATS,
} from "../data";
import { Button, Kicker, Reveal, SectionTitle, cx } from "../components/ui";
import { CoverImage, RubricaTag } from "../components/ArticleCard";
import { ARTICLES, NEWS_ARCHIVE, formatDate } from "../data/news";

/** Ultimi articoli importati da www.artewiva.it. */
const LATEST_ARTICLES = ARTICLES.slice(0, 3);

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const slide = HERO_SLIDES[i];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink-950">
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.img}
          className={cx(
            "absolute inset-0 transition-opacity duration-1000",
            idx === i ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={s.img}
            alt={s.caption}
            className={cx(
              "h-full w-full object-cover",
              idx === i && "aw-kenburns"
            )}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-36 sm:pb-24">
        <div className="max-w-3xl">
          <Kicker>Portale d'arte · Palermo</Kicker>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Diamo luce al
            <span className="relative mx-2 inline-block bg-brand-500 px-3 py-0.5 text-white shadow-[0_18px_40px_-16px_rgba(227,6,19,0.9)]">
              fermento
            </span>
            artistico della città.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            ArteWiva è il database fotografico e video della musica live e
            dell'arte a Palermo: contenuti professionali, consultabili sempre e
            dovunque, per lasciare una memoria di ciò che accade oggi sui palchi.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#/servizi" size="lg">
              Scopri i progetti →
            </Button>
            <Button href="#/contatti" size="lg" variant="outline-light">
              Contattaci
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-400">
              {slide.kicker}
            </p>
            <p className="mt-1 max-w-sm text-sm text-white/55">{slide.caption}</p>
          </div>
          <div className="flex gap-2">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.img}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={cx(
                  "h-1 rounded-full transition-all duration-500",
                  idx === i ? "w-12 bg-brand-500" : "w-6 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Musica Live",
    "Reportage",
    "Teatro",
    "Danza",
    "Archivio",
    "Interviste",
    "Festival",
    "Videomaking",
  ];
  return (
    <div className="overflow-hidden border-y border-ink-950/5 bg-ink-950 py-4">
      <div className="aw-marquee flex w-max gap-10 pr-10">
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-sm font-semibold uppercase tracking-[0.3em] text-white/45"
          >
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(12,11,15,0.5)]">
              <img
                src={IMG.photographer}
                alt="Fotografo al lavoro durante un concerto"
                className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[520px]"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 hidden w-56 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-ink-950/5 sm:block lg:-right-10">
              <p className="font-display text-4xl font-extrabold text-brand-500">
                10
              </p>
              <p className="mt-1 text-sm leading-snug text-ink-900/60">
                anni a documentare la scena artistica palermitana
              </p>
            </div>
            <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-brand-100 blur-2xl" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionTitle
            kicker="Chi siamo"
            title={
              <>
                Un archivio vivo dell'arte,{" "}
                <span className="text-brand-500">non un semplice blog.</span>
              </>
            }
            sub="Artewiva.it si occupa di arte e in particolare di musica live: al suo interno contenuti fotografici e video di qualità professionale, curati da Massimo Torcivia."
          />
          <ul className="mt-8 space-y-4">
            {[
              "Uno spazio dedicato a report, interviste ed eventi del mondo dello spettacolo.",
              "Contenuti sempre consultabili: una memoria fotografica e video liberamente accessibile.",
              "Redazione indipendente: nessun finanziamento, nessun condizionamento editoriale.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
                  ✓
                </span>
                <span className="text-[15px] leading-relaxed text-ink-900/75">
                  {t}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#/chi-siamo" variant="dark" size="lg">
              La nostra storia
            </Button>
            <Button href="#/eventi" variant="ghost" size="lg">
              Leggi il blog
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-4 sm:mt-24 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-ink-950/5 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-ink-900/50">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            kicker="Aree di attività"
            title="Cosa facciamo, in concreto"
            sub="Foto, video, parole e archivio: quattro strumenti per raccontare un unico mondo."
          />
          <Button href="#/servizi" variant="ghost">
            Tutti i servizi →
          </Button>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <a
                href={`#/servizi/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl bg-sand-50 p-7 ring-1 ring-ink-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-ink-950 hover:shadow-[0_30px_60px_-30px_rgba(12,11,15,0.6)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-ink-950/5 transition group-hover:bg-brand-500">
                  {s.icon}
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-ink-950 transition group-hover:text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-900/60 transition group-hover:text-white/60">
                  {s.short}
                </p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-[13px] text-ink-900/55 transition group-hover:text-white/50"
                    >
                      <span className="text-brand-500">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-7 text-sm font-semibold text-brand-600 transition group-hover:text-brand-400">
                  Approfondisci →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const cats = ["Tutti", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [cat, setCat] = useState("Tutti");
  const list = cat === "Tutti" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-ink-950/20 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle
          light
          kicker="Portfolio"
          title="Progetti ed eventi in evidenza"
          sub="Una selezione dei lavori che raccontano meglio il nostro modo di guardare il palco."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cx(
                "rounded-full px-4 py-2 text-xs font-semibold transition",
                c === cat
                  ? "bg-brand-500 text-white"
                  : "bg-white/5 text-white/60 ring-1 ring-white/10 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="group relative h-80 overflow-hidden rounded-3xl ring-1 ring-white/10">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                    {p.category} <span className="text-white/30">·</span> {p.year}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/50">{p.place}</p>
                  <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {p.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsNews() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <SectionTitle
            kicker="Dall'archivio"
            title="Ultimi articoli pubblicati"
            sub={`${NEWS_ARCHIVE.count} articoli importati da www.artewiva.it: reportage, interviste e recensioni con testo e copertine originali.`}
          />
          <div className="mt-10 space-y-5">
            {LATEST_ARTICLES.map((article, i) => (
              <Reveal key={article.id} delay={i * 80}>
                <a
                  href={`#/articoli/${article.slug}`}
                  className="group flex flex-col gap-5 rounded-3xl bg-white p-4 ring-1 ring-ink-950/5 transition hover:-translate-y-1 hover:shadow-xl sm:flex-row"
                >
                  <div className="h-44 w-full shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-48">
                    <CoverImage
                      src={article.media.card}
                      alt={article.media.alt}
                      label={article.title}
                      className="h-full w-full transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center pb-3 pr-2 sm:py-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <RubricaTag article={article} />
                      <span className="text-xs text-ink-900/45">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="mt-2.5 font-display text-lg leading-snug font-bold text-ink-950 group-hover:text-brand-600">
                      {article.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-900/55">
                      {article.excerpt}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Button href="#/articoli" variant="ghost">
              Tutti i {NEWS_ARCHIVE.count} articoli →
            </Button>
          </div>
        </div>

        <Reveal delay={120}>
          <div className="sticky top-28 rounded-3xl bg-ink-950 p-7 text-white">
            <Kicker>In agenda</Kicker>
            <h3 className="mt-4 font-display text-2xl font-bold">
              Prossimi eventi
            </h3>
            <p className="mt-2 text-sm text-white/55">
              Dove saremo con macchine e taccuini.
            </p>
            <ul className="mt-7 space-y-5">
              {EVENTS.map((e) => (
                <li key={e.title} className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-center ring-1 ring-brand-500/30">
                    <div>
                      <p className="font-display text-lg leading-none font-bold text-brand-400">
                        {e.day}
                      </p>
                      <p className="text-[10px] font-semibold tracking-widest text-white/50">
                        {e.month}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-snug">{e.title}</p>
                    <p className="mt-1 text-xs text-white/45">{e.place}</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-brand-400">
                      {e.type}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Button href="#/eventi" className="mt-7 w-full">
              Vedi tutti gli eventi
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="px-3 pb-16 sm:px-5">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-500 to-ink-950 px-7 py-16 text-center sm:px-14 sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-ink-950/20 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
            Hai un evento da raccontare?
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight font-extrabold text-white sm:text-5xl">
            Trasformiamo la tua serata in memoria visiva.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/85">
            Raccontaci il progetto: ti rispondiamo entro 24 ore con una proposta
            su misura per foto, video e archivio.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="#/contatti" size="lg" variant="ghost">
              Richiedi informazioni
            </Button>
            <Button href="#/servizi" size="lg" variant="outline-light">
              Esplora i servizi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Portfolio />
      <EventsNews />
      <CtaBand />
    </main>
  );
}
