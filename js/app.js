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
const directDropdown = document.getElementById("solutionDropdown");
const directCompareButton = document.getElementById("directCompareButton");
const directCompareLabel = document.getElementById("directCompareLabel");
const directCompareMenu = document.getElementById("directCompareMenu");
let selectedDirectSolution = "";
const directOutput = document.getElementById("directCompareOutput");

function directValueClass(value){
  if(value==="Sí" || value==="Gratuita") return "yes";
  if(value==="No") return "no";
  if(value==="—") return "unknown";
  return "";
}

function renderDirectComparison(){
  if(!directOutput) return;
  const competitorName = selectedDirectSolution;

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
  selectedDirectSolution = "";
  if(directCompareLabel) directCompareLabel.textContent = "Selecciona tu solución";
  if(directDropdown) directDropdown.classList.remove("open");
  if(directCompareButton) directCompareButton.setAttribute("aria-expanded","false");
  directCompareMenu?.querySelectorAll("[data-solution]").forEach(item=>item.removeAttribute("aria-selected"));
  renderDirectComparison();
  directModal.classList.add("open");
  directModal.setAttribute("aria-hidden","false");
  document.body.classList.add("direct-compare-lock");
  setTimeout(()=>directCompareButton?.focus(),50);
}

function closeDirectCompare(){
  if(!directModal) return;
  directDropdown?.classList.remove("open");
  directCompareButton?.setAttribute("aria-expanded","false");
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
directCompareButton?.addEventListener("click",()=>{
  const isOpen = directDropdown?.classList.toggle("open");
  directCompareButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

directCompareMenu?.querySelectorAll("[data-solution]").forEach(item=>{
  item.addEventListener("click",()=>{
    selectedDirectSolution = item.dataset.solution || "";
    if(directCompareLabel) directCompareLabel.textContent = selectedDirectSolution;
    directCompareMenu.querySelectorAll("[data-solution]").forEach(opt=>{
      opt.setAttribute("aria-selected", opt === item ? "true" : "false");
    });
    directDropdown?.classList.remove("open");
    directCompareButton?.setAttribute("aria-expanded","false");
    renderDirectComparison();
  });
});

document.addEventListener("click",(event)=>{
  if(directDropdown && !directDropdown.contains(event.target)){
    directDropdown.classList.remove("open");
    directCompareButton?.setAttribute("aria-expanded","false");
  }
});
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


// === Administración local (prototipo visual) ===
const ADMIN_USERNAME = "rubencerlem";
const ADMIN_TEMP_HASH = "0d84b4b7af0c037af6afc02fca492725753d056e75de446ec8978642dc8fbed9";
const ADMIN_PASSWORD_HASH_KEY = "rcds_admin_password_hash_v1";
const ADMIN_PASSWORD_CHANGED_KEY = "rcds_admin_password_changed_v1";
const ADMIN_SESSION_KEY = "rcds_admin_session_v1";

const adminModal = document.getElementById("adminModal");
const adminLoginView = document.getElementById("adminLoginView");
const adminChangePasswordView = document.getElementById("adminChangePasswordView");
const adminDashboardView = document.getElementById("adminDashboardView");
const adminLoginStatus = document.getElementById("adminLoginStatus");
const adminPasswordStatus = document.getElementById("adminPasswordStatus");

async function adminHash(text){
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

function adminSessionActive(){
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
}

function showAdminLoggedInUI(){
  sessionStorage.setItem(ADMIN_SESSION_KEY,"1");
  if(adminLoginView) adminLoginView.hidden = true;
  if(adminChangePasswordView) adminChangePasswordView.hidden = true;
  if(adminDashboardView) adminDashboardView.hidden = false;
}

function resetAdminViews(){
  if(adminLoginView) adminLoginView.hidden = false;
  if(adminChangePasswordView) adminChangePasswordView.hidden = true;
  if(adminDashboardView) adminDashboardView.hidden = true;
  if(adminLoginStatus){ adminLoginStatus.textContent=""; adminLoginStatus.className="admin-status"; }
}

function openAdmin(){
  if(!adminModal) return;
  adminModal.classList.add("open");
  adminModal.setAttribute("aria-hidden","false");
  document.body.classList.add("admin-lock");
  if(adminSessionActive()) showAdminLoggedInUI(); else resetAdminViews();
  setTimeout(()=>document.getElementById("adminUsername")?.focus(),30);
}
function closeAdmin(){
  adminModal?.classList.remove("open");
  adminModal?.setAttribute("aria-hidden","true");
  document.body.classList.remove("admin-lock");
}

document.querySelectorAll("[data-open-admin]").forEach(el=>el.addEventListener("click",openAdmin));
document.querySelectorAll("[data-close-admin]").forEach(el=>el.addEventListener("click",closeAdmin));

document.getElementById("adminLoginButton")?.addEventListener("click",async()=>{
  const user = (document.getElementById("adminUsername")?.value || "").trim().toLowerCase();
  const pass = document.getElementById("adminPassword")?.value || "";
  const enteredHash = await adminHash(pass);
  const changed = localStorage.getItem(ADMIN_PASSWORD_CHANGED_KEY) === "1";
  const expectedHash = changed ? localStorage.getItem(ADMIN_PASSWORD_HASH_KEY) : ADMIN_TEMP_HASH;

  if(user !== ADMIN_USERNAME || !expectedHash || enteredHash !== expectedHash){
    adminLoginStatus.textContent = "Usuario o contraseña incorrectos.";
    adminLoginStatus.className = "admin-status error";
    return;
  }

  if(!changed){
    adminLoginView.hidden = true;
    adminChangePasswordView.hidden = false;
    document.getElementById("adminNewPassword")?.focus();
    return;
  }

  showAdminLoggedInUI();
});

["adminUsername","adminPassword"].forEach(id=>{
  document.getElementById(id)?.addEventListener("keydown",e=>{
    if(e.key==="Enter") document.getElementById("adminLoginButton")?.click();
  });
});

document.getElementById("adminSavePasswordButton")?.addEventListener("click",async()=>{
  const p1 = document.getElementById("adminNewPassword")?.value || "";
  const p2 = document.getElementById("adminConfirmPassword")?.value || "";
  if(p1.length < 10){
    adminPasswordStatus.textContent = "La nueva contraseña debe tener al menos 10 caracteres.";
    adminPasswordStatus.className = "admin-status error";
    return;
  }
  if(p1 !== p2){
    adminPasswordStatus.textContent = "Las contraseñas no coinciden.";
    adminPasswordStatus.className = "admin-status error";
    return;
  }
  localStorage.setItem(ADMIN_PASSWORD_HASH_KEY, await adminHash(p1));
  localStorage.setItem(ADMIN_PASSWORD_CHANGED_KEY, "1");
  adminPasswordStatus.textContent = "Contraseña actualizada.";
  adminPasswordStatus.className = "admin-status success";
  showAdminLoggedInUI();
});

document.getElementById("adminLogoutButton")?.addEventListener("click",()=>{
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  closeSale();
  resetAdminViews();
  if(adminLoginStatus){
    adminLoginStatus.textContent = "Sesión cerrada.";
    adminLoginStatus.className = "admin-status success";
  }
});

// === Parte de venta ===
const saleModal = document.getElementById("saleModal");
function openSale(){
  if(!adminSessionActive()) return openAdmin();
  saleModal?.classList.add("open");
  saleModal?.setAttribute("aria-hidden","false");
  document.body.classList.add("sale-lock");
}
function closeSale(){
  saleModal?.classList.remove("open");
  saleModal?.setAttribute("aria-hidden","true");
  document.body.classList.remove("sale-lock");
}

document.getElementById("adminOpenSaleButton")?.addEventListener("click",()=>{ closeAdmin(); openSale(); });
document.querySelectorAll("[data-close-sale]").forEach(el=>el.addEventListener("click",closeSale));

document.querySelectorAll(".sale-tab").forEach(tab=>tab.addEventListener("click",()=>{
  document.querySelectorAll(".sale-tab").forEach(t=>t.classList.remove("active"));
  tab.classList.add("active");
  const key = tab.dataset.saleTab;
  document.querySelectorAll(".sale-pane").forEach(p=>p.classList.remove("active"));
  const map = {form:"salePaneForm",implant:"salePaneImplant",original:"salePaneOriginal",send:"salePaneSend"};
  document.getElementById(map[key])?.classList.add("active");
}));

function makeRows(targetId,count,cols,prefix){
  const tbody = document.getElementById(targetId);
  if(!tbody || tbody.children.length) return;
  for(let r=0;r<count;r++){
    const tr=document.createElement("tr");
    for(let c=0;c<cols;c++){
      const td=document.createElement("td");
      const input=document.createElement("input");
      input.name=`${prefix}_${r+1}_${c+1}`;
      td.appendChild(input); tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}
makeRows("saleLines",6,6,"venta");
makeRows("implantLines",6,5,"implantacion");
makeRows("modificationLines",6,2,"modificacion");

document.querySelectorAll("[data-pdf-page]").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("[data-pdf-page]").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  const page=btn.dataset.pdfPage;
  const img=document.getElementById("pdfPagePreview");
  if(img){
    img.src=`assets/admin/parte-venta-pagina-${page}.png`;
    img.alt=`Página ${page} del parte de venta original`;
  }
}));

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    if(saleModal?.classList.contains("open")) closeSale();
    else if(adminModal?.classList.contains("open")) closeAdmin();
  }
});
