# Artewiva — sito e archivio articoli

Sito vetrina di Artewiva (Vite + React 19 + Tailwind 4, build in singolo file HTML)
con una sezione **Articoli** alimentata dagli articoli pubblicati su
[www.artewiva.it](https://www.artewiva.it/).

## Sezione Articoli

| Rotta | Contenuto |
| --- | --- |
| `#/articoli` | Archivio completo: ricerca, filtri per rubrica e anno, ordinamento, paginazione |
| `#/articoli/<slug>` | Lettura dell'articolo con copertina, testo, gallerie collegate, PDF e articoli correlati |

Il dataset è statico e versionato in `src/data/artewiva-news.json`: l'app non
chiama mai l'API di artewiva.it a runtime, quindi resta veloce e funziona anche
offline (le immagini restano invece ospitate su artewiva.it).

### Import degli articoli

Lo script `scripts/import-artewiva.mjs` legge la REST API pubblica di WordPress
(`/wp-json/wp/v2/posts`, `/categories`, `/media`), ripulisce l'HTML, risolve le
copertine e scrive il dataset usato dal front-end.

```bash
npm run import:news                      # ultimi 300 articoli
npm run import:news -- --limit 2000      # archivio più ampio
npm run import:news -- --since 2020-01-01
npm run import:news:full                 # tutto l'archivio disponibile
npm run import:news:images               # + specchia le copertine in public/artewiva
```

Opzioni utili: `--merge` (aggiornamento incrementale), `--download-images`,
`--out <file>`, `--api <url>` (per test), `--quiet`.

Cosa fa l'import:

1. scarica articoli, categorie e metadati delle immagini (paginazione + retry);
2. ripulisce l'HTML: via script, iframe, widget; immagini e link normalizzati su
   `https`, attributi ridotti a una whitelist;
3. converte i placeholder delle gallerie NextGEN in un marcatore che il
   front-end trasforma nell'invito a vedere il fotoreportage originale;
4. estrae i PDF agganciati agli articoli e calcola tempo di lettura ed estratto;
5. raggruppa le categorie WordPress (in parte tecniche) nelle rubriche
   editoriali definite in `src/data/news.ts`.

## Sezione Eventi / "Prossimi eventi"

L'agenda della pagina `#/eventi` e il box "Prossimi eventi" della home sono
alimentati da `src/data/balarm-events.json`, uno snapshot statico importato da
[Balarm.it — tutti gli eventi a Palermo e provincia](https://www.balarm.it/tutti-gli-eventi-a-palermo-e-provincia-di-oggi)
e dalle pagine collegate (domani, weekend, prossima settimana).

Il dataset conserva solo **dati di servizio**: titolo, categoria, date, luogo e
link alla scheda originale. Testi degli articoli e immagini di Balarm non
vengono copiati né ospitati qui; ogni card rimanda alla fonte.

```bash
npm run import:events                       # aggiorna il dataset dalle 4 pagine
npm run import:events -- --dry-run          # verifica senza scrivere
npm run import:events -- --merge            # unisce i nuovi eventi ai vecchi
npm run import:events -- --from-file p.html # import offline da HTML/markdown
npm run test:import-events                  # test del parser, senza rete
```

`src/data/events.ts` espone tipi, categorie, ricerca (`filterEvents`),
lo stato di ogni evento (passato / in corso / futuro) e la formattazione delle
date. Gli eventi scaduti vengono nascosti automaticamente in base alla data del
browser, quindi il sito resta utilizzabile anche tra due import.

> Lo script esce con errore senza sovrascrivere il file se il parser trova meno
> di `--min-events` eventi (default 20): protegge il dataset nel caso cambino
> markup o URL della fonte.

### Aggiornamento automatico (GitHub Actions)

Due workflow eseguono gli import e committano i dataset:
`.github/workflows/import-artewiva.yml` (articoli, settimanale) e
`.github/workflows/import-balarm-events.yml` (agenda eventi, ogni mattina).

Il workflow degli articoli:

- **push** su `scripts/import-artewiva.mjs` (o sul workflow stesso) → import automatico;
- **workflow_dispatch** → import manuale con `limit`, `since`, `merge`, `download_images`;
- **schedule** → ogni lunedì alle 04:00.

> Nota: i trigger `workflow_dispatch` e `schedule` sono disponibili solo se il
> workflow è presente sul branch di default (`main`).

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/index.html (file singolo)
npm run preview
```

## Struttura

```
scripts/import-artewiva.mjs          import dalla REST API di artewiva.it
scripts/import-balarm-events.mjs     import agenda da balarm.it
scripts/import-balarm-events.test.mjs  test parser (offline)
src/data/artewiva-news.json          dataset articoli generato
src/data/balarm-events.json          dataset eventi generato
src/data/news.ts                     tipi, rubriche e utilità di consultazione
src/data/events.ts                   tipi, categorie, filtri e date dell'agenda
src/components/ArticleCard.tsx       card articolo + copertina con fallback
src/components/EventCard.tsx         card / riga evento con badge data
src/pages/Articles.tsx               archivio con filtri e ricerca
src/pages/ArticleDetail.tsx          lettura articolo
src/pages/Events.tsx                 agenda eventi + ultime pubblicazioni
```
