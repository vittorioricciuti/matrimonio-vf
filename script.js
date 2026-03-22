const pages = [...document.querySelectorAll('.page')];
const pageIds = new Set(pages.map(p => p.dataset.page));

function showPage(pageName){
  pages.forEach(p => p.classList.toggle('is-active', p.dataset.page === pageName));
}

function handleRoute(hash, options = { scroll: true }) {
  const raw = (hash || '#home').replace('#', '');

  if (raw === 'programma') {
    showPage('home');
    if (options.scroll) {
      setTimeout(() => {
        document.getElementById('programma')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
    return;
  }

  if (pageIds.has(raw)) {
    showPage(raw);
    if (options.scroll) window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  showPage('home');
  if (options.scroll) window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('hashchange', () => handleRoute(location.hash));
handleRoute(location.hash, { scroll: false });

// Countdown
const weddingDate = new Date('2026-07-18T16:00:00+02:00');
const dEl = document.getElementById('cd-days');
const hEl = document.getElementById('cd-hours');
const mEl = document.getElementById('cd-mins');

function tick(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const mins = Math.floor((diff / (1000*60)) % 60);

  if(dEl) dEl.textContent = String(days);
  if(hEl) hEl.textContent = String(hours).padStart(2,'0');
  if(mEl) mEl.textContent = String(mins).padStart(2,'0');
}
tick();
setInterval(tick, 30000);

// Copia IBAN
const copyBtn = document.getElementById('copyIban');
const ibanText = document.getElementById('ibanText');
const toast = document.getElementById('toast');

async function copyToClipboard(text){
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const t = document.createElement('textarea');
  t.value = text;
  t.style.position = 'fixed';
  t.style.opacity = '0';
  document.body.appendChild(t);
  t.focus();
  t.select();
  document.execCommand('copy');
  t.remove();
}

const translations = {
  it: {
    menuCerimonia: "Cerimonia",
    menuRicevimento: "Ricevimento",
    menuAlloggi: "Alloggi",
    menuViaggio: "Viaggio di nozze",

    homeSubtitle: "Sono felici di annunciare il loro matrimonio",
    homeDate: "18 luglio 2026",
    homeTime: "ore 16:00",
    homeCtaRsvp: "Conferma presenza",
    homeCtaDetails: "Dettagli",
    homePhotoCaption: "Non vediamo l’ora di festeggiare insieme a voi!",

    countDays: "giorni",
    countHours: "ore",
    countMinutes: "minuti",

    programTitle: "Programma",
    programCeremonyTime: "16:00",
    programCeremonyLabel: "Cerimonia",
    programCeremonyDetail: "Chiesa San Giovanni Battista — Grottammare",
    programReceptionTime: "18:30",
    programReceptionLabel: "Ricevimento",
    programReceptionDetail: "Villa Boccabianca — Cupra Marittima",
    programNote: "Cena e festa a seguire presso Villa Boccabianca",

    ceremonyTitle: "Cerimonia",
    ceremonyPlaceLine: "Chiesa San Giovanni Battista — Grottammare (AP)",
    ceremonyPlace: "Chiesa San Giovanni Battista",
    ceremonyCity: "Grottammare (AP)",
    directionsTitle: "Come arrivare",
    parkingTitle: "Parcheggio",
    ceremonyDirections: "Uscire al casello di Grottammare, svoltare a destra su SP92/SS16 verso Sud, seguire le indicazioni per “Grottammare Alta” o “Paese Alto”, per la strada panoramica (Via Ischia I) fino al centro storico.",
    ceremonyParking: "Parcheggio consigliato: Via Palmaroli, 35, 63066 Grottammare (AP)",
    mapChurch: "Apri la chiesa su Google Maps",
    mapParking: "Apri il parcheggio su Google Maps",

    receptionTitle: "Ricevimento",
    receptionPlaceLine: "Villa Boccabianca — Cupra Marittima (AP)",
    receptionPlace: "Villa Boccabianca",
    receptionCity: "Cupra Marittima (AP)",
    receptionDirections: "Dopo la cerimonia i festeggiamenti proseguiranno presso Villa Boccabianca. Dalla Chiesa, uscire da Piazza Peretti (Grottammare Alta) e scendere verso la costa imboccando la SS16 Adriatica in direzione nord (Cupra Marittima/Ancona). Proseguire sulla SS16 per circa 4-5 km, superato il centro abitato di Cupra Marittima, seguire le indicazioni per Contrada Bocca Bianca, 28.",
    receptionParking: "Parcheggio disponibile direttamente presso la villa",
    mapVilla: "Apri la villa su Google Maps",

    accommodationTitle: "Alloggi",
    accommodationSubtitle: "Una soluzione convenzionata per chi desidera pernottare nei dintorni",
    accommodationIntro: "Nelle vicinanze di Villa Boccabianca sono presenti diverse strutture ricettive. Per chi lo desiderasse, abbiamo tuttavia concordato una tariffa agevolata presso il seguente hotel:",
    hotelLabel: "Hotel",
    rateDoubleLabel: "Camera doppia / matrimoniale",
    rateDoubleValue: "€80 a notte",
    rateTripleLabel: "Camera tripla",
    rateTripleValue: "€100 a notte",
    hotelWebsiteButton: "Visita il sito dell’hotel",
    accommodationBenefits: "La tariffa include la colazione e l’accesso gratuito alla spiaggia dello stabilimento balneare Minonda, situato proprio di fronte all’Hotel Timone.",
    accommodationBooking: "Al momento della prenotazione vi chiediamo gentilmente di specificare che si tratta della tariffa convenzionata concordata in occasione del nostro matrimonio.",

    rsvpDeadline: "È gradita conferma entro il <strong>1 giugno 2026</strong>",
    rsvpTitle: "Conferma presenza",
    rsvpText: "Clicca sul pulsante qui sotto per compilare il modulo.",
    rsvpButton: "Rispondi qui",

    honeymoonTitle: "Viaggio di nozze",
    honeymoonText: "Il regalo più prezioso sarà avervi con noi nel giorno più importante della nostra vita. Per chi lo desiderasse, è possibile contribuire al nostro viaggio di nozze seguendo le indicazioni riportate qui sotto.",
    ibanHolderLabel: "Intestatario",
    ibanReasonLabel: "Causale",
    ibanReasonValue: "Viaggio di nozze - vostro Nome e Cognome",
    copyIban: "Copia IBAN",
    toastCopied: "IBAN copiato ✔",
    toastFail: "Non riesco a copiare: seleziona e copia manualmente."
  },

  en: {
    menuCerimonia: "Ceremony",
    menuRicevimento: "Reception",
    menuAlloggi: "Accommodation",
    menuViaggio: "Honeymoon",

    homeSubtitle: "Are delighted to announce their wedding",
    homeDate: "July 18th 2026",
    homeTime: "4:00 PM",
    homeCtaRsvp: "RSVP",
    homeCtaDetails: "Details",
    homePhotoCaption: "We can’t wait to celebrate with you!",

    countDays: "days",
    countHours: "hours",
    countMinutes: "minutes",

    programTitle: "Schedule",
    programCeremonyTime: "4:00 PM",
    programCeremonyLabel: "Ceremony",
    programCeremonyDetail: "Church of San Giovanni Battista — Grottammare",
    programReceptionTime: "6:30 PM",
    programReceptionLabel: "Reception",
    programReceptionDetail: "Villa Boccabianca — Cupra Marittima",
    programNote: "Dinner and party to follow at Villa Boccabianca",

    ceremonyTitle: "Ceremony",
    ceremonyPlaceLine: "Church of San Giovanni Battista — Grottammare (AP)",
    ceremonyPlace: "Church of San Giovanni Battista",
    ceremonyCity: "Grottammare (AP)",
    directionsTitle: "Directions",
    parkingTitle: "Parking",
    ceremonyDirections: "Take the Grottammare exit from the highway, turn right onto SP92/SS16 heading south, then follow the signs for “Grottammare Alta” or “Paese Alto” along the panoramic road (Via Ischia I) to the historic centre.",
    ceremonyParking: "Suggested parking: Via Palmaroli, 35, 63066 Grottammare (AP)",
    mapChurch: "Open church in Google Maps",
    mapParking: "Open parking in Google Maps",

    receptionTitle: "Reception",
    receptionPlaceLine: "Villa Boccabianca — Cupra Marittima (AP)",
    receptionPlace: "Villa Boccabianca",
    receptionCity: "Cupra Marittima (AP)",
    receptionDirections: "After the ceremony, the celebrations will continue at Villa Boccabianca. From the church, leave Piazza Peretti (Grottammare Alta) and head down towards the coast, joining the SS16 Adriatica road northbound towards Cupra Marittima / Ancona. Continue for about 4–5 km. After passing the town of Cupra Marittima, follow the signs for Contrada Bocca Bianca, 28.",
    receptionParking: "Parking is available directly at the villa",
    mapVilla: "Open villa in Google Maps",

    accommodationTitle: "Accommodation",
    accommodationSubtitle: "A special hotel rate for guests wishing to stay nearby",
    accommodationIntro: "Several accommodation options are available near Villa Boccabianca. For those who wish, we have arranged a special rate at the following hotel:",
    hotelLabel: "Hotel",
    rateDoubleLabel: "Double room",
    rateDoubleValue: "€80 per night",
    rateTripleLabel: "Triple room",
    rateTripleValue: "€100 per night",
    hotelWebsiteButton: "Visit the hotel website",
    accommodationBenefits: "The rate includes breakfast and free access to the beach of the Minonda beach club, located directly opposite Hotel Timone.",
    accommodationBooking: "When booking, please specify that you would like to use the special rate arranged for our wedding.",

    rsvpDeadline: "Kindly confirm your attendance by <strong>June 1st, 2026</strong>",
    rsvpTitle: "RSVP",
    rsvpText: "Please click the button below to fill in the form.",
    rsvpButton: "RSVP here",

    honeymoonTitle: "Honeymoon",
    honeymoonText: "Your presence on our special day will be the most precious gift of all. For those who wish, you may contribute to our honeymoon using the details below.",
    ibanHolderLabel: "Account holder",
    ibanReasonLabel: "Reference",
    ibanReasonValue: "Honeymoon - your name",
    copyIban: "Copy IBAN",
    toastCopied: "IBAN copied ✔",
    toastFail: "Unable to copy: please select and copy manually."
  }
};

function applyLanguage(lang){
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.getElementById('lang-it')?.classList.toggle('active', lang === 'it');
  document.getElementById('lang-en')?.classList.toggle('active', lang === 'en');

  localStorage.setItem('siteLanguage', lang);
}

document.getElementById('lang-it')?.addEventListener('click', () => applyLanguage('it'));
document.getElementById('lang-en')?.addEventListener('click', () => applyLanguage('en'));

const savedLang = localStorage.getItem('siteLanguage') || 'it';
applyLanguage(savedLang);

if(copyBtn && ibanText){
  copyBtn.addEventListener('click', async () => {
    const currentLang = localStorage.getItem('siteLanguage') || 'it';
    try{
      await copyToClipboard(ibanText.textContent.trim());
      if(toast) toast.textContent = translations[currentLang].toastCopied;
      setTimeout(() => { if(toast) toast.textContent = ''; }, 2000);
    }catch(e){
      if(toast) toast.textContent = translations[currentLang].toastFail;
    }
  });
}
