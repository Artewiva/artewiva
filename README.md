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

### Aggiornamento automatico (GitHub Actions)

`.github/workflows/import-artewiva.yml` esegue l'import e committa il dataset:

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
scripts/import-artewiva.mjs        import dalla REST API di artewiva.it
src/data/artewiva-news.json        dataset generato (300 articoli)
src/data/news.ts                   tipi, rubriche e utilità di consultazione
src/components/ArticleCard.tsx     card articolo + copertina con fallback
src/pages/Articles.tsx             archivio con filtri e ricerca
src/pages/ArticleDetail.tsx        lettura articolo
```
