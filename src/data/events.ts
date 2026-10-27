/**
 * Agenda eventi importata da Balarm.it
 * ---------------------------------------------------------------------------
 * Il dataset `balarm-events.json` è uno snapshot statico generato da
 * `scripts/import-balarm-events.mjs` a partire dalle pagine
 * "Tutti gli eventi a Palermo e provincia" (oggi, domani, weekend,
 * prossima settimana) di https://www.balarm.it/.
 *
 * Vengono conservati solo i dati di servizio (titolo, date, luogo, categoria)
 * e il link alla scheda originale: nessun testo degli articoli e nessuna
 * immagine di Balarm viene copiata o ospitata su questo sito.
 */
import dataset from "./balarm-events.json";

export type CityEvent = {
  /** Id numerico della scheda su Balarm.it. */
  id: string;
  title: string;
  /** Link alla scheda originale su Balarm.it. */
  url: string;
  category: string;
  /** Etichetta data come pubblicata dalla fonte (es. "Dal 2 al 30 ottobre 2026"). */
  dateLabel: string;
  /** Data di inizio, ISO `YYYY-MM-DD`. */
  start: string;
  /** Data di fine, ISO `YYYY-MM-DD` (uguale a `start` per gli eventi di un giorno). */
  end: string;
  venue: string;
  city: string;
};

export type CityEventsDataset = {
  source: string;
  sourceName: string;
  sourceUrl: string;
  sourcePages: string[];
  generatedAt: string;
  count: number;
  events: CityEvent[];
};

export const EVENTS_DATASET = dataset as CityEventsDataset;

export const EVENT_SOURCE = {
  name: EVENTS_DATASET.source,
  url: EVENTS_DATASET.sourceUrl,
  pages: EVENTS_DATASET.sourcePages,
  generatedAt: EVENTS_DATASET.generatedAt,
  count: EVENTS_DATASET.count,
};

const MONTHS_SHORT = [
  "GEN", "FEB", "MAR", "APR", "MAG", "GIU",
  "LUG", "AGO", "SET", "OTT", "NOV", "DIC",
];

const MONTHS_LONG = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Data odierna in formato ISO locale (non UTC, così il cambio giorno è corretto in Italia). */
export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Data di riferimento dell'agenda, calcolata al caricamento del sito. */
export const TODAY = todayISO();

/** Confronto lessicografico valido perché le date sono tutte `YYYY-MM-DD`. */
export function eventStatus(
  event: CityEvent,
  today: string = TODAY
): "past" | "ongoing" | "upcoming" {
  if (event.end < today) return "past";
  if (event.start > today) return "upcoming";
  return "ongoing";
}

export function dateParts(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return {
    day: pad(day),
    month: MONTHS_SHORT[month - 1] ?? "",
    year: String(year),
    long: `${day} ${MONTHS_LONG[month - 1] ?? ""} ${year}`,
  };
}

/** Es. "27 ottobre 2026" — usato per la data di aggiornamento della fonte. */
export function formatLongDate(iso: string): string {
  return dateParts(iso).long;
}

/** Testo compatto per le card: "27 ott" oppure "27 ott – 8 nov 2026". */
export function formatEventRange(event: CityEvent): string {
  if (event.start === event.end) return dateParts(event.start).long;
  const a = dateParts(event.start);
  const b = dateParts(event.end);
  const short = (d: { day: string; month: string }) =>
    `${Number(d.day)} ${d.month.toLowerCase().slice(0, 3)}`;
  return a.year === b.year
    ? `${short(a)} – ${short(b)} ${b.year}`
    : `${short(a)} ${a.year} – ${short(b)} ${b.year}`;
}

const byStart = (a: CityEvent, b: CityEvent) =>
  a.start.localeCompare(b.start) || a.end.localeCompare(b.end) || a.title.localeCompare(b.title);

const byEnd = (a: CityEvent, b: CityEvent) =>
  a.end.localeCompare(b.end) || a.title.localeCompare(b.title);

/** Tutti gli eventi importati, dal primo all'ultimo per data di inizio. */
export const ALL_EVENTS: CityEvent[] = [...EVENTS_DATASET.events].sort(byStart);

/** Eventi ancora in calendario (in corso oggi + futuri), passati esclusi. */
export const CURRENT_EVENTS: CityEvent[] = ALL_EVENTS.filter(
  (e) => eventStatus(e) === "ongoing"
).sort(byEnd);

export const UPCOMING_EVENTS: CityEvent[] = ALL_EVENTS.filter(
  (e) => eventStatus(e) === "upcoming"
).sort(byStart);

/** Agenda unica: prima quello che c'è oggi (chiude prima = più urgente), poi i prossimi. */
export const AGENDA_EVENTS: CityEvent[] = [...CURRENT_EVENTS, ...UPCOMING_EVENTS];

/** Categorie presenti nel dataset, con conteggio, in ordine alfabetico. */
export const EVENT_CATEGORIES: { name: string; count: number }[] = [
  ...new Set(ALL_EVENTS.map((e) => e.category)),
]
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({
    name,
    count: AGENDA_EVENTS.filter((e) => e.category === name).length,
  }));

export type EventFilters = { query?: string; category?: string };

/** Ricerca case/diacritics-insensitive su titolo, luogo, città e categoria. */
export function filterEvents(events: CityEvent[], filters: EventFilters = {}): CityEvent[] {
  const query = (filters.query ?? "").trim().toLocaleLowerCase("it");
  const category = filters.category ?? "Tutti";
  return events.filter((e) => {
    if (category !== "Tutti" && e.category !== category) return false;
    if (!query) return true;
    return [e.title, e.venue, e.city, e.category, e.dateLabel]
      .join(" ")
      .toLocaleLowerCase("it")
      .includes(query);
  });
}
