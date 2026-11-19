import whiteLogo from "/ARTEWIVA 5-01. linee Bianche.png";

/**
 * Logo "linee bianche" per fondi scuri/neri.
 * Importa l'asset da public/ così vite-plugin-singlefile lo inlina nel singolo HTML di build.
 */
export function LogoWhite({ className }: { className?: string }) {
  return (
    <img
      src={whiteLogo}
      alt="ArteWiva Palermo"
      className={className}
      style={{ display: "block" }}
    />
  );
}
