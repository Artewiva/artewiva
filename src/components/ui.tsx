import React, { useEffect, useRef, useState } from "react";

export function cx(...c: (string | false | undefined | null)[]) {
  return c.filter(Boolean).join(" ");
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cx(className, shown && "aw-reveal")}
      style={{
        opacity: shown ? undefined : 0,
        animationDelay: shown ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-600">
      <span className="h-px w-6 bg-brand-500" />
      {children}
    </span>
  );
}

export function SectionTitle({
  kicker,
  title,
  sub,
  align = "left",
  light = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        align === "center" && "flex flex-col items-center"
      )}
    >
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2
        className={cx(
          "mt-4 font-display text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-white/70" : "text-ink-900/65"
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

type BtnProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "dark" | "outline-light";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";
  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-[15px]",
  }[size];
  const variants = {
    primary:
      "bg-brand-500 text-white shadow-[0_10px_30px_-10px_rgba(227,6,19,0.8)] hover:bg-brand-600 hover:-translate-y-0.5",
    dark: "bg-ink-950 text-white hover:bg-ink-900 hover:-translate-y-0.5",
    ghost:
      "bg-white text-ink-950 ring-1 ring-ink-950/10 hover:ring-ink-950/30 hover:-translate-y-0.5",
    "outline-light":
      "bg-white/10 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/20 hover:-translate-y-0.5",
  }[variant];
  const cls = cx(base, sizes, variants, className);
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-700 ring-1 ring-brand-100">
      {children}
    </span>
  );
}

export function PageHero({
  kicker,
  title,
  sub,
  img,
}: {
  kicker: string;
  title: string;
  sub: string;
  img: string;
}) {
  return (
    <header className="relative overflow-hidden bg-ink-950 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <img
        src={img}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          {sub}
        </p>
      </div>
    </header>
  );
}
