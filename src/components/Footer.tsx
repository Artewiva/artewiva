import { CONTACT, IMPRESSUM, SERVICES } from "../data";
import { Button } from "./ui";
import { Logo, LogoMark } from "./Logo";

const SOCIAL = [
  { label: "Facebook", short: "Fb", href: "#" },
  { label: "Instagram", short: "Ig", href: "#" },
  { label: "YouTube", short: "Yt", href: "#" },
  { label: "Vimeo", short: "Vi", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-ink-950/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-5">
              <LogoMark className="h-24 w-24 shrink-0 rounded-full bg-white p-1 shadow-[0_0_0_6px_rgba(255,255,255,0.06)]" />
              <Logo light />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Database fotografico e video del fermento artistico di Palermo.
              Consultabile sempre e dovunque, con uno sguardo attento e
              professionale.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-xs font-bold text-white/70 ring-1 ring-white/10 transition hover:bg-brand-500 hover:text-white"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-wide text-white">
              Naviga
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {[
                ["Home", "#/"],
                ["Chi Siamo", "#/chi-siamo"],
                ["Servizi", "#/servizi"],
                ["Service Audio", "#/servizi/service-audio"],
                ["Articoli", "#/articoli"],
                ["Eventi / News", "#/eventi"],
                ["Contatti", "#/contatti"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="transition hover:text-brand-400">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-wide text-white">
              Aree di attività
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <a
                  href="#/servizi/service-audio"
                  className="font-semibold text-white/80 transition hover:text-brand-400"
                >
                  🔊 Service Audio per Eventi e Musica Live
                </a>
              </li>
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#/servizi/${s.slug}`}
                    className="transition hover:text-brand-400"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-wide text-white">
              Contatti
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition hover:text-brand-400"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.editorial}`}
                  className="transition hover:text-brand-400"
                >
                  {CONTACT.editorial}
                </a>
              </li>
              <li>{CONTACT.city}</li>
              <li>{CONTACT.hours}</li>
            </ul>
            <Button href="#/contatti" className="mt-5" variant="primary">
              Contattaci
            </Button>
          </div>
        </div>

        <div className="mt-14 rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Impressum
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/50">
            {IMPRESSUM}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ArteWiva — {CONTACT.site}. Tutti i diritti riservati.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#/contatti" className="hover:text-white">Privacy Policy</a>
            <a href="#/contatti" className="hover:text-white">Cookie Policy</a>
            <a href="#/chi-siamo" className="hover:text-white">Crediti fotografici</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
