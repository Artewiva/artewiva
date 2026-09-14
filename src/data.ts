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

/* -------------------------------------------------------------------------- */
/*  Service Audio per Eventi e Musica Live                                     */
/*  Contenuti della pagina dedicata: #/servizi/service-audio                   */
/* -------------------------------------------------------------------------- */

const px = (id: number, w = 1200, h = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}`;

export const AUDIO_SERVICE = {
  slug: "service-audio",
  title: "Service Audio per Eventi e Musica Live",
  subtitle: "Audio professionale, dimensionato per il tuo evento.",
  short:
    "Amplificazione e gestione del suono per concerti, band, DJ set, eventi privati e aziendali di piccole e medie dimensioni.",
  bullets: [
    "Impianti audio per piccoli e medi eventi, dimensionati sul reale bisogno",
    "Microfonazione, monitor palco, sound check e mixaggio live",
    "Supporto tecnico audio durante concerto, festa o presentazione",
  ],
  hero: px(28643185, 1800, 1100), // audio engineer al mixer, evento outdoor
  card: px(39005236), // tecnico audio al mixer, evento indoor
  teaser: px(34585133), // diffusori PA all'aperto

  img: {
    mixerEvent: px(39005236), // tecnico al mixer durante un evento
    mixerBackstage: px(27795474), // sound tech alla console
    speakerStand: px(635928), // diffusore su stativo
    paOutdoor: px(34585133), // impianto PA esterno, cielo blu
    mic: px(164829), // microfono dinamico su stativo
    faders: px(59107), // close-up faders mixer
    drumsMics: px(11484397), // batteria microfonata sul palco
    band: px(7715754), // band dal vivo su piccolo palco
    jazz: px(8040838), // ensemble acustico chitarra e piano
    dj: px(9005483), // DJ al mixer
    corporate: px(8761548), // microfono a un convegno
    audience: px(8761524), // piccola conferenza, pubblico
    party: px(6173843), // festa privata con gente che balla
    show: px(12298227), // band in controluce in un club
  },

  intro: [
    "Realizzo servizi di amplificazione audio per eventi, musica live e spettacoli di piccole e medie dimensioni, mettendo a disposizione attrezzatura professionale, esperienza tecnica e una gestione attenta del suono.",
    "L'obiettivo è semplice: far suonare bene artisti, musicisti e relatori, in modo affidabile e senza sovradimensionare l'impianto rispetto alle reali esigenze dell'evento.",
  ],
  introPoints: [
    "Impianti proporzionati a location e pubblico",
    "Tecnico audio sul campo, dall'allestimento al finale",
    "Preventivi chiari, tempi rapidi, zero complicazioni",
  ],

  concepts: [
    "Impianti audio per piccoli e medi eventi",
    "Concerti e musica live",
    "Band e gruppi musicali",
    "DJ set e intrattenimento",
    "Eventi privati e aziendali",
    "Presentazioni e manifestazioni",
    "Spettacoli e iniziative culturali",
    "Feste e cerimonie",
    "Supporto tecnico audio",
    "Microfonazione e gestione del palco",
    "Sound check",
    "Mixaggio live",
  ],

  supply: [
    {
      icon: "speaker",
      title: "Impianto audio",
      text: "Diffusori e subwoofer dimensionati in base agli spazi, al numero di persone e al tipo di evento.",
    },
    {
      icon: "mic",
      title: "Microfoni",
      text: "Microfoni per voce, strumenti musicali, presentazioni e conferenze, con possibilità di utilizzare sistemi cablati e wireless in base alle necessità.",
    },
    {
      icon: "mixer",
      title: "Mixer e gestione del suono",
      text: "Console e sistema di mixaggio per gestire voce, strumenti, basi musicali e monitoraggio.",
    },
    {
      icon: "monitor",
      title: "Monitor palco",
      text: "Sistemi di monitoraggio per permettere ai musicisti di ascoltarsi correttamente durante la performance.",
    },
    {
      icon: "drum",
      title: "Microfonazione strumenti",
      text: "Soluzioni per batteria, amplificatori, strumenti acustici, tastiere, percussioni e altri strumenti presenti sul palco.",
    },
    {
      icon: "check",
      title: "Sound check",
      text: "Preparazione e controllo dell'impianto prima dell'inizio dell'evento, con regolazione dei livelli e del mix.",
    },
  ],

  gallery: [
    { img: px(164829), alt: "Microfono dinamico su stativo pronto per il sound check di un concerto live" },
    { img: px(59107), alt: "Fader di un mixer audio professionale durante il mixaggio di un evento live" },
    { img: px(11484397), alt: "Batteria microfonata sul palco di un piccolo concerto" },
    { img: px(34585133), alt: "Diffusori di un impianto audio per eventi installati all'aperto" },
    { img: px(8040838), alt: "Gruppo musicale acustico amplificato durante un live in sala" },
    { img: px(635928), alt: "Diffusore professionale su stativo per service audio di piccoli eventi" },
  ],

  eventTypes: [
    {
      emoji: "🎸",
      title: "Musica Live",
      text: "Band, gruppi acustici, cover band, tribute band e piccoli ensemble.",
      img: px(7715754),
      alt: "Band dal vivo su un piccolo palco amplificata da un service audio per concerti",
    },
    {
      emoji: "🎤",
      title: "Eventi e spettacoli",
      text: "Manifestazioni, spettacoli, eventi culturali e intrattenimento.",
      img: px(12298227),
      alt: "Spettacolo dal vivo in un locale con impianto audio gestito da un tecnico",
    },
    {
      emoji: "🏢",
      title: "Eventi aziendali",
      text: "Presentazioni, convention di piccole dimensioni, incontri e inaugurazioni.",
      img: px(8761524),
      alt: "Presentazione aziendale con impianto audio per relatori e pubblico",
    },
    {
      emoji: "🎉",
      title: "Eventi privati",
      text: "Feste, compleanni, ricevimenti e occasioni speciali.",
      img: px(6173843),
      alt: "Festa privata con musica amplificata e invitati che ballano",
    },
    {
      emoji: "🎧",
      title: "DJ Set",
      text: "Impianto audio e supporto tecnico per DJ e intrattenimento musicale.",
      img: px(9005483),
      alt: "DJ al mixer con impianto audio per eventi e intrattenimento musicale",
    },
    {
      emoji: "🎙️",
      title: "Conferenze e presentazioni",
      text: "Microfoni, diffusione sonora e gestione audio per relatori e ospiti.",
      img: px(8761548),
      alt: "Relatore con microfono durante una conferenza con diffusione sonora",
    },
  ],

  factors: [
    "numero di partecipanti",
    "dimensioni e caratteristiche della location",
    "tipo di musica o spettacolo",
    "numero di musicisti",
    "strumenti utilizzati",
    "necessità di monitoraggio",
    "durata dell'evento",
  ],
  tailoredText:
    "La configurazione viene scelta in funzione delle reali necessità: ogni elemento — diffusori, subwoofer, microfoni, monitor — entra in palco solo se serve un purpose. L'obiettivo è ottenere chiarezza, pressione sonora adeguata e affidabilità, evitando sia impianti insufficienti sia configurazioni inutilmente grandi e costose.",

  process: [
    {
      n: "01",
      title: "Analisi dell'evento",
      text: "Valutazione della location, del pubblico e delle esigenze tecniche.",
    },
    {
      n: "02",
      title: "Progettazione del setup",
      text: "Scelta dell'attrezzatura e configurazione dell'impianto.",
    },
    {
      n: "03",
      title: "Installazione e sound check",
      text: "Montaggio, cablaggio, posizionamento dei diffusori e verifica del sistema.",
    },
    {
      n: "04",
      title: "Gestione dell'evento",
      text: "Assistenza tecnica e gestione del suono durante la performance, quando richiesta.",
    },
  ],

  cta: {
    button: "RICHIEDI UN PREVENTIVO",
    text: "Raccontami che tipo di evento stai organizzando, dove si svolgerà e quante persone prevedi. Ti aiuterò a individuare la soluzione audio più adatta.",
  },

  faq: [
    {
      q: "Quanto costa un service audio per un evento?",
      a: "Il prezzo dipende da tre fattori: la dimensione dell'impianto, la durata dell'evento e le attrezzature richieste (microfoni wireless, monitor, subwoofer…). Raccontami l'evento — luogo, data, numero di partecipanti e tipo di musica — e riceverai un preventivo chiaro, gratuito e senza impegno, senza costi nascosti.",
    },
    {
      q: "Lavori solo a Palermo o anche altrove?",
      a: "La base è Palermo: seguo service audio per eventi in città e provincia, ma mi sposto volentieri in tutta la Sicilia per concerti, feste e manifestazioni. Indicami subito la location: è il primo dato per valutare logistica, tempi di montaggio e configurazione più adatta.",
    },
    {
      q: "Il mio evento è troppo piccolo per un service audio?",
      a: "Probabilmente no: mi occupo proprio di piccoli e medi eventi — compleanni, cerimonie, presentazioni aziendali, concerti nei club e DJ set. Esistono configurazioni compatte, eleganti ed economiche, perfette per feste private e spazi ridotti.",
    },
    {
      q: "Il tecnico audio è incluso o va previsto a parte?",
      a: "Nella maggior parte dei servizi il tecnico sono io: montaggio, sound check e gestione del suono durante l'evento sono parte del servizio. Per serate con più artisti o palchi più complessi definiamo insieme quanta assistenza tecnica serve, in modo trasparente.",
    },
    {
      q: "Quanto tempo serve per montare l'impianto e fare il sound check?",
      a: "Da un'ora e mezza a tre ore a seconda della complessità: la configurazione per una festa privata si allestisce in fretta, mentre una band completa con batteria microfonata e monitor palco richiede più tempo. I tempi vengono programmati in fase di progettazione, per essere pronti all'ora di apertura.",
    },
    {
      q: "Posso usare la mia attrezzatura o il mio tecnico di fiducia?",
      a: "Certo: posso integrare backline, mixer o microfoni della band nell'impianto, oppure collaborare con il tecnico del tuo gruppo. L'importante è saperlo in anticipo, così progettiamo insieme setup e collegamenti senza improvvisare il giorno dell'evento.",
    },
  ],

  seoNote: {
    title: "Service audio a Palermo e in Sicilia",
    text: "Cerchi un service audio a Palermo per un concerto, una festa o una presentazione? Questo service per band, gruppi musicali, DJ e privati offre impianti audio per piccoli e medi eventi: amplificazione per concerti nei club, nei cortili e nelle piazze, audio per eventi aziendali e privati, diffusione sonora per manifestazioni e iniziative culturali. Qualità professionale, costi equi e una produzione semplice, dall'installazione al mixaggio live.",
  },
};
