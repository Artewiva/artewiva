import { useState } from "react";
import { EVENTS, IMG, POSTS } from "../data";
import { Button, PageHero, Reveal, SectionTitle, Tag, cx } from "../components/ui";
import { CtaBand } from "./Home";

const MORE_POSTS = [
  ...POSTS,
  {
    title: "Corpi in Scena: la danza contemporanea torna al Biondo",
    date: "21 Gennaio",
    tag: "Report",
    img: IMG.dance1,
    excerpt:
      "Tre serate di coreografie originali. Il nostro racconto fotografico dell'apertura di stagione.",
  },
  {
    title: "Come fotografare un concerto con poca luce",
    date: "14 Gennaio",
    tag: "Approfondimento",
    img: IMG.crowd5,
    excerpt:
      "Iso, tempi e compromessi: i cinque errori che rovinano un reportage live e come evitarli.",
  },
  {
    title: "Barocco & Beat: elettronica nei cortili del centro storico",
    date: "3 Dicembre",
    tag: "Evento",
    img: IMG.palermoDome,
    excerpt:
      "Quando la pietra incontra il kick drum: cronaca di una notte diversa dal solito a Palermo.",
  },
];

export default function Events() {
  const tags = ["Tutti", ...Array.from(new Set(MORE_POSTS.map((p) => p.tag)))];
  const [tag, setTag] = useState("Tutti");
  const list = tag === "Tutti" ? MORE_POSTS : MORE_POSTS.filter((p) => p.tag === tag);
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
            <SectionTitle kicker="Dal blog" title="Ultime pubblicazioni" />
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={cx(
                    "rounded-full px-4 py-2 text-xs font-semibold transition",
                    t === tag
                      ? "bg-ink-950 text-white"
                      : "bg-sand-100 text-ink-900/60 hover:text-ink-950"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-sand-50 ring-1 ring-ink-950/5 transition hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <Tag>{p.tag}</Tag>
                      <span className="text-xs text-ink-900/45">{p.date}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg leading-snug font-bold text-ink-950 group-hover:text-brand-600">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
                      {p.excerpt}
                    </p>
                    <span className="mt-auto pt-5 text-sm font-semibold text-brand-600">
                      Leggi l'articolo →
                    </span>
                  </div>
                </article>
              </Reveal>
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
