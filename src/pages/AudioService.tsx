import { useEffect } from "react";
import { AUDIO_SERVICE as A, CONTACT } from "../data";
import { Button, Kicker, Reveal, SectionTitle, cx } from "../components/ui";

/* -------------------------------------------------------------------------- */
/*  Icone (SVG inline, tratto sottile — stile tecnico ma elegante)            */
/* -------------------------------------------------------------------------- */

const ICON_STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "speaker":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...ICON_STROKE}>
          <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.5" />
          <circle cx="12" cy="14.6" r="3.1" />
          <circle cx="12" cy="7.2" r="1.3" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...ICON_STROKE}>
          <path d="M12 2.75a3.1 3.1 0 0 1 3.1 3.1v5.05a3.1 3.1 0 0 1-6.2 0V5.85A3.1 3.1 0 0 1 12 2.75Z" />
          <path d="M6.4 10.9a5.6 5.6 0 0 0 11.2 0" />
          <path d="M12 16.5v4.75" />
          <path d="M8.75 21.25h6.5" />
        </svg>
      );
    case "mixer":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...ICON_STROKE}>
          <path d="M5.5 3.25v17.5" />
          <path d="M12 3.25v17.5" />
          <path d="M18.5 3.25v17.5" />
          <circle cx="5.5" cy="14.5" r="1.9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7.75" r="1.9" fill="currentColor" stroke="none" />
          <circle cx="18.5" cy="16.25" r="1.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "monitor":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...ICON_STROKE}>
          <path d="M4.5 17h15l-2.1-6.9a1.9 1.9 0 0 0-1.8-1.35H8.4a1.9 1.9 0 0 0-1.8 1.35Z" />
          <circle cx="12" cy="13.9" r="2.1" />
          <circle cx="12" cy="10.9" r="0.95" />
        </svg>
      );
    case "drum":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...ICON_STROKE}>
          <ellipse cx="12" cy="9.4" rx="6.8" ry="2.5" />
          <path d="M5.2 9.4v5.4c0 1.4 3 2.55 6.8 2.55s6.8-1.15 6.8-2.55V9.4" />
          <path d="m4 4.2 5.4 3.6" />
          <path d="m20 4.2-5.4 3.6" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...ICON_STROKE}>
          <circle cx="12" cy="12" r="8.4" />
          <path d="m8.4 12.3 2.5 2.5 4.9-5.4" />
        </svg>
      );
    default:
      return null;
  }
}

/* Decorazione: mini equalizzatore animato */
function Equalizer({ className }: { className?: string }) {
  const bars = [0.55, 0.9, 0.4, 1, 0.65, 0.85, 0.45];
  return (
    <div className={cx("aw-eq flex h-6 items-end gap-1", className)} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.13}s` }}
        />
      ))}
    </div>
  );
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* -------------------------------------------------------------------------- */
/*  SEO per-pagina: title, meta description e dati strutturati JSON-LD        */
/* -------------------------------------------------------------------------- */

const SEO_TITLE = "Service Audio per Eventi e Musica Live a Palermo | ArteWiva";
const SEO_DESC =
  "Service audio a Palermo per eventi e musica live: impianti audio per piccoli e medi eventi, service per band, DJ set, eventi privati e aziendali. Amplificazione eventi, microfonazione, sound check e mixaggio live con tecnico sul campo.";

function useAudioSeo() {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? null;

    document.title = SEO_TITLE;
    metaDesc?.setAttribute("content", SEO_DESC);

    const script = document.createElement("script");
    script.id = "aw-audio-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: A.title,
      serviceType: "Service audio per eventi, concerti e musica live",
      description: SEO_DESC,
      url: "https://www.artewiva.it/#/servizi/service-audio",
      provider: {
        "@type": "Organization",
        name: "ArteWiva",
        url: "https://www.artewiva.it/",
        email: CONTACT.email,
      },
      areaServed: { "@type": "City", name: "Palermo" },
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (prevDesc !== null && metaDesc) metaDesc.setAttribute("content", prevDesc);
      document.getElementById("aw-audio-jsonld")?.remove();
    };
  }, []);
}

/* -------------------------------------------------------------------------- */
/*  Pagina                                                                    */
/* -------------------------------------------------------------------------- */

export default function AudioService() {
  useAudioSeo();

  return (
    <main>
      {/* ------------------------------ HERO ------------------------------ */}
      <header className="relative overflow-hidden bg-ink-950 pt-32 pb-20 sm:pt-40 sm:pb-24">
        <img
          src={A.hero}
          alt="Tecnico audio al lavoro sul mixer durante un evento dal vivo"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/40" />

        <div className="relative mx-auto max-w-6xl px-5">
          <div className="flex items-center gap-3">
            <Equalizer />
            <Kicker>Service audio · Palermo e Sicilia</Kicker>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Service Audio per Eventi{" "}
            <span className="text-brand-500">e Musica Live</span>
          </h1>

          <p className="mt-5 max-w-2xl font-display text-lg font-semibold text-white/90 sm:text-2xl">
            {A.subtitle}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Amplificazione audio per concerti, band, DJ set, eventi privati e
            aziendali: attrezzatura professionale, esperienza tecnica e una
            gestione attenta del suono — senza sovradimensionare l'impianto.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#/contatti" size="lg">
              {A.cta.button} →
            </Button>
            <Button variant="outline-light" size="lg" onClick={() => scrollTo("cosa-posso-fornire")}>
              Cosa posso fornire
            </Button>
          </div>

          <p className="mt-7 text-[13px] leading-relaxed text-white/50">
            Concerti e musica live · Band e gruppi musicali · DJ set · Eventi
            privati e aziendali · Presentazioni e manifestazioni
          </p>
        </div>
      </header>

      {/* ---------------------------- INTRODUZIONE ---------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal>
            <Kicker>Il servizio</Kicker>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight text-ink-950 sm:text-4xl">
              Un service audio agile, professionale,{" "}
              <span className="text-brand-600">proporzionato all'evento.</span>
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-900/70 sm:text-base">
              <p>{A.intro[0]}</p>
              <p className="font-semibold text-ink-950">{A.intro[1]}</p>
              <p>
                Niente palchi giganteschi, torri di diffusori o produzioni
                complicate: un service audio per piccoli e medi eventi pensato
                per chi fa musica e cultura sul campo — band, DJ, associazioni,
                aziende e privati — con la qualità di un impianto curato e i
                costi di una produzione sensata.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {A.introPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-ink-900/75 sm:text-[15px]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="hidden lg:block">
            <div className="relative">
              <img
                src={A.img.mixerEvent}
                alt="Tecnico audio che gestisce il mixaggio live durante un evento"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-[0_40px_80px_-50px_rgba(12,11,15,0.8)]"
                loading="lazy"
              />
              <img
                src={A.img.speakerStand}
                alt="Diffusore professionale su stativo per impianto audio eventi"
                className="absolute -bottom-8 -left-10 hidden w-48 rounded-2xl object-cover shadow-[0_30px_60px_-35px_rgba(12,11,15,0.9)] xl:block"
                loading="lazy"
              />
              <div className="absolute -top-5 -right-5 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-ink-950/5">
                <p className="font-display text-xs font-bold tracking-wide text-ink-950">
                  Piccoli & medi eventi
                </p>
                <p className="mt-1 text-[11px] text-ink-900/50">
                  Impianto dimensionato sull'evento
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Concetti chiave */}
        <div className="mt-16 flex flex-wrap gap-2.5 sm:mt-20">
          {A.concepts.map((c, i) => (
            <Reveal key={c} delay={i * 30}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-ink-900/70 ring-1 ring-ink-950/8 transition hover:ring-brand-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {c}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------- COSA POSSO FORNIRE ------------------------- */}
      <section id="cosa-posso-fornire" className="scroll-mt-28 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            align="center"
            kicker="Attrezzatura & servizi"
            title="Cosa posso fornire"
            sub="Tutto l'essenziale per amplificare e gestire il suono del tuo evento, senza eccessi e senza nulla trascurare."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {A.supply.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="group h-full rounded-3xl bg-sand-50 p-7 ring-1 ring-ink-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-ink-950 hover:shadow-[0_30px_60px_-30px_rgba(12,11,15,0.65)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-ink-950 shadow-sm ring-1 ring-ink-950/5 transition group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold text-ink-950 transition group-hover:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-900/60 transition group-hover:text-white/60">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Striscia fotografica dal campo */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {A.gallery.map((g, i) => (
              <Reveal key={g.img} delay={i * 60}>
                <figure className="overflow-hidden rounded-2xl">
                  <img
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    className="h-36 w-full object-cover transition duration-700 hover:scale-110 sm:h-44"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- PER QUALI EVENTI --------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionTitle
          kicker="Campi di applicazione"
          title="Per quali eventi"
          sub="Ogni occasione ha il suo suono: dall'amplificazione di un concerto alla diffusione sonora di una presentazione."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {A.eventTypes.map((e, i) => (
            <Reveal key={e.title} delay={i * 70}>
              <article className="group overflow-hidden rounded-3xl bg-white ring-1 ring-ink-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(12,11,15,0.6)]">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-lg shadow-sm backdrop-blur">
                    {e.emoji}
                  </span>
                  <h3 className="absolute bottom-4 left-4 right-4 font-display text-lg font-bold text-white">
                    {e.title}
                  </h3>
                </div>
                <p className="p-6 text-sm leading-relaxed text-ink-900/60">{e.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------- UN IMPIANTO SU MISURA ------------------------- */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-brand-500/15 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal>
              <Kicker>Un impianto su misura</Kicker>
              <h2 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                Non esiste un impianto uguale
                <br className="hidden sm:block" /> per ogni evento.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
                {A.tailoredText}
              </p>

              <p className="mt-8 text-[11px] font-semibold tracking-[0.22em] text-white/40 uppercase">
                La configurazione tiene conto di
              </p>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {A.factors.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <img
                  src={A.img.mixerBackstage}
                  alt="Tecnico audio alla console durante la gestione del suono di un evento"
                  className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-white/10"
                  loading="lazy"
                />
                <div className="absolute right-5 -bottom-6 left-5 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur sm:right-8 sm:-left-8">
                  <p className="text-sm leading-relaxed font-semibold text-ink-950">
                    Chiarezza, pressione sonora adeguata e affidabilità: i tre
                    pilastri di ogni buon impianto.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------ COME LAVORO ------------------------------ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            align="center"
            kicker="Metodo"
            title="Come lavoro"
            sub="Quattro passaggi semplici, per arrivare al giorno dell'evento senza sorprese."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {A.process.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="relative h-full rounded-3xl border border-dashed border-ink-950/12 p-7">
                  <span className="font-display text-sm font-bold tracking-widest text-brand-500">
                    {p.n}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink-950">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- NOTA TERRITORIO/SEO --------------------------- */}
      <section className="mx-auto max-w-3xl px-5 pb-4 text-center">
        <Kicker>Service audio Palermo e Sicilia</Kicker>
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
          {A.seoNote.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-900/65">
          {A.seoNote.text}
        </p>
      </section>

      {/* --------------------------------- CTA --------------------------------- */}
      <section className="px-3 py-16 sm:px-5 sm:py-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-500 to-ink-950 px-7 py-16 text-center sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-ink-950/20 blur-3xl" />
          <div className="relative">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-white/80 uppercase">
              Service audio per eventi e musica live
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight font-extrabold text-white sm:text-5xl">
              Far suonare bene il tuo evento, qui comincia.
            </h2>
            <div className="mt-9">
              <Button href="#/contatti" size="lg" variant="ghost" className="text-[15px] font-bold tracking-wide">
                {A.cta.button}
              </Button>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/85">
              {A.cta.text}
            </p>
            <p className="mt-4 text-sm text-white/60">
              Oppure scrivi direttamente a{" "}
              <a
                href={`mailto:${CONTACT.email}?subject=Richiesta%20preventivo%20service%20audio`}
                className="font-semibold text-white underline underline-offset-4 transition hover:text-white/80"
              >
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Teaser riutilizzabile (Home + pagine servizi)                             */
/* -------------------------------------------------------------------------- */

export function AudioTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 sm:pb-20">
      <Reveal>
        <a
          href="#/servizi/service-audio"
          className="group grid overflow-hidden rounded-[2.5rem] bg-ink-950 text-white shadow-[0_40px_80px_-45px_rgba(12,11,15,0.9)] ring-1 ring-ink-950/5 transition hover:-translate-y-1 md:grid-cols-[1.25fr_1fr]"
        >
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <Equalizer />
              <span className="text-[11px] font-semibold tracking-[0.22em] text-brand-400 uppercase">
                Service Audio
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
              Audio professionale, dimensionato per il tuo evento.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-[15px]">
              Amplificazione, microfonazione, sound check e mixaggio live per
              concerti, band, DJ set, eventi privati e aziendali di piccole e
              medie dimensioni. Un service audio agile e proporzionato,
              senza costi eccessivi.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition group-hover:gap-3">
              Scopri il service audio
              <span aria-hidden="true">→</span>
            </span>
          </div>
          <div className="relative min-h-56 overflow-hidden md:min-h-full">
            <img
              src={A.teaser}
              alt="Impianto audio per eventi: diffusori installati all'aperto per un live"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/30 to-transparent md:via-ink-950/10" />
          </div>
        </a>
      </Reveal>
    </section>
  );
}
