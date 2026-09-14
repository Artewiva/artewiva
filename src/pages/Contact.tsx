import { useState } from "react";
import { CONTACT, IMG, SERVICES } from "../data";
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

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    tel: "",
    servizio: SERVICES[0].title,
    messaggio: "",
    privacy: false,
  });

  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const field =
    "w-full rounded-2xl border border-ink-950/10 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition placeholder:text-ink-900/35 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

  return (
    <main>
      <PageHero
        kicker="Contatti"
        title="Parliamo del tuo prossimo evento."
        sub="Scrivici due righe sul progetto: rispondiamo entro 24 ore con una proposta concreta."
        img={IMG.palermoSky}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_-50px_rgba(12,11,15,0.6)] ring-1 ring-ink-950/5 sm:p-10">
              {sent ? (
                <div className="py-16 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-2xl">
                    ✉️
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink-950">
                    Messaggio inviato!
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm text-ink-900/60">
                    Grazie {form.nome || ""}. Ti rispondiamo entro 24 ore
                    all'indirizzo indicato.
                  </p>
                  <Button
                    className="mt-7"
                    variant="ghost"
                    onClick={() => setSent(false)}
                  >
                    Invia un altro messaggio
                  </Button>
                </div>
              ) : (
                <>
                  <Kicker>Form contatti</Kicker>
                  <h2 className="mt-4 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
                    Richiedi informazioni
                  </h2>
                  <form
                    className="mt-8 space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-900/50">
                          Nome e cognome *
                        </label>
                        <input
                          required
                          className={field}
                          placeholder="Mario Rossi"
                          value={form.nome}
                          onChange={(e) => set("nome", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-900/50">
                          Email *
                        </label>
                        <input
                          required
                          type="email"
                          className={field}
                          placeholder="nome@email.it"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-900/50">
                          Telefono
                        </label>
                        <input
                          className={field}
                          placeholder="+39 ..."
                          value={form.tel}
                          onChange={(e) => set("tel", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-900/50">
                          Servizio d'interesse
                        </label>
                        <select
                          className={field}
                          value={form.servizio}
                          onChange={(e) => set("servizio", e.target.value)}
                        >
                          {SERVICES.map((s) => (
                            <option key={s.slug}>{s.title}</option>
                          ))}
                          <option>Altro / Collaborazioni</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-900/50">
                        Messaggio *
                      </label>
                      <textarea
                        required
                        rows={5}
                        className={field}
                        placeholder="Raccontaci l'evento: data, luogo, cosa ti serve..."
                        value={form.messaggio}
                        onChange={(e) => set("messaggio", e.target.value)}
                      />
                    </div>
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-ink-900/55">
                      <input
                        type="checkbox"
                        required
                        checked={form.privacy}
                        onChange={(e) => set("privacy", e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-[#e30613]"
                      />
                      Ho letto e accetto la Privacy Policy e acconsento al
                      trattamento dei dati per essere ricontattato.
                    </label>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Invia richiesta →
                    </Button>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="rounded-3xl bg-ink-950 p-7 text-white">
                <h3 className="font-display text-lg font-bold">Recapiti diretti</h3>
                <ul className="mt-6 space-y-5 text-sm">
                  <li>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Email generale
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="font-semibold text-brand-400 hover:underline"
                    >
                      {CONTACT.email}
                    </a>
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
