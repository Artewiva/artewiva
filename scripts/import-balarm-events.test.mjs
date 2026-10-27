/**
 * Test del parser dell'agenda Balarm (nessuna richiesta di rete).
 * Esegui con: npm run test:import-events
 *
 * Le fixture sono inventate: riproducono la struttura del listing senza
 * copiare contenuti dalla fonte.
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDataset,
  dedupeEvents,
  extractVenueFromLine,
  htmlToMarkdown,
  parseEventDocument,
  parseItalianDateRange,
} from "./import-balarm-events.mjs";

const HTML_FIXTURE = `<!doctype html>
<html><body>
<ul class="nav"><li><a href="/news">NEWS</a></li>
<li><a href="/tutti-gli-eventi-a-palermo-e-provincia-di-oggi">Oggi martedì 27 ottobre</a></li></ul>

<h4>FESTIVAL E RASSEGNE</h4>
<ul class="events">
  <li class="featured">
    <a href="/eventi/un-arcipelago-di-musica-168412"><img src="https://www.balarm.it/cache/foto.jpg" alt=""></a>
    <span class="date">Dal 26 agosto al 17 novembre 2026</span>
    <h3><a href="/eventi/un-arcipelago-di-musica-168412">Un arcipelago di musica e teatro</a></h3>
    <p>Vari luoghi di Palermo e provincia</p>
  </li>
  <li>
    <em>Dal 6 ottobre al 1 dicembre 2026</em>
    <a href="/eventi/immagini-tra-realta-148881">Immagini tra realtà e menzogne</a>
    <span> / </span> <span>breve descrizione [...] / </span>
    <a href="/luoghi/cinema-rouge-et-noir-1546">Cinema Rouge Et Noir</a> - Palermo
  </li>
</ul>

<h4>CONCERTI</h4>
<ul class="events">
  <li><em>27 ottobre 2026</em>
    <a href="/eventi/james-carter-organ-trio-148858">James Carter Organ Trio al Teatro Golden</a> /
    descrizione del concerto [...] /
    <a href="/luoghi/teatro-golden-1013">Teatro Golden</a> - Palermo
  </li>
  <li><em>13 aprile 2027</em>
    <a href="/eventi/concerto-di-primavera-149999">Concerto di primavera</a> /
    <a href="/luoghi/teatro-biondo-63">Teatro Biondo</a> - Palermo
  </li>
</ul>
</body></html>`;

const MARKDOWN_FIXTURE = `#### MOSTRE

- [![](https://www.balarm.it/cache/mostra.jpg)](https://www.balarm.it/eventi/una-mostra-in-citta-147731)



Dal 23 luglio al 31 ottobre 2026



[La Sicilia e Botero: i capolavori in mostra](https://www.balarm.it/eventi/una-mostra-in-citta-147731)




Vari luoghi della Sicilia

- _Dal 9 ottobre all'8 novembre 2026_

[La ceramica contemporanea al museo Salinas](https://www.balarm.it/eventi/ceramica-al-salinas-148978) /
Il museo ospita la mostra [...] /
[Museo archeologico regionale "Antonino Salinas"](https://www.balarm.it/luoghi/museo-salinas-345) \\- Palermo
`;

test("htmlToMarkdown trasforma liste, heading, link e immagini", () => {
  const md = htmlToMarkdown(HTML_FIXTURE);
  assert.match(md, /#### FESTIVAL E RASSEGNE/);
  assert.match(md, /\[Un arcipelago di musica e teatro\]/);
  assert.match(md, /\[Cinema Rouge Et Noir\]\(\/luoghi\//);
  assert.ok(!/<a |<li |<h4/.test(md));
});

test("parseItalianDateRange gestisce date singole e intervalli", () => {
  assert.deepEqual(parseItalianDateRange("27 ottobre 2026"), {
    start: "2026-10-27", end: "2026-10-27",
  });
  assert.deepEqual(parseItalianDateRange("13 aprile 2027"), {
    start: "2027-04-13", end: "2027-04-13",
  });
  assert.deepEqual(parseItalianDateRange("Dal 23 al 31 ottobre 2026"), {
    start: "2026-10-23", end: "2026-10-31",
  });
  assert.deepEqual(parseItalianDateRange("Dal 1 al 30 ottobre 2026"), {
    start: "2026-10-01", end: "2026-10-30",
  });
  assert.deepEqual(parseItalianDateRange("Dal 26 agosto al 17 novembre 2026"), {
    start: "2026-08-26", end: "2026-11-17",
  });
  assert.deepEqual(parseItalianDateRange("Dal 20 ottobre 2026 al 29 gennaio 2027"), {
    start: "2026-10-20", end: "2027-01-29",
  });
  assert.deepEqual(parseItalianDateRange("Dal 9 ottobre all'8 novembre 2026"), {
    start: "2026-10-09", end: "2026-11-08",
  });
  assert.deepEqual(parseItalianDateRange("Dal 30 ottobre al 1 novembre 2026"), {
    start: "2026-10-30", end: "2026-11-01",
  });
  assert.equal(parseItalianDateRange(""), null);
});

test("extractVenueFromLine estrae luogo e città", () => {
  assert.deepEqual(
    extractVenueFromLine('[Teatro Golden](/luoghi/x) \\- Palermo'),
    { venue: "Teatro Golden", city: "Palermo" }
  );
  assert.deepEqual(
    extractVenueFromLine("Vari luoghi - Palermo"),
    { venue: "Vari luoghi", city: "Palermo" }
  );
  assert.equal(extractVenueFromLine("Dal 2 al 30 ottobre 2026"), null);
});

test("parseEventDocument estrae eventi da HTML con categorie, date e luoghi", () => {
  const events = parseEventDocument(HTML_FIXTURE, { date: "2026-10-27" });
  assert.equal(events.length, 4, events.map((e) => e.title).join(", "));

  const [festival, rassegna, concerto, primavera] = events;
  assert.equal(festival.id, "168412");
  assert.equal(festival.category, "Festival e rassegne");
  assert.equal(festival.start, "2026-08-26");
  assert.equal(festival.end, "2026-11-17");
  assert.equal(festival.venue, "Vari luoghi di Palermo e provincia");

  assert.equal(rassegna.venue, "Cinema Rouge Et Noir");
  assert.equal(rassegna.city, "Palermo");
  assert.equal(concerto.category, "Concerti");
  assert.equal(concerto.start, "2026-10-27");
  assert.equal(primavera.start, "2027-04-13");
});

test("parseEventDocument estrae eventi dal markdown del listing", () => {
  const events = parseEventDocument(MARKDOWN_FIXTURE, { date: "2026-10-27" });
  assert.equal(events.length, 2, JSON.stringify(events, null, 2));
  assert.equal(events[0].category, "Mostre");
  assert.equal(events[0].start, "2026-07-23");
  assert.equal(events[0].end, "2026-10-31");
  assert.equal(events[1].start, "2026-10-09");
  assert.equal(events[1].end, "2026-11-08");
  assert.match(events[1].venue, /Museo archeologico/);
});

test("dedupeEvents unisce per id mantenendo la scheda più completa", () => {
  const a = {
    id: "1", title: "Titolo", url: "https://www.balarm.it/eventi/x-1",
    category: "Eventi", dateLabel: "1 novembre 2026",
    start: "2026-11-01", end: "2026-11-01", venue: "Palermo e provincia", city: "Palermo",
  };
  const b = { ...a, category: "Concerti", venue: "Teatro Massimo" };
  const result = dedupeEvents([a, b]);
  assert.equal(result.length, 1);
  assert.equal(result[0].category, "Concerti");
  assert.equal(result[0].venue, "Teatro Massimo");
});

test("buildDataset espone source, pagine e conteggio", () => {
  const events = parseEventDocument(HTML_FIXTURE, { date: "2026-10-27" });
  const dataset = buildDataset(events, { date: "2026-10-27", pages: ["https://www.balarm.it/x"] });
  assert.equal(dataset.source, "Balarm.it");
  assert.equal(dataset.count, 4);
  assert.equal(dataset.generatedAt, "2026-10-27");
  assert.equal(dataset.sourceUrl, "https://www.balarm.it/x");
});
