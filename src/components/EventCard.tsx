import {
  dateParts,
  eventStatus,
  formatEventRange,
  type CityEvent,
} from "../data/events";
import { cx } from "./ui";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Badge data: numero/mese per gli eventi futuri, "in corso" per quelli aperti. */
export function EventDateBadge({
  event,
  compact = false,
  light = false,
}: {
  event: CityEvent;
  compact?: boolean;
  light?: boolean;
}) {
  const ongoing = eventStatus(event) === "ongoing";
  const size = compact ? "h-12 w-12" : "h-16 w-16";

  if (ongoing) {
    return (
      <div
        className={cx(
          "grid shrink-0 place-items-center rounded-2xl text-center",
          size,
          light
            ? "bg-brand-500/15 ring-1 ring-brand-500/30"
            : "bg-brand-50 ring-1 ring-brand-100"
        )}
      >
        <span
          className={cx(
            "font-display font-bold leading-[1.05]",
            compact ? "text-[11px]" : "text-xs",
            light ? "text-brand-400" : "text-brand-600"
          )}
        >
          IN
          <br />
          CORSO
        </span>
      </div>
    );
  }

  const d = dateParts(event.start);
  return (
    <div
      className={cx(
        "grid shrink-0 place-items-center rounded-2xl text-center",
        size,
        light ? "bg-white/10 ring-1 ring-white/15" : "bg-ink-950"
      )}
    >
      <div>
        <p
          className={cx(
            "font-display font-extrabold leading-none",
            compact ? "text-base" : "text-xl",
            light ? "text-brand-400" : "text-white"
          )}
        >
          {d.day}
        </p>
        <p
          className={cx(
            "mt-1 font-semibold tracking-widest",
            compact ? "text-[8px]" : "text-[10px]",
            light ? "text-white/50" : "text-white/55"
          )}
        >
          {d.month}
        </p>
      </div>
    </div>
  );
}

/** Card completa per la griglia della pagina Eventi. */
export function EventCard({ event }: { event: CityEvent }) {
  return (
    <a
      href={event.url}
      {...EXTERNAL}
      aria-label={`${event.title} — apri la scheda su Balarm.it`}
      className="group flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-ink-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(12,11,15,0.55)]"
    >
      <div className="flex items-start gap-4">
        <EventDateBadge event={event} />
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">
            {event.category}
          </span>
          <h3 className="mt-1.5 font-display text-[15px] leading-snug font-bold text-ink-950 transition group-hover:text-brand-600">
            {event.title}
          </h3>
        </div>
      </div>

      <div className="mt-auto space-y-1.5 border-t border-ink-950/5 pt-4 text-[13px] text-ink-900/55">
        <p>🗓 {formatEventRange(event)}</p>
        <p>
          📍 {event.venue}
          {event.city && event.city !== event.venue ? ` · ${event.city}` : ""}
        </p>
      </div>
      <span className="mt-4 text-xs font-semibold text-brand-600">
        Scheda su Balarm.it ↗
      </span>
    </a>
  );
}

/** Riga compatta per il box "Prossimi eventi" della home (sfondo scuro). */
export function EventRow({ event }: { event: CityEvent }) {
  return (
    <li className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0">
      <EventDateBadge event={event} compact light />
      <div className="min-w-0">
        <a
          href={event.url}
          {...EXTERNAL}
          className="text-sm leading-snug font-semibold text-white transition hover:text-brand-400"
        >
          {event.title}
        </a>
        <p className="mt-1 line-clamp-1 text-xs text-white/45">
          {event.venue} · {event.city}
        </p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-brand-400">
          {event.category}
        </p>
      </div>
    </li>
  );
}
