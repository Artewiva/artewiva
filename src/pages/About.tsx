import { IMG, IMPRESSUM, STATS, TEAM, VALUES } from "../data";
import { PageHero, Reveal, SectionTitle } from "../components/ui";
import { LogoMark } from "../components/Logo";
import { CtaBand } from "./Home";

const TIMELINE = [
  {
    year: "2016",
    title: "Nasce il portale",
    text: "Online la prima versione di artewiva.it: un contenitore per le foto dei live palermitani.",
  },
  {
    year: "2018",
    title: "Arriva il video",
    text: "Alle gallerie fotografiche si affiancano riprese multicamera e primi aftermovie.",
  },
  {
    year: "2021",
    title: "L'archivio diventa database",
    text: "Catalogazione sistematica per artista, luogo e data: i contenuti diventano ricercabili.",
  },
  {
    year: "2024",
    title: "Una rete di sguardi",
    text: "Fotografi e redattori contribuiscono al progetto, ampliando la copertura della scena.",
  },
];

export default function About() {
  return (
    <main>
      <PageHero
        kicker="Chi siamo"
        title="Appassionati di arte e spettacolo, con uno sguardo professionale."
        sub="ArteWiva è un blog indipendente e un archivio visivo: report, interviste, eventi e tutto ciò che gravita attorno al mondo dell'arte a Palermo."
        img={IMG.photographer2}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <LogoMark className="mb-8 h-36 w-36" />
            <SectionTitle
              kicker="La storia"
              title="Nato per non lasciare che tutto svanisca a fine concerto."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-[15px] leading-relaxed text-ink-900/70">
              <p>
                Il sito <strong className="text-ink-950">www.artewiva.it</strong>{" "}
                è un database fotografico e video consultabile sempre e dovunque,
                pensato per dare luce al fermento artistico con uno sguardo
                attento e professionale.
              </p>
              <p>
                Ci occupiamo di arte e in particolare di musica live: al suo
                interno si trovano contenuti fotografici e video di qualità
                professionale curati da{" "}
                <strong className="text-ink-950">Massimo Torcivia</strong>.
              </p>
              <p>
                Tutto questo per testimoniare il fermento artistico che stiamo
                vivendo in questo periodo storico a Palermo, e per lasciare una
                memoria — fotografica e video — liberamente consultabile.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[IMG.palermoSky, IMG.crowd2, IMG.dance3, IMG.heroC].map((src, i) => (
            <Reveal key={src} delay={i * 80}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={src}
                  alt=""
                  className="h-56 w-full object-cover transition duration-700 hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            align="center"
            kicker="I valori"
            title="Quattro principi, nessun compromesso"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-3xl bg-sand-50 p-7 ring-1 ring-ink-950/5 transition hover:-translate-y-1.5 hover:shadow-lg">
                  <span className="text-3xl">{v.icon}</span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-950">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-900/60">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionTitle kicker="Il percorso" title="Dieci anni in quattro tappe" />
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 90}>
              <div className="relative h-full rounded-3xl bg-white p-6 ring-1 ring-ink-950/5">
                <span className="font-display text-4xl font-extrabold text-brand-500/25">
                  {t.year}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-ink-950">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
                  {t.text}
                </p>
                <span className="absolute -top-2 left-6 h-4 w-4 rounded-full bg-brand-500 ring-4 ring-sand-50" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-950 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            light
            kicker="Il team"
            title="Chi c'è dietro l'obiettivo"
            sub="Il direttore responsabile, i redattori e i fotografi contribuiscono al blog e alla divulgazione delle notizie a titolo gratuito."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <div className="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                  <div className="h-60 overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-white">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-400">
                      {m.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10"
              >
                <p className="font-display text-3xl font-extrabold text-white">
                  {s.value}
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-wider text-white/45">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-white/[0.03] p-7 ring-1 ring-white/10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-400">
              Impressum
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {IMPRESSUM}
            </p>
          </div>
        </div>
      </section>

      <div className="pt-16">
        <CtaBand />
      </div>
    </main>
  );
}
