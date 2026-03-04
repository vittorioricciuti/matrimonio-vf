// Navigazione “a pagine” via hash
const pages = [...document.querySelectorAll('.page')];

function showPage(hash){
  const target = (hash || '#home').replace('#','');
  pages.forEach(p => p.classList.toggle('is-active', p.dataset.page === target));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('hashchange', () => showPage(location.hash));
showPage(location.hash);

// Countdown al matrimonio (18/07/2026 ore 16:00 - Italia)
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
setInterval(tick, 30_000);

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

if(copyBtn && ibanText){
  copyBtn.addEventListener('click', async () => {
    try{
      await copyToClipboard(ibanText.textContent.trim());
      if(toast) toast.textContent = 'IBAN copiato ✔';
      setTimeout(() => { if(toast) toast.textContent = ''; }, 2000);
    }catch(e){
      if(toast) toast.textContent = 'Non riesco a copiare: seleziona e copia manualmente.';
    }
  });
}
