const root=document.documentElement;
const toggle=document.getElementById('themeToggle');
const saved=localStorage.getItem('rc-theme');
if(saved==='dark'||saved==='light') root.dataset.theme=saved;
toggle?.addEventListener('click',()=>{
  const next=root.dataset.theme==='dark'?'light':'dark';
  root.dataset.theme=next;
  localStorage.setItem('rc-theme',next);
});

const comparisonToggle=document.querySelector('.comparison-toggle');
const comparisonPanel=document.getElementById('comparisonPanel');
comparisonToggle?.addEventListener('click',()=>{
  const open=comparisonToggle.getAttribute('aria-expanded')==='true';
  comparisonToggle.setAttribute('aria-expanded',String(!open));
  comparisonPanel.hidden=open;
});

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.main-nav a[href^="#"]')];
const observer=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible) return;
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id));
},{threshold:[.2,.5],rootMargin:'-20% 0px -55%'});
sections.forEach(s=>observer.observe(s));


// === Comparativa directa: solución del cliente vs eFirma GO ===
const directCompareData = {
  "eFirma GO": {
    trial:"Sí", initial:"60", annual:"108 €", from:"1,8 €", to:"0,158 €",
    api:"Gratuita", weight:"25 Mb", custody:"5 años", app:"Sí", editable:"Sí", inperson:"Sí"
  },
  "Logalty": {
    trial:"Sí", initial:"Recarga saldo", annual:"Recarga saldo", from:"Recarga saldo", to:"3 €",
    api:"—", weight:"1 Mb", custody:"2 años", app:"Sí", editable:"—", inperson:"No"
  },
  "Signaturit": {
    trial:"Sí", initial:"60", annual:"396 €", from:"6,6 €", to:"2,75 €",
    api:"Pago", weight:"15 Mb", custody:"5 años", app:"Sí", editable:"Sí", inperson:"No"
  },
  "Firmafy": {
    trial:"Sí", initial:"300", annual:"360 €", from:"1,2 €", to:"0,72 €",
    api:"Gratuita", weight:"—", custody:"10 años", app:"Sí", editable:"Sí", inperson:"Sí"
  },
  "Docusign": {
    trial:"Sí", initial:"60", annual:"108 €", from:"1,8 €", to:"4,56 €",
    api:"Pago", weight:"23,8 Mb", custody:"—", app:"Sí", editable:"Sí", inperson:"Sí"
  },
  "Click & Sign": {
    trial:"No", initial:"Recarga saldo", annual:"Recarga saldo", from:"1,43 €", to:"1,43 €",
    api:"Gratuita", weight:"25 Mb", custody:"5 años", app:"No", editable:"—", inperson:"No"
  },
  "Viafirma": {
    trial:"Sí", initial:"60", annual:"54 €", from:"0,9 €", to:"—",
    api:"Pago", weight:"—", custody:"—", app:"Sí", editable:"—", inperson:"—"
  },
  "Evicertia": {
    trial:"No", initial:"—", annual:"—", from:"—", to:"—",
    api:"Pago", weight:"3 Mb", custody:"1 año", app:"No", editable:"Sí", inperson:"Sí"
  },
  "Tecalis": {
    trial:"Sí", initial:"50", annual:"240 €", from:"4,8 €", to:"1,6 €",
    api:"Pago", weight:"25 Mb", custody:"5 años", app:"Sí", editable:"No", inperson:"No"
  },
  "YouSign": {
    trial:"Sí", initial:"—", annual:"300 €", from:"—", to:"—",
    api:"Pago", weight:"—", custody:"—", app:"Sí", editable:"Sí", inperson:"Sí"
  },
  "PandaDoc": {
    trial:"Sí", initial:"—", annual:"533 €", from:"—", to:"—",
    api:"Pago", weight:"—", custody:"—", app:"Sí", editable:"Sí", inperson:"Sí"
  },
  "EverSign": {
    trial:"Sí", initial:"—", annual:"460 €", from:"—", to:"—",
    api:"Pago", weight:"—", custody:"—", app:"Sí", editable:"Sí", inperson:"Sí"
  },
  "CocoSign": {
    trial:"Sí", initial:"—", annual:"180 €", from:"—", to:"—",
    api:"—", weight:"—", custody:"—", app:"Sí", editable:"No", inperson:"No"
  },
  "SignHost": {
    trial:"Sí", initial:"100", annual:"95 €", from:"—", to:"—",
    api:"Pago", weight:"—", custody:"—", app:"Sí", editable:"Sí", inperson:"Sí"
  },
  "Xodo Sign": {
    trial:"Sí", initial:"—", annual:"460 €", from:"—", to:"—",
    api:"Pago", weight:"—", custody:"—", app:"Sí", editable:"Sí", inperson:"Sí"
  }
};

const directCompareRows = [
  ["Prueba gratis","trial"],
  ["Firmas paquete inicial","initial"],
  ["Coste anual más bajo","annual"],
  ["Precio/doc. (desde)*","from"],
  ["Precio/doc. (hasta)*","to"],
  ["API","api"],
  ["Peso del envío","weight"],
  ["Custodia documental","custody"],
  ["App móvil","app"],
  ["Campos editables","editable"],
  ["Firma presencial","inperson"]
];

const directModal = document.getElementById("directCompareModal");
const directSelect = document.getElementById("directCompareSelect");
const directOutput = document.getElementById("directCompareOutput");

function directValueClass(value){
  if(value==="Sí" || value==="Gratuita") return "yes";
  if(value==="No") return "no";
  if(value==="—") return "unknown";
  return "";
}

function renderDirectComparison(){
  if(!directSelect || !directOutput) return;
  const competitorName = directSelect.value;

  if(!competitorName){
    directOutput.innerHTML = `
      <div class="compare-empty-state">
        Selecciona la solución que utilizas actualmente para ver la comparativa directa con eFirma GO.
      </div>`;
    return;
  }

  const competitor = directCompareData[competitorName];
  const efirma = directCompareData["eFirma GO"];
  if(!competitor) return;

  directOutput.innerHTML = `
    <table class="direct-compare-table">
      <thead>
        <tr>
          <th>Característica</th>
          <th>${competitorName}</th>
          <th class="efirma-col">eFirma GO</th>
        </tr>
      </thead>
      <tbody>
        ${directCompareRows.map(([label,key]) => `
          <tr>
            <td>${label}</td>
            <td><span class="direct-compare-value ${directValueClass(competitor[key])}">${competitor[key]}</span></td>
            <td class="efirma-col"><span class="direct-compare-value ${directValueClass(efirma[key])}">${efirma[key]}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>`;
}

function openDirectCompare(){
  if(!directModal) return;
  if(directSelect) directSelect.value = "";
  renderDirectComparison();
  directModal.classList.add("open");
  directModal.setAttribute("aria-hidden","false");
  document.body.classList.add("direct-compare-lock");
  setTimeout(()=>directSelect?.focus(),50);
}

function closeDirectCompare(){
  if(!directModal) return;
  directModal.classList.remove("open");
  directModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("direct-compare-lock");
}

document.querySelectorAll("[data-open-direct-compare]").forEach(el=>{
  el.addEventListener("click",openDirectCompare);
});
document.querySelectorAll("[data-close-direct-compare]").forEach(el=>{
  el.addEventListener("click",closeDirectCompare);
});
directSelect?.addEventListener("change",renderDirectComparison);
document.addEventListener("keydown",e=>{
  if(e.key==="Escape" && directModal?.classList.contains("open")) closeDirectCompare();
});


// === Envío del formulario de contacto a rubencerlemdigitalsolutions@gmail.com ===
const efirmaContactForm = document.getElementById('efirmaContactForm');
const contactFormStatus = document.getElementById('contactFormStatus');

if (efirmaContactForm) {
  efirmaContactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!efirmaContactForm.reportValidity()) return;

    const honeypot = efirmaContactForm.querySelector('[name="_honey"]');
    if (honeypot && honeypot.value) return;

    const submitButton = efirmaContactForm.querySelector('.contact-submit');
    efirmaContactForm.classList.add('is-sending');
    if (submitButton) submitButton.innerHTML = 'Enviando…';

    contactFormStatus.className = 'contact-form-status';
    contactFormStatus.textContent = 'Enviando tu consulta…';

    const formData = new FormData(efirmaContactForm);

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/rubencerlemdigitalsolutions@gmail.com',
        {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        }
      );

      if (!response.ok) throw new Error('No se pudo enviar el formulario');

      contactFormStatus.className = 'contact-form-status success';
      contactFormStatus.textContent = 'Consulta enviada correctamente. Te responderé por correo electrónico.';
      efirmaContactForm.reset();
    } catch (error) {
      contactFormStatus.className = 'contact-form-status error';
      contactFormStatus.textContent = 'No se ha podido enviar la consulta. Inténtalo de nuevo dentro de unos minutos.';
    } finally {
      efirmaContactForm.classList.remove('is-sending');
      if (submitButton) submitButton.innerHTML = 'Contactar <span>→</span>';
    }
  });
}
