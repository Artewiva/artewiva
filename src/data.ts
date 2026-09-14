export const IMG = {
  heroA:
    "https://images.pexels.com/photos/30215324/pexels-photo-30215324.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800",
  heroB:
    "https://images.pexels.com/photos/12265693/pexels-photo-12265693.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800",
  heroC:
    "https://images.pexels.com/photos/26896238/pexels-photo-26896238.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800",
  heroD:
    "https://images.pexels.com/photos/20532119/pexels-photo-20532119.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800",
  photographer:
    "https://images.pexels.com/photos/33411321/pexels-photo-33411321.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  photographer2:
    "https://images.pexels.com/photos/18072016/pexels-photo-18072016.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  video:
    "https://images.pexels.com/photos/34328462/pexels-photo-34328462.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  palermoSky:
    "https://images.pexels.com/photos/35644624/pexels-photo-35644624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  palermoDome:
    "https://images.pexels.com/photos/18495421/pexels-photo-18495421.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  palermoTower:
    "https://images.pexels.com/photos/18816741/pexels-photo-18816741.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  palermoMount:
    "https://images.pexels.com/photos/35644625/pexels-photo-35644625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  crowd1:
    "https://images.pexels.com/photos/36675302/pexels-photo-36675302.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  crowd2:
    "https://images.pexels.com/photos/14870726/pexels-photo-14870726.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  crowd3:
    "https://images.pexels.com/photos/761543/pexels-photo-761543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  crowd4:
    "https://images.pexels.com/photos/38485789/pexels-photo-38485789.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  crowd5:
    "https://images.pexels.com/photos/30497160/pexels-photo-30497160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  dance1:
    "https://images.pexels.com/photos/27352253/pexels-photo-27352253.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  dance2:
    "https://images.pexels.com/photos/10154673/pexels-photo-10154673.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  dance3:
    "https://images.pexels.com/photos/27352449/pexels-photo-27352449.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  dance4:
    "https://images.pexels.com/photos/763214/pexels-photo-763214.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
};

export const HERO_SLIDES = [
  {
    img: IMG.heroA,
    kicker: "Live Music",
    caption: "Il fermento artistico di Palermo, fotogramma dopo fotogramma",
  },
  {
    img: IMG.heroC,
    kicker: "Porto di Palermo",
    caption: "Vista notturna sul Porto di Palermo — foto Massimo Torcivia",
  },
  {
    img: IMG.heroB,
    kicker: "Sul palco",
    caption: "Reportage dal vivo, senza filtri e senza messe in posa",
  },
  {
    img: IMG.palermoMount,
    kicker: "Vista da Monte Pellegrino",
    caption: "La città che ospita le storie che raccontiamo",
  },
];

export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  bullets: string[];
  hero: string;
  intro: string;
  body: string[];
  gallery: string[];
  specs: { label: string; value: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "fotografia-live",
    icon: "📷",
    title: "Fotografia Live & Concerti",
    short:
      "Reportage fotografico professionale di concerti, festival e rassegne. Dal sottopalco al backstage.",
    bullets: [
      "Copertura completa: soundcheck, live, backstage",
      "Consegna selezione editata entro 48h",
      "File alta risoluzione + crop per social",
    ],
    hero: IMG.crowd1,
    intro:
      "Un concerto dura due ore. Le immagini restano per sempre. Fotografiamo la musica dal vivo con sguardo documentaristico e cura editoriale.",
    body: [
      "Lavoriamo in condizioni di luce difficili — è il nostro habitat. Nessun flash invasivo, nessuna posa costruita: seguiamo il ritmo dello spettacolo e restituiamo l'energia reale della sala.",
      "Ogni servizio comprende un sopralluogo tecnico (o briefing con il light designer), copertura dei tre pit, ritratti backstage su richiesta e post-produzione coerente con l'identità visiva dell'artista o della rassegna.",
      "Le immagini entrano nell'archivio ArteWiva e restano consultabili nel tempo: una memoria fotografica del fermento artistico della città.",
    ],
    gallery: [IMG.crowd2, IMG.crowd3, IMG.crowd4, IMG.crowd5, IMG.heroB, IMG.heroA],
    specs: [
      { label: "Durata tipica", value: "3 – 6 ore on site" },
      { label: "Output", value: "60 – 150 scatti editati" },
      { label: "Consegna", value: "48 – 72 ore, galleria privata" },
      { label: "Formati", value: "JPEG 300dpi, 3:2 / 4:5 / 9:16" },
    ],
  },
  {
    slug: "video-produzione",
    icon: "🎬",
    title: "Video & Produzione",
    short:
      "Riprese multicamera, aftermovie, videoclip e contenuti verticali per i canali social.",
    bullets: [
      "Riprese multicamera e audio da mixer",
      "Aftermovie 60–120\" e teaser verticali",
      "Color grading e sound design inclusi",
    ],
    hero: IMG.video,
    intro:
      "Dal live set integrale all'aftermovie che fa sold-out la data successiva: produciamo video che raccontano l'evento e lo fanno viaggiare.",
    body: [
      "Setup modulare da una a quattro camere, con presa audio diretta dal banco per una resa fedele del suono di sala.",
      "Il montaggio segue una logica narrativa: attesa, esplosione, memoria. Consegniamo sempre un master orizzontale e i tagli verticali pronti per Reels, TikTok e Shorts.",
      "Su richiesta realizziamo videoclip musicali, documentari brevi e pillole interviste da affiancare al materiale live.",
    ],
    gallery: [IMG.photographer, IMG.photographer2, IMG.crowd1, IMG.dance1, IMG.crowd5, IMG.heroD],
    specs: [
      { label: "Camere", value: "1 – 4 (4K / 50p)" },
      { label: "Audio", value: "Line out da mixer + ambience" },
      { label: "Deliverable", value: "Master 4K + 3 tagli social" },
      { label: "Consegna", value: "7 – 14 giorni" },
    ],
  },
  {
    slug: "archivio-digitale",
    icon: "🗂️",
    title: "Archivio Digitale & Database",
    short:
      "Il cuore di ArteWiva: un database foto e video consultabile sempre e dovunque.",
    bullets: [
      "Catalogazione per artista, data e luogo",
      "Metadati IPTC e ricerca full-text",
      "Accesso libero alla memoria visiva della città",
    ],
    hero: IMG.palermoDome,
    intro:
      "ArteWiva nasce come database fotografico e video consultabile sempre e dovunque, per dare luce al fermento artistico con uno sguardo attento e professionale.",
    body: [
      "Ogni contenuto viene catalogato con metadati completi: artista, evento, luogo, data, crediti fotografici e licenza d'uso. Nulla si perde nel flusso dei social.",
      "Organizziamo archivi anche per terzi — festival, teatri, associazioni culturali — trasformando cartelle disordinate in una risorsa navigabile e valorizzabile.",
      "L'obiettivo è lasciare una memoria, fotografica e video, liberamente consultabile di ciò che accade oggi sui palchi di Palermo.",
    ],
    gallery: [IMG.palermoSky, IMG.palermoTower, IMG.palermoMount, IMG.heroC, IMG.crowd3, IMG.dance3],
    specs: [
      { label: "Voci in archivio", value: "oltre 12.000 file" },
      { label: "Copertura", value: "dal 2016 a oggi" },
      { label: "Metadati", value: "IPTC / EXIF completi" },
      { label: "Accesso", value: "consultazione libera online" },
    ],
  },
  {
    slug: "report-interviste",
    icon: "✍️",
    title: "Report, Interviste & Blog",
    short:
      "Racconti, recensioni e interviste dal mondo dell'arte e dello spettacolo.",
    bullets: [
      "Report a caldo il giorno dopo l'evento",
      "Interviste ad artisti, organizzatori e tecnici",
      "Approfondimenti sulla scena culturale locale",
    ],
    hero: IMG.dance2,
    intro:
      "ArteWiva è anche parola: uno spazio dedicato a report, interviste, eventi e a tutto quello che gravita attorno al mondo dell'arte e dello spettacolo.",
    body: [
      "La redazione è composta da appassionati: direttore responsabile, redattori e fotografi contribuiscono a titolo gratuito, per passione e per senso di comunità.",
      "Pubblichiamo recensioni oneste, interviste lunghe e reportage che mettono al centro le persone dietro gli eventi: tecnici, organizzatori, musicisti emergenti.",
      "Il blog viene aggiornato senza periodicità fissa e non riceve finanziamenti: la libertà editoriale è il nostro unico vincolo.",
    ],
    gallery: [IMG.dance4, IMG.dance1, IMG.dance3, IMG.photographer2, IMG.crowd2, IMG.palermoSky],
    specs: [
      { label: "Formato", value: "Long-form + gallery fotografica" },
      { label: "Lingua", value: "Italiano" },
      { label: "Periodicità", value: "Non periodica" },
      { label: "Licenza", value: "Crediti obbligatori" },
    ],
  },
  {
    slug: "eventi-culturali",
    icon: "🎭",
    title: "Copertura Eventi Culturali",
    short:
      "Teatro, danza, mostre, rassegne e festival: documentazione completa dell'evento.",
    bullets: [
      "Documentazione integrale della rassegna",
      "Kit stampa pronto per i media",
      "Materiale per bandi, report e rendicontazioni",
    ],
    hero: IMG.dance3,
    intro:
      "Accompagniamo festival, teatri e associazioni per tutta la durata della rassegna, con un output pensato anche per stampa e rendicontazione.",
    body: [
      "Un solo interlocutore per foto, video e testi: meno coordinamento per te, coerenza visiva garantita su tutti i materiali.",
      "Prepariamo un kit stampa con selezione ad alta risoluzione, didascalie e crediti già impaginati, pronto per essere inviato alle testate.",
      "Per gli enti che lavorano con bandi pubblici forniamo documentazione datata e ordinata, utile in fase di rendicontazione.",
    ],
    gallery: [IMG.dance1, IMG.dance2, IMG.dance4, IMG.crowd4, IMG.palermoDome, IMG.heroD],
    specs: [
      { label: "Durata", value: "Da 1 serata a rassegne intere" },
      { label: "Team", value: "1 – 3 operatori" },
      { label: "Extra", value: "Kit stampa + report PDF" },
      { label: "Consegna", value: "Progressiva, giorno per giorno" },
    ],
  },
  {
    slug: "servizi-artisti",
    icon: "🎸",
    title: "Servizi per Artisti & Band",
    short:
      "Press kit fotografici, ritratti di scena e contenuti per la promozione.",
    bullets: [
      "Shooting in studio, in sala prove o in location",
      "Set di immagini per EPK, copertine e stampa",
      "Consulenza sull'identità visiva del progetto",
    ],
    hero: IMG.photographer2,
    intro:
      "Un buon press kit apre porte. Costruiamo l'immagine del tuo progetto musicale con scatti che funzionano su stampa, piattaforme e social.",
    body: [
      "Partiamo da un confronto sul suono e sull'immaginario della band, poi scegliamo insieme location, luci e mood.",
      "Consegniamo un set completo: orizzontali per le testate, quadrati per le release, verticali per le storie, più un ritratto singolo per ogni componente.",
      "Possiamo affiancare il tutto con un breve video teaser e con la copertura della data di presentazione.",
    ],
    gallery: [IMG.photographer, IMG.heroB, IMG.crowd1, IMG.dance4, IMG.crowd5, IMG.heroA],
    specs: [
      { label: "Durata shooting", value: "2 – 4 ore" },
      { label: "Output", value: "25 – 40 immagini editate" },
      { label: "Location", value: "Studio, sala prove o esterni" },
      { label: "Consegna", value: "5 giorni lavorativi" },
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  year: string;
  place: string;
  img: string;
  desc: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Notti al Porto",
    category: "Reportage fotografico",
    year: "2024",
    place: "Porto di Palermo",
    img: IMG.heroC,
    desc: "Serie notturna sul waterfront: la città che si accende e i live sul molo.",
  },
  {
    title: "Palco Aperto Festival",
    category: "Copertura integrale",
    year: "2024",
    place: "Cantieri Culturali alla Zisa",
    img: IMG.crowd1,
    desc: "Dieci giorni, ventidue band, un archivio di 3.400 scatti catalogati.",
  },
  {
    title: "Corpi in Scena",
    category: "Danza contemporanea",
    year: "2023",
    place: "Teatro Biondo",
    img: IMG.dance1,
    desc: "Documentazione fotografica di una stagione di danza contemporanea.",
  },
  {
    title: "Suoni di Monte Pellegrino",
    category: "Video + Foto",
    year: "2023",
    place: "Monte Pellegrino",
    img: IMG.palermoMount,
    desc: "Aftermovie e reportage del concerto all'alba sopra la città.",
  },
  {
    title: "Backstage Sessions",
    category: "Ritratti d'autore",
    year: "2023",
    place: "Palermo",
    img: IMG.photographer2,
    desc: "Ciclo di ritratti dedicati ai tecnici e ai mestieri invisibili del live.",
  },
  {
    title: "Barocco & Beat",
    category: "Evento culturale",
    year: "2022",
    place: "Centro storico",
    img: IMG.palermoDome,
    desc: "Musica elettronica nei cortili barocchi: contrasto tra pietra e luce.",
  },
];

export type Post = {
  title: string;
  date: string;
  tag: string;
  img: string;
  excerpt: string;
};

export const POSTS: Post[] = [
  {
    title: "Palermo Live Week: la scena emergente si prende la città",
    date: "12 Marzo",
    tag: "Report",
    img: IMG.crowd4,
    excerpt:
      "Sette serate, quattro quartieri, una sola certezza: la musica dal vivo a Palermo non è mai stata così viva.",
  },
  {
    title: "Intervista: il mestiere del light designer",
    date: "28 Febbraio",
    tag: "Intervista",
    img: IMG.crowd3,
    excerpt:
      "Chi disegna la luce disegna la memoria del concerto. Conversazione su buio, colore e tempi.",
  },
  {
    title: "Nuova sezione archivio: 1.200 scatti dal 2016 al 2019",
    date: "9 Febbraio",
    tag: "Archivio",
    img: IMG.palermoTower,
    excerpt:
      "Abbiamo digitalizzato e catalogato gli anni delle origini. Ora sono liberamente consultabili.",
  },
];

export const EVENTS = [
  {
    day: "05",
    month: "APR",
    title: "Jazz al Tramonto — Live Session",
    place: "Molo Trapezoidale, Palermo",
    type: "Copertura foto + video",
  },
  {
    day: "19",
    month: "APR",
    title: "Rassegna Corpi in Scena, atto II",
    place: "Teatro Biondo, Palermo",
    type: "Reportage di scena",
  },
  {
    day: "10",
    month: "MAG",
    title: "Palco Aperto Festival — Opening",
    place: "Cantieri Culturali alla Zisa",
    type: "Copertura integrale",
  },
  {
    day: "31",
    month: "MAG",
    title: "Mostra «Dieci anni di ArteWiva»",
    place: "Spazio espositivo, Palermo",
    type: "Mostra fotografica",
  },
];

export const TEAM = [
  {
    name: "Massimo Torcivia",
    role: "Direttore responsabile & Fotografo",
    bio: "Cura i contenuti fotografici e video del portale. Sguardo attento, professionale, mai invadente.",
    img: "IMG_4616.PNG",
  },
  {
    name: "Redazione ArteWiva",
    role: "Report & Interviste",
    bio: "Un gruppo di appassionati che scrive di arte e spettacolo a titolo completamente gratuito.",
    img: IMG.photographer,
  },
  {
    name: "Rete Fotografi",
    role: "Contributor sul campo",
    bio: "Fotografi e videomaker che condividono con noi serate, palchi e archivi della città.",
    img: IMG.video,
  },
];

export const VALUES = [
  {
    icon: "🎯",
    title: "Sguardo professionale",
    text: "Qualità tecnica non negoziabile: luce difficile, tempi stretti, risultato sempre pubblicabile.",
  },
  {
    icon: "🕊️",
    title: "Indipendenza",
    text: "Nessun finanziamento, nessun condizionamento. Raccontiamo ciò che merita di essere raccontato.",
  },
  {
    icon: "🏛️",
    title: "Memoria collettiva",
    text: "Costruiamo un archivio consultabile: ciò che accade oggi sarà documento domani.",
  },
  {
    icon: "❤️",
    title: "Passione condivisa",
    text: "Un blog di appassionati del mondo dell'arte e dello spettacolo, aperto a chi vuole contribuire.",
  },
];

export const STATS = [
  { value: "12k+", label: "Foto in archivio" },
  { value: "450+", label: "Eventi documentati" },
  { value: "10", label: "Anni sul campo" },
  { value: "100%", label: "Accesso libero" },
];

export const CONTACT = {
  email: "artewiva@gmail.com",
  editorial: "redazione@artewiva.it",
  city: "Palermo, Sicilia — Italia",
  hours: "Lun – Ven, 9:00 – 19:00",
  site: "www.artewiva.it",
};

export const IMPRESSUM =
  "ARTEWIVA.IT è un blog di appassionati del mondo dell'arte e dello spettacolo. Uno spazio interamente dedicato a report, interviste, eventi e a tutto quello che gravita all'interno di questo mondo. Il direttore responsabile, i redattori e i fotografi contribuiscono al blog e alla divulgazione delle notizie a titolo gratuito. Questo blog non rappresenta una testata giornalistica in quanto viene aggiornato senza alcuna periodicità e non riceve alcun tipo di finanziamento. Non può pertanto considerarsi un prodotto editoriale ai sensi della legge n. 62 del 7.03.2001.";
