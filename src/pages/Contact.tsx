import { useState } from "react";
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

// Mailto con oggetto e corpo precompilati - AGGIORNATO 2026-09-14 - FORM RIMOSSO
const EMAIL = "artewiva@gmail.com";
const MAILTO_HREF = `mailto:${EMAIL}?subject=Richiesta%20informazioni%20-%20ArteWiva&body=Ciao%20team%20ArteWiva%2C%0A%0Avi%20scrivo%20per%3A%0A%0A-%20Nome%20e%20Cognome%3A%20%0A-%20Evento%2FProgetto%3A%20%0A-%20Data%20e%20luogo%3A%20%0A-%20Servizio%20richiesto%3A%20%0A-%20Dettagli%3A%20%0A%0AGrazie%21%0A`;

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  console.log("CONTACT PAGE v2 - FORM RIMOSSO - EMAIL:", EMAIL);

  return (
    <main>
      <PageHero
        kicker="Contatti"
        title="Parliamo del tuo prossimo evento."
        sub="Niente form complicati: scrivici direttamente via email a artewiva@gmail.com. Rispondiamo entro 24 ore."
        img={IMG.palermoSky}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {/* CARD PRINCIPALE - SOSTITUISCE IL FORM */}
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_-50px_rgba(12,11,15,0.6)] ring-1 ring-ink-950/5 sm:p-10">
              {/* Badge versione */}
              <div className="absolute right-6 top-6 rounded-full bg-brand-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                FORM RIMOSSO ✓
              </div>

              <Kicker>Contatto diretto via email</Kicker>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-ink-950 sm:text-[2.4rem]">
                Scrivici a<br />
                <span className="text-brand-600">artewiva@gmail.com</span>
              </h2>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-900/70">
                Abbiamo eliminato il form per rendere tutto più veloce e diretto.
                Clicca il bottone qui sotto: si aprirà il tuo client di posta con
                oggetto e messaggio già precompilati. Oppure copia l'indirizzo e
                scrivici da dove preferisci.
              </p>

              {/* BOX EMAIL GRANDE */}
              <div className="mt-8 rounded-[1.5rem] bg-ink-950 p-6 text-white sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Email principale — risponde in 24h
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-2 block font-display text-2xl font-bold tracking-tight text-white hover:text-brand-400 sm:text-3xl"
                    >
                      artewiva@gmail.com
                    </a>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
                      Per preventivi, collaborazioni, uso archivio, invio comunicati
                      e richieste generali.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <Button
                      href={MAILTO_HREF}
                      size="lg"
                      className="w-full justify-center whitespace-nowrap px-8 py-4 text-base"
                    >
                      ✉️ Apri email
                    </Button>
                    <button
                      onClick={copyEmail}
                      className="w-full rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                    >
                      {copied ? "Copiato ✓" : "Copia indirizzo"}
                    </button>
                  </div>
                </div>
              </div>

              {/* COSA SCRIVERE */}
              <div className="mt-8 rounded-2xl bg-sand-50 p-6 ring-1 ring-ink-950/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-900/40">
                  Cosa includere nella mail (ci aiuti a rispondere più in fretta)
                </p>
                <ul className="mt-4 space-y-3 text-sm text-ink-900/70">
                  <li className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold ring-1 ring-ink-950/10">
                      1
                    </span>
                    <span>
                      <strong className="font-semibold text-ink-950">Chi sei</strong> — nome,
                      associazione / band / ente
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold ring-1 ring-ink-950/10">
                      2
                    </span>
                    <span>
                      <strong className="font-semibold text-ink-950">Data, luogo, orari</strong> —
                      verifichiamo subito disponibilità
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold ring-1 ring-ink-950/10">
                      3
                    </span>
                    <span>
                      <strong className="font-semibold text-ink-950">Servizio</strong> — fotografia
                      live, video, archivio, report, copertura integrale
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold ring-1 ring-ink-950/10">
                      4
                    </span>
                    <span>
                      <strong className="font-semibold text-ink-950">Dettagli utili</strong> —
                      scaletta, location, budget indicativo se c'è
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA DOPPIO */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={MAILTO_HREF}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(227,6,19,0.8)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
                >
                  <span>✉️</span> Invia email a artewiva@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-ink-950 ring-1 ring-ink-950/10 transition hover:-translate-y-0.5 hover:ring-ink-950/20 sm:w-auto"
                >
                  📋 {copied ? "Copiato!" : "Copia email"}
                </button>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-50 px-4 py-3 ring-1 ring-brand-100">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-sm ring-1 ring-brand-100">
                  ⚡
                </div>
                <p className="text-[13px] leading-relaxed text-ink-900/70">
                  <strong className="font-semibold text-ink-950">Risposta in 24h:</strong> di solito
                  rispondiamo in poche ore nei feriali. Se è urgente scrivi "URGENTE" nell'oggetto.
                </p>
              </div>

              <p className="mt-6 text-[11px] leading-relaxed text-ink-900/40">
                Nessun dato viene salvato sul sito. La comunicazione avviene direttamente via email
                a artewiva@gmail.com. Inviando una mail accetti di essere ricontattato.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="rounded-3xl bg-ink-950 p-7 text-white">
                <h3 className="font-display text-lg font-bold">Recapiti diretti</h3>
                <ul className="mt-6 space-y-5 text-sm">
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">Email principale</p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="font-semibold text-brand-400 hover:underline"
                    >
                      {EMAIL}
                    </a>
                    <p className="mt-1 text-xs text-white/45">Preventivi, booking, info generali</p>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">Redazione</p>
                    <a
                      href={`mailto:${CONTACT.editorial}`}
                      className="font-semibold text-brand-400 hover:underline"
                    >
                      {CONTACT.editorial}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">Dove siamo</p>
                    <p className="font-semibold">{CONTACT.city}</p>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">Orari risposta</p>
                    <p className="font-semibold">{CONTACT.hours} — mail 24h</p>
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
                  <p className="mt-3 text-sm leading-relaxed text-ink-900/65">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
