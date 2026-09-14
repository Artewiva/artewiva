import { CONTACT, IMG } from "../data";
import { Button, Kicker, PageHero, Reveal, SectionTitle } from "../components/ui";

const FAQ = [
  {
    q: "Quanto costa un servizio fotografico live?",
    a: "Dipende da durata, numero di operatori e deliverable. Dopo il briefing ricevi un preventivo dettagliato entro 24 ore, senza impegno.",
  },
  {
    q: "Posso usare le foto dell'archivio?",
    a: "Sì, l'archivio è liberamente consultabile. Per l'uso pubblico è obbligatoria l'indicazione dei crediti fotografici: basta scriverci.",
  },
  {
    q: "Lavorate solo a Palermo?",
    a: "La base è Palermo e la Sicilia occidentale, ma ci spostiamo volentieri per festival e rassegne in tutta l'isola.",
  },
  {
    q: "In quanto tempo consegnate?",
    a: "Selezione fotografica in 48–72 ore, montaggio video in 7–14 giorni. Per la stampa possiamo consegnare scatti selezionati in serata.",
  },
];

const SOCIAL = [
  { label: "Facebook", handle: "/artewiva" },
  { label: "Instagram", handle: "@artewiva" },
  { label: "YouTube", handle: "ArteWiva Channel" },
  { label: "Vimeo", handle: "artewiva" },
];

const MAILTO_HREF =
  "mailto:artewiva@gmail.com?subject=Richiesta%20informazioni%20-%20ArteWiva&body=Ciao%20team%20ArteWiva%2C%0A%0Avi%20scrivo%20per%3A%0A%0A-%20Nome%3A%20%0A-%20Evento%2FProgetto%3A%20%0A-%20Data%20e%20luogo%3A%20%0A-%20Servizio%20richiesto%3A%20%0A-%20Dettagli%3A%20%0A%0AGrazie%21%0A";

export default function Contact() {
  return (
    <main>
      <PageHero
        kicker="Contatti"
        title="Parliamo del tuo prossimo evento."
        sub="Scrivici direttamente via email: rispondiamo entro 24 ore con una proposta concreta."
        img={IMG.palermoSky}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_-50px_rgba(12,11,15,0.6)] ring-1 ring-ink-950/5 sm:p-10">
              <Kicker>Contattaci via email</Kicker>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink-950 sm:text-[2.2rem]">
                Scrivici direttamente,
                <br />
                ti rispondiamo in 24 ore.
              </h2>

              <p className="mt-5 text-[15px] leading-relaxed text-ink-900/70">
                Abbiamo rimosso il form per rendere il contatto più semplice e
                diretto. Per richieste di preventivo, collaborazioni, uso
                archivio o invio di comunicati stampa, scrivici direttamente
                alla nostra casella principale.
              </p>

              <div className="mt-8 rounded-2xl bg-sand-50 p-5 ring-1 ring-ink-950/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-900/40">
                  Cosa includere nella mail
                </p>
                <ul className="mt-4 space-y-3 text-sm text-ink-900/70">
                  <li className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] ring-1 ring-ink-950/10">
                      1
                    </span>
                    <span>
                      <strong className="font-semibold text-ink-950">
                        Chi sei e cosa organizzi
                      </strong>{" "}
                      — nome, associazione / artista, breve descrizione
                      dell'evento
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] ring-1 ring-ink-950/10">
                      2
                    </span>
                    <span>
                      <strong className="font-semibold text-ink-950">
                        Data, luogo e orari
                      </strong>{" "}
                      — così possiamo verificare disponibilità e logistica
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] ring-1 ring-ink-950/10">
                      3
                    </span>
                    <span>
                      <strong className="font-semibold text-ink-950">
                        Servizio richiesto
                      </strong>{" "}
                      — fotografia live, video, archivio, report/intervista,
                      copertura integrale
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] ring-1 ring-ink-950/10">
                      4
                    </span>
                    <span>
                      <strong className="font-semibold text-ink-950">
                        Budget indicativo
                      </strong>{" "}
                      (facoltativo) — ci aiuta a proporti la soluzione migliore
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-9 flex flex-col gap-4">
                <Button
                  href={MAILTO_HREF}
                  size="lg"
                  className="w-full justify-center sm:w-auto"
                >
                  <span className="text-base">✉️</span>
                  Invia email a artewiva@gmail.com
                </Button>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-ink-900/50">
                    Preferisci copiare l'indirizzo?
                  </span>
                  <a
                    href="mailto:artewiva@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-4 py-2 font-semibold text-white ring-1 ring-ink-950/10 transition hover:bg-ink-900"
                  >
                    artewiva@gmail.com
                    <span className="text-white/60">↗</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-brand-50 px-4 py-3 ring-1 ring-brand-100">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-sm ring-1 ring-brand-100">
                  ⚡
                </div>
                <p className="text-[13px] leading-relaxed text-ink-900/70">
                  <strong className="font-semibold text-ink-950">
                    Risposta rapida garantita:
                  </strong>{" "}
                  di solito rispondiamo in poche ore, al massimo entro 24 ore
                  nei giorni feriali. Se è urgente, indica “URGENTE” nell'oggetto
                  della mail.
                </p>
              </div>

              <p className="mt-6 text-[11px] leading-relaxed text-ink-900/40">
                Inviando una email accetti il trattamento dei dati per essere
                ricontattato. Nessun dato viene salvato sul sito: la
                comunicazione avviene direttamente via email.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="rounded-3xl bg-ink-950 p-7 text-white">
                <h3 className="font-display text-lg font-bold">Recapiti diretti</h3>
                <ul className="mt-6 space-y-5 text-sm">
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Email principale
                    </p>
                    <a
                      href="mailto:artewiva@gmail.com"
                      className="font-semibold text-brand-400 hover:underline"
                    >
                      artewiva@gmail.com
                    </a>
                    <p className="mt-1 text-xs text-white/45">
                      Per preventivi, booking e info generali
                    </p>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Redazione
                    </p>
                    <a
                      href={`mailto:${CONTACT.editorial}`}
                      className="font-semibold text-brand-400 hover:underline"
                    >
                      {CONTACT.editorial}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Dove siamo
                    </p>
                    <p className="font-semibold">{CONTACT.city}</p>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Orari
                    </p>
                    <p className="font-semibold">{CONTACT.hours}</p>
                  </li>
                </ul>
                <div className="mt-7 grid grid-cols-2 gap-2">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      className="rounded-xl bg-white/5 px-3 py-2.5 text-xs ring-1 ring-white/10 transition hover:bg-brand-500"
                    >
                      <span className="block font-semibold">{s.label}</span>
                      <span className="text-white/45">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl ring-1 ring-ink-950/5">
                <iframe
                  title="Mappa Palermo"
                  className="h-72 w-full"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=13.30%2C38.09%2C13.41%2C38.15&layer=mapnik&marker=38.1157%2C13.3615"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <SectionTitle align="center" kicker="FAQ" title="Domande frequenti" />
          <div className="mt-12 space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group rounded-2xl bg-sand-50 p-5 ring-1 ring-ink-950/5 open:bg-white open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink-950">
                    {f.q}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500 text-white transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-900/65">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
