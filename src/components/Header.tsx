import { useEffect, useState } from "react";
import { Button, cx } from "./ui";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home", href: "#/" },
  { label: "Chi Siamo", href: "#/chi-siamo" },
  { label: "Servizi", href: "#/servizi" },
  { label: "Eventi / News", href: "#/eventi" },
  { label: "Contatti", href: "#/contatti" },
];

export default function Header({ route }: { route: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [route]);

  const active = (href: string) =>
    href === "#/" ? route === "/" : route.startsWith(href.slice(1));

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={cx(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5",
          scrolled || open
            ? "bg-white/85 shadow-[0_16px_40px_-24px_rgba(12,11,15,0.5)] ring-1 ring-ink-950/5 backdrop-blur-xl"
            : "bg-white/10 ring-1 ring-white/15 backdrop-blur-md"
        )}
      >
        <Logo light={!scrolled && !open} />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={cx(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? active(n.href)
                    ? "text-brand-600"
                    : "text-ink-900/70 hover:text-ink-950"
                  : active(n.href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
              )}
            >
              {n.label}
              {active(n.href) && (
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            href="#/contatti"
            variant={scrolled || open ? "primary" : "outline-light"}
            className="hidden sm:inline-flex"
          >
            Richiedi informazioni
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className={cx(
              "grid h-10 w-10 place-items-center rounded-xl transition lg:hidden",
              scrolled || open
                ? "bg-ink-950/5 text-ink-950"
                : "bg-white/15 text-white"
            )}
          >
            <div className="space-y-1.5">
              <span
                className={cx(
                  "block h-0.5 w-5 bg-current transition-transform",
                  open && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cx(
                  "block h-0.5 w-5 bg-current transition-opacity",
                  open && "opacity-0"
                )}
              />
              <span
                className={cx(
                  "block h-0.5 w-5 bg-current transition-transform",
                  open && "-translate-y-2 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl bg-white p-3 shadow-xl ring-1 ring-ink-950/5 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={cx(
                "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                active(n.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-900/80 hover:bg-sand-100"
              )}
            >
              {n.label}
            </a>
          ))}
          <Button href="#/contatti" className="mt-2 w-full" size="lg">
            Richiedi informazioni
          </Button>
        </div>
      )}
    </div>
  );
}
