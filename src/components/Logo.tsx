import { cx } from "./ui";

const RED = "#e30613";
const FONT = "'Poppins','Inter',ui-sans-serif,system-ui,sans-serif";

/**
 * Roundel completo — riproduzione vettoriale del logo ArteWiva:
 * anello nero esterno, cerchio rosso, barra nera con wordmark bianco e "PALERMO".
 * `rings={false}` restituisce la variante compatta senza anelli.
 */
export function LogoMark({
  className,
  rings = true,
  withText = true,
}: {
  className?: string;
  rings?: boolean;
  withText?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="ArteWiva Palermo"
    >
      {rings && (
        <circle cx="50" cy="50" r="45.5" fill="none" stroke="#000" strokeWidth="4.5" />
      )}
      <circle cx="50" cy="50" r={rings ? 34 : 38} fill={RED} />
      <rect x="0" y="39" width="100" height="21" fill="#000" />
      {withText && (
        <>
          <text
            x="50"
            y="54.6"
            textAnchor="middle"
            fill="#fff"
            fontFamily={FONT}
            fontWeight="500"
            fontSize="12.6"
            letterSpacing="1.2"
          >
            ARTEWIVA
          </text>
          <text
            x="96.5"
            y="58.6"
            textAnchor="end"
            fill="#fff"
            fontFamily={FONT}
            fontWeight="400"
            fontSize="2.9"
            letterSpacing="0.35"
          >
            PALERMO
          </text>
        </>
      )}
    </svg>
  );
}

/**
 * Lockup orizzontale per header e footer: roundel compatto + barra nera con wordmark.
 * Il pannello nero garantisce leggibilità su fondo chiaro e scuro.
 */
export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#/"
      className={cx("group flex items-center gap-2.5", className)}
      aria-label="ArteWiva — Home"
    >
      <span className="relative h-10 w-10 shrink-0 transition-transform duration-500 group-hover:rotate-[-8deg]">
        <LogoMark
          withText={false}
          className={cx(
            "h-full w-full",
            light && "drop-shadow-[0_0_0_1px_rgba(255,255,255,0.5)]"
          )}
        />
        {light && (
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/50" />
        )}
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="rounded-[3px] bg-black px-2.5 py-1.5 font-display text-[15px] font-medium tracking-[0.22em] text-white">
          ARTEWIVA
        </span>
        <span
          className={cx(
            "mt-1 self-end text-[8px] font-medium uppercase tracking-[0.35em]",
            light ? "text-white/70" : "text-ink-900/60"
          )}
        >
          Palermo
        </span>
      </span>
    </a>
  );
}
