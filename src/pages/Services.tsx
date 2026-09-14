import { useState } from "react";
import { AUDIO_SERVICE, IMG, PROJECTS, SERVICES } from "../data";
import { Button, PageHero, Reveal, SectionTitle, cx } from "../components/ui";
import { CtaBand } from "./Home";
import AudioService from "./AudioService";

const PROCESS = [
  { n: "01", t: "Briefing", d: "Ci racconti evento, obiettivi e tempi. Definiamo insieme il taglio narrativo." },
  { n: "02", t: "Sopralluogo", d: "Verifichiamo luci, spazi e accrediti. Nessuna sorpresa la sera del live." },
  { n: "03", t: "Shooting", d: "Foto e video sul campo, in autonomia e senza disturbare lo spettacolo." },
  { n: "04", t: "Consegna", d: "Selezione editata in galleria privata, più catalogazione in archivio." },
];

export default function Services() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <main>
      <PageHero
        kicker="Servizi & Progetti"
        title="Foto, video e parole al servizio della scena artistica."
        sub="Sei aree di attività per documentare, raccontare e archiviare eventi culturali con qualità professionale."
        img={IMG.crowd1}
      />

      {/* Service Audio — servizio in evidenza */}
      <section className="mx-auto max-w-6xl px-5 pt-20 sm:pt-24">
        <Reveal>
          <a
            href={`#/servizi/${AUDIO_SERVICE.slug}`}
            className="group grid overflow-hidden rounded-[2rem] bg-ink-950 text-white shadow-[0_40px_80px_-45px_rgba(12,11,15,0.9)] transition hover:-translate-y-1 lg:grid-cols-[1.3fr_1fr]"
          >
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-xl">
                  🔊
                </span>
                <span className="text-[11px] font-semibold tracking-[0.22em] text-brand-400 uppercase">
                  In evidenza · Nuovo
                </span>
              </div>
              <h2 className="mt-6 font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
                {AUDIO_SERVICE.title}
              </h2>
              <p className="mt-2 font-display text-base font-semibold text-white/85 sm:text-lg">
                {AUDIO_SERVICE.subtitle}
              </p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-[15px]">
                {AUDIO_SERVICE.short} Un impianto su misura, un tecnico sul
                campo e un preventivo chiaro: professionalità e qualità del
                suono, proporzionate all'evento.
              </p>
              <ul className="mt-5 space-y-2">
                {AUDIO_SERVICE.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-[13px] text-white/55">
                    <span className="text-brand-500">•</span>
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition group-hover:gap-3">
                Scopri il service audio
                <span aria-hidden="true">→</span>
              </span>
            </div>
            <div className="relative min-h-52 overflow-hidden lg:min-h-full">
              <img
                src={AUDIO_SERVICE.card}
                alt="Tecnico audio al mixer durante la gestione del suono di un evento dal vivo"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/25 to-transparent" />
            </div>
          </a>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <a
                href={`#/servizi/${s.slug}`}
                onMouseEnter={() => setHover(s.slug)}
                onMouseLeave={() => setHover(null)}
                className="group flex h-full overflow-hidden rounded-3xl bg-white ring-1 ring-ink-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(12,11,15,0.6)]"
              >
                <div className="relative hidden w-40 shrink-0 overflow-hidden sm:block">
                  <img
                    src={s.hero}
                    alt=""
                    className={cx(
                      "h-full w-full object-cover transition-transform duration-700",
                      hover === s.slug && "scale-110"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                </div>
                <div className="flex flex-col p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg ring-1 ring-brand-100">
                      {s.icon}
                    </span>
                    <h2 className="font-display text-lg font-bold text-ink-950">
                      {s.title}
                    </h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-900/60">
                    {s.short}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[13px] text-ink-900/55">
                        <span className="text-brand-500">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-6 text-sm font-semibold text-brand-600">
                    Scheda servizio →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            align="center"
            kicker="Metodo"
            title="Come lavoriamo"
            sub="Un processo semplice e trasparente, dalla prima mail alla consegna dell'archivio."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="h-full rounded-3xl border border-dashed border-ink-950/10 p-7">
                  <span className="font-display text-sm font-bold tracking-widest text-brand-500">
                    {p.n}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink-950">
                    {p.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionTitle kicker="Portfolio" title="Progetti realizzati" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="group overflow-hidden rounded-3xl bg-white ring-1 ring-ink-950/5">
                <div className="h-52 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink-950">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
                    {p.desc}
                  </p>
                  <p className="mt-3 text-xs text-ink-900/40">📍 {p.place}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

export function ServiceDetail({ slug }: { slug: string }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Il service audio ha una pagina dedicata, più completa della scheda generica.
  if (slug === "service-audio") {
    return <AudioService />;
  }

  const s = SERVICES.find((x) => x.slug === slug);

  if (!s) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-48 text-center">
        <h1 className="font-display text-3xl font-bold">Servizio non trovato</h1>
        <Button href="#/servizi" className="mt-6">
          Torna ai servizi
        </Button>
      </main>
    );
  }

  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <main>
      <PageHero kicker="Scheda servizio" title={s.title} sub={s.intro} img={s.hero} />

      <div className="mx-auto max-w-6xl px-5 py-5">
        <a
          href="#/servizi"
          className="inline-flex items-center gap-2 pt-8 text-sm font-semibold text-ink-900/50 transition hover:text-brand-600"
        >
          ← Tutti i servizi
        </a>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <div className="space-y-5 text-[15px] leading-relaxed text-ink-900/70">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h3 className="mt-12 font-display text-xl font-bold text-ink-950">
              Cosa include
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 rounded-2xl bg-white p-4 text-sm text-ink-900/70 ring-1 ring-ink-950/5"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-display text-xl font-bold text-ink-950">
              Galleria
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {s.gallery.map((g, i) => (
                <button
                  key={g + i}
                  onClick={() => setLightbox(g)}
                  className={cx(
                    "group overflow-hidden rounded-2xl",
                    i === 0 && "col-span-2 row-span-2 sm:col-span-2"
                  )}
                >
                  <img
                    src={g}
                    alt=""
                    className={cx(
                      "w-full object-cover transition duration-700 group-hover:scale-110",
                      i === 0 ? "h-56 sm:h-72" : "h-28 sm:h-[8.75rem]"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-ink-950 p-7 text-white">
              <h3 className="font-display text-lg font-bold">Scheda tecnica</h3>
              <dl className="mt-6 space-y-4">
                {s.specs.map((sp) => (
                  <div
                    key={sp.label}
                    className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="text-xs uppercase tracking-wider text-white/45">
                      {sp.label}
                    </dt>
                    <dd className="text-right text-sm font-semibold">{sp.value}</dd>
                  </div>
                ))}
              </dl>
              <Button href="#/contatti" className="mt-7 w-full" size="lg">
                Richiedi un preventivo
              </Button>
              <a
                href="#/contatti"
                className="mt-3 block rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white/70 transition hover:bg-white/10"
              >
                ⬇ Scarica la brochure (PDF)
              </a>
            </div>

            <div className="mt-6 rounded-3xl bg-white p-7 ring-1 ring-ink-950/5">
              <h4 className="font-display text-base font-bold text-ink-950">
                Altri servizi
              </h4>
              <ul className="mt-4 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <a
                      href={`#/servizi/${o.slug}`}
                      className="flex items-center gap-3 text-sm text-ink-900/65 transition hover:text-brand-600"
                    >
                      <span>{o.icon}</span>
                      {o.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/90 p-5 backdrop-blur"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-h-[85vh] w-auto max-w-5xl rounded-2xl object-contain"
          />
          <button className="mt-5 text-sm font-semibold text-white/70">
            Chiudi ✕
          </button>
        </div>
      )}

      <CtaBand />
    </main>
  );
}
