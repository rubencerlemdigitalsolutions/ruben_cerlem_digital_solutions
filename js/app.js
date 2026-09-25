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



// === Comparativa V3: Signaturit / DocuSign / Otros ===
const otherSolutionField = document.getElementById("otherSolutionField");
const otherSolutionName = document.getElementById("otherSolutionName");

function resolveOtherSolutionName(){
  return (otherSolutionName?.value || "").trim();
}

function updateOtherSolutionUI(){
  const isOther = selectedDirectSolution === "Otros";
  if(otherSolutionField) otherSolutionField.hidden = !isOther;
  if(!isOther && otherSolutionName) otherSolutionName.value = "";
}

function renderDirectComparison(){
  if(!directOutput) return;
  let competitorName = selectedDirectSolution;

  if(!competitorName){
    directOutput.innerHTML = `
      <div class="compare-empty-state">
        Selecciona Signaturit, DocuSign u Otros para ver la comparativa directa con eFirma GO.
      </div>`;
    return;
  }

  if(competitorName === "Otros"){
    const typedName = resolveOtherSolutionName();

    if(!typedName){
      directOutput.innerHTML = `
        <div class="compare-empty-state">
          Escribe el nombre de la solución que utilizas actualmente.
        </div>`;
      return;
    }

    const knownKey = Object.keys(directCompareData).find(
      key => key.toLowerCase() === typedName.toLowerCase()
    );

    if(knownKey){
      competitorName = knownKey;
    }else{
      const efirma = directCompareData["eFirma GO"];
      directOutput.innerHTML = `
        <div class="compare-custom-name">
          Comparando <strong>${typedName}</strong> con <strong>eFirma GO</strong>
        </div>
        <table class="direct-compare-table">
          <thead>
            <tr>
              <th>Característica</th>
              <th>${typedName}</th>
              <th class="efirma-col">eFirma GO</th>
            </tr>
          </thead>
          <tbody>
            ${directCompareRows.map(([label,key]) => `
              <tr>
                <td>${label}</td>
                <td><span class="direct-compare-value unknown">No indicado</span></td>
                <td class="efirma-col">
                  <span class="direct-compare-value ${directValueClass(efirma[key])}">${efirma[key]}</span>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <div class="compare-custom-note">
          No tenemos todavía datos cargados para ${typedName}. Puedes enviarnos el nombre de la solución y revisaremos sus características.
        </div>`;
      return;
    }
  }

  const competitor = directCompareData[competitorName];
  const efirma = directCompareData["eFirma GO"];
  if(!competitor) return;

  const displayName = competitorName === "Docusign" ? "DocuSign" : competitorName;

  directOutput.innerHTML = `
    <table class="direct-compare-table">
      <thead>
        <tr>
          <th>Característica</th>
          <th>${displayName}</th>
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
  if(otherSolutionField) otherSolutionField.hidden = true;
  if(otherSolutionName) otherSolutionName.value = "";
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
    if(directCompareLabel) directCompareLabel.textContent = selectedDirectSolution === "Docusign" ? "DocuSign" : selectedDirectSolution;
    updateOtherSolutionUI();
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


// === Administración local V4 ===
const ADMIN_USERNAME = "rubencerlem";
const ADMIN_TEMP_HASH = "0e137a13d0061b9353e85e78228414cd75466b4bd09fbf8fa0e6005f9a35009f";
const ADMIN_PASSWORD_HASH_KEY = "rcds_admin_password_hash_v4";
const ADMIN_PASSWORD_CHANGED_KEY = "rcds_admin_password_changed_v4";
const ADMIN_SESSION_KEY = "rcds_admin_session_v4";

const adminModal = document.getElementById("adminModal");
const adminLoginView = document.getElementById("adminLoginView");
const adminResetAuthView = document.getElementById("adminResetAuthView");
const adminChangePasswordView = document.getElementById("adminChangePasswordView");
const adminDashboardView = document.getElementById("adminDashboardView");
const adminLoginStatus = document.getElementById("adminLoginStatus");
const adminResetStatus = document.getElementById("adminResetStatus");
const adminPasswordStatus = document.getElementById("adminPasswordStatus");
let adminPasswordChangeMode = "first-use";

async function adminHash(text){
  const data = new TextEncoder().encode(String(text||""));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
function adminSessionActive(){ return sessionStorage.getItem(ADMIN_SESSION_KEY)==="1"; }
function hideAllAdminViews(){
  if(adminLoginView) adminLoginView.hidden=true;
  if(adminResetAuthView) adminResetAuthView.hidden=true;
  if(adminChangePasswordView) adminChangePasswordView.hidden=true;
  if(adminDashboardView) adminDashboardView.hidden=true;
}
function showLoginView(message="",type=""){
  hideAllAdminViews();
  adminLoginView.hidden=false;
  document.getElementById("adminUsername").value="";
  document.getElementById("adminPassword").value="";
  adminLoginStatus.textContent=message;
  adminLoginStatus.className="admin-status"+(type?" "+type:"");
}
function showPasswordChangeView(mode){
  adminPasswordChangeMode=mode;
  hideAllAdminViews();
  adminChangePasswordView.hidden=false;
  const title=document.getElementById("adminPasswordChangeTitle");
  const help=document.getElementById("adminPasswordChangeHelp");
  document.getElementById("adminNewPassword").value="";
  document.getElementById("adminConfirmPassword").value="";
  adminPasswordStatus.textContent="";
  adminPasswordStatus.className="admin-status";
  if(mode==="reset"){
    title.textContent="Restablecer contraseña";
    help.textContent="Introduce y confirma la nueva contraseña.";
  } else {
    title.textContent="Cambia la contraseña temporal";
    help.textContent="Este paso aparece únicamente en el primer acceso.";
  }
}
function showDashboardView(){
  sessionStorage.setItem(ADMIN_SESSION_KEY,"1");
  hideAllAdminViews();
  adminDashboardView.hidden=false;
}
function openAdmin(){
  adminModal.classList.add("open");
  adminModal.setAttribute("aria-hidden","false");
  document.body.classList.add("admin-lock");
  adminSessionActive()?showDashboardView():showLoginView();
}
function closeAdmin(){
  adminModal.classList.remove("open");
  adminModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("admin-lock");
}
document.querySelectorAll("[data-open-admin]").forEach(el=>el.addEventListener("click",openAdmin));
document.querySelectorAll("[data-close-admin]").forEach(el=>el.addEventListener("click",closeAdmin));

document.getElementById("adminLoginButton").addEventListener("click",async()=>{
  const u=document.getElementById("adminUsername").value.trim().toLowerCase().replace(/\s+/g,"");
  const p=document.getElementById("adminPassword").value;
  const changed=localStorage.getItem(ADMIN_PASSWORD_CHANGED_KEY)==="1";
  const saved=localStorage.getItem(ADMIN_PASSWORD_HASH_KEY);
  const expected=(changed&&saved)?saved:ADMIN_TEMP_HASH;
  if(u!==ADMIN_USERNAME || await adminHash(p)!==expected){
    adminLoginStatus.textContent="Usuario o contraseña incorrectos.";
    adminLoginStatus.className="admin-status error";
    return;
  }
  if(!changed) showPasswordChangeView("first-use");
  else showDashboardView();
});
["adminUsername","adminPassword"].forEach(id=>document.getElementById(id).addEventListener("keydown",e=>{
  if(e.key==="Enter") document.getElementById("adminLoginButton").click();
}));

document.getElementById("adminSavePasswordButton").addEventListener("click",async()=>{
  const p1=document.getElementById("adminNewPassword").value;
  const p2=document.getElementById("adminConfirmPassword").value;
  if(p1.length<8){ adminPasswordStatus.textContent="La nueva contraseña debe tener al menos 8 caracteres.";adminPasswordStatus.className="admin-status error";return; }
  if(p1!==p2){ adminPasswordStatus.textContent="Las contraseñas no coinciden.";adminPasswordStatus.className="admin-status error";return; }
  localStorage.setItem(ADMIN_PASSWORD_HASH_KEY,await adminHash(p1));
  localStorage.setItem(ADMIN_PASSWORD_CHANGED_KEY,"1");
  showDashboardView();
});

document.getElementById("adminResetLink").addEventListener("click",()=>{
  hideAllAdminViews();adminResetAuthView.hidden=false;
});
document.getElementById("adminResetCancelButton").addEventListener("click",()=>showLoginView());
document.getElementById("adminResetVerifyButton").addEventListener("click",async()=>{
  const u=document.getElementById("adminResetUsername").value.trim().toLowerCase().replace(/\s+/g,"");
  const p=document.getElementById("adminResetCurrentPassword").value;
  const changed=localStorage.getItem(ADMIN_PASSWORD_CHANGED_KEY)==="1";
  const saved=localStorage.getItem(ADMIN_PASSWORD_HASH_KEY);
  if(!changed||!saved||u!==ADMIN_USERNAME||await adminHash(p)!==saved){
    adminResetStatus.textContent="Usuario o contraseña actual incorrectos.";
    adminResetStatus.className="admin-status error";return;
  }
  sessionStorage.setItem(ADMIN_SESSION_KEY,"1");
  showPasswordChangeView("reset");
});
document.getElementById("adminLogoutButton").addEventListener("click",()=>{
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  closeSale();
  showLoginView("Sesión cerrada.","success");
});

// === Parte de venta ===
const saleModal = document.getElementById("saleModal");
function openSale(){
  if(!adminSessionActive()){
    openAdmin();
    showLoginView("Debes iniciar sesión como administrador para abrir el parte de venta.","error");
    return;
  }
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
  const map = {
    form:"salePaneForm",
    implant:"salePaneImplant",
    original:"salePaneOriginal",
    extract:"salePaneExtract",
    client:"salePaneClient",
    cegid:"salePaneCegid"
  };
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


// === PDF cumplimentado, numeración interna y flujo Cliente -> CEGID ===
let filledPdfBytes = null;
let filledPdfUrl = null;
let signedPdfBytes = null;
let signedPdfName = "";
let currentClientNumber = null;

const clientCounterKey = "rcds_sale_client_counter_v1";
const clientRegistryKey = "rcds_sale_client_registry_v1";

function getNextClientNumber(){
  let current = Number(localStorage.getItem(clientCounterKey) || "0");
  current += 1;
  localStorage.setItem(clientCounterKey, String(current));
  return current;
}

function getClientRegistry(){
  try { return JSON.parse(localStorage.getItem(clientRegistryKey) || "[]"); }
  catch { return []; }
}

function saveClientRegistryEntry(entry){
  const registry = getClientRegistry();
  const existing = registry.findIndex(x => x.number === entry.number);
  if(existing >= 0) registry[existing] = entry;
  else registry.push(entry);
  localStorage.setItem(clientRegistryKey, JSON.stringify(registry));
}

function ensureClientNumber(){
  if(currentClientNumber) return currentClientNumber;
  currentClientNumber = getNextClientNumber();
  const el = document.getElementById("saleClientNumber");
  if(el) el.textContent = `Cliente nº ${currentClientNumber}`;
  return currentClientNumber;
}

function saleFormValues(){
  const form = document.getElementById("saleForm");
  return Object.fromEntries(new FormData(form).entries());
}

function collectTableValues(tbodyId){
  const rows = [...document.querySelectorAll(`#${tbodyId} tr`)];
  return rows.map(row => [...row.querySelectorAll("input")].map(input => input.value.trim()));
}

function truncateText(text, max=34){
  text = String(text || "");
  return text.length > max ? text.slice(0,max-1) + "…" : text;
}

function drawField(page, font, text, x, y, size=8, maxWidth=200){
  text = String(text || "").trim();
  if(!text) return;
  let s = size;
  while(s > 5 && font.widthOfTextAtSize(text,s) > maxWidth) s -= .25;
  page.drawText(text,{x,y,size:s,font,color:PDFLib.rgb(0.08,0.11,0.16)});
}

function drawMultiline(page, font, text, x, y, maxWidth, lineHeight=11, maxLines=7, size=8){
  text = String(text || "").trim();
  if(!text) return;
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for(const word of words){
    const test = line ? `${line} ${word}` : word;
    if(font.widthOfTextAtSize(test,size) <= maxWidth) line = test;
    else {
      if(line) lines.push(line);
      line = word;
      if(lines.length >= maxLines-1) break;
    }
  }
  if(line && lines.length < maxLines) lines.push(line);
  lines.slice(0,maxLines).forEach((ln,i)=>page.drawText(ln,{
    x,y:y-(i*lineHeight),size,font,color:PDFLib.rgb(0.08,0.11,0.16)
  }));
}

async function buildFilledPdf(){
  if(!window.PDFLib) throw new Error("No se ha podido cargar el motor PDF.");
  const response = await fetch("assets/admin/parte-venta-completo.pdf");
  if(!response.ok) throw new Error("No se pudo cargar el PDF original.");
  const source = await response.arrayBuffer();

  const pdfDoc = await PDFLib.PDFDocument.load(source,{ignoreEncryption:true});
  try { pdfDoc.getForm().flatten(); } catch(e) {}
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const p1 = pages[0];
  const p3 = pages[2];
  const v = saleFormValues();

  // Hoja 1 - Datos cliente
  drawField(p1,font,v.cod_empresa,461,726,8,82);
  drawField(p1,font,v.cliente_nombre,181,712,8,191);
  drawField(p1,font,v.cliente_nif,422,712,8,121);
  drawField(p1,font,v.cliente_domicilio,112,698,8,430);
  drawField(p1,font,v.cliente_cp,135,684,8,57);
  drawField(p1,font,v.cliente_poblacion,260,684,8,112);
  drawField(p1,font,v.cliente_provincia,431,684,8,112);
  drawField(p1,font,v.cliente_telefonos,115,670,8,257);
  drawField(p1,font,v.cliente_email,412,670,8,131);
  drawField(p1,font,v.representante_nombre,142,655,8,230);
  drawField(p1,font,v.representante_nif,403,655,8,140);
  drawField(p1,font,v.firma_movil,92,613,8,135);
  drawField(p1,font,v.firma_email,272,613,8,270);

  // Tabla licencia/mantenimiento
  const saleRows = collectTableValues("saleLines");
  const yRows = [552,538,524,510,496,482];
  saleRows.slice(0,6).forEach((r,i)=>{
    const y=yRows[i];
    drawField(p1,font,r[0],52,y,7,106);
    drawField(p1,font,r[1],165,y,7,130);
    drawField(p1,font,r[2],302,y,7,61);
    drawField(p1,font,r[3],369,y,7,63);
    drawField(p1,font,r[4],438,y,7,74);
    drawField(p1,font,r[5],516,y,6.5,28);
  });
  drawField(p1,font,v.importe_total,165,436,8,130);
  drawMultiline(p1,font,v.notas,104,371,438,14,7,8);
  drawMultiline(p1,font,v.forma_pago,163,253,378,14,3,8);
  drawMultiline(p1,font,v.domicilio_pago,163,195,378,14,2,8);
  drawField(p1,font,v.fecha,399,148,8,143);

  // Hoja 3 - Implantación
  const implantRows = collectTableValues("implantLines");
  const iy = [739,724,709,694,679,664];
  implantRows.slice(0,6).forEach((r,i)=>{
    const y=iy[i];
    drawField(p3,font,r[0],34,y,7,88);
    drawField(p3,font,r[1],128,y,7,129);
    drawField(p3,font,r[2],262,y,7,63);
    drawField(p3,font,r[3],331,y,7,100);
    drawField(p3,font,r[4],437,y,7,84);
  });

  const modRows = collectTableValues("modificationLines");
  const my = [266,251,236,221,206,191];
  modRows.slice(0,6).forEach((r,i)=>{
    const y=my[i];
    drawField(p3,font,r[0],31,y,7,107);
    drawField(p3,font,r[1],141,y,7,380);
  });

  return await pdfDoc.save();
}

function setPdfButtonsEnabled(enabled){
  [
    "openFilledPdfButton","downloadFullPdfButton","downloadPage1Button",
    "downloadPage2Button","downloadPage3Button","clientDownloadPdfButton","clientEmailDraftButton"
  ].forEach(id=>{
    const el=document.getElementById(id); if(el) el.disabled=!enabled;
  });
}

function makeBlobUrl(bytes, type="application/pdf"){
  return URL.createObjectURL(new Blob([bytes],{type}));
}

function downloadBytes(bytes, filename){
  const url=makeBlobUrl(bytes);
  const a=document.createElement("a");
  a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),3000);
}

async function extractSinglePage(pageIndex){
  const srcDoc = await PDFLib.PDFDocument.load(filledPdfBytes);
  const outDoc = await PDFLib.PDFDocument.create();
  const [copied] = await outDoc.copyPages(srcDoc,[pageIndex]);
  outDoc.addPage(copied);
  return await outDoc.save();
}

document.getElementById("transferToPdfButton")?.addEventListener("click",async()=>{
  const status=document.getElementById("transferPdfStatus");
  try{
    status.textContent="Generando documento cumplimentado…";
    status.className="sale-action-status";
    ensureClientNumber();
    filledPdfBytes = await buildFilledPdf();
    if(filledPdfUrl) URL.revokeObjectURL(filledPdfUrl);
    filledPdfUrl = makeBlobUrl(filledPdfBytes);
    setPdfButtonsEnabled(true);

    const values=saleFormValues();
    const clientEmail=document.getElementById("clientSendEmail");
    if(clientEmail && !clientEmail.value) clientEmail.value=values.cliente_email||"";

    saveClientRegistryEntry({
      number: currentClientNumber,
      client: values.cliente_nombre || "",
      nif: values.cliente_nif || "",
      email: values.cliente_email || "",
      updatedAt: new Date().toISOString()
    });

    status.textContent=`Datos traspasados al PDF original. Cliente nº ${currentClientNumber}.`;
    status.className="sale-action-status success";
  }catch(err){
    console.error(err);
    status.textContent="No se pudo generar el PDF cumplimentado.";
    status.className="sale-action-status error";
  }
});

document.getElementById("openFilledPdfButton")?.addEventListener("click",()=>{
  if(filledPdfUrl) window.open(filledPdfUrl,"_blank","noopener");
});

document.getElementById("downloadFullPdfButton")?.addEventListener("click",()=>{
  if(!filledPdfBytes) return;
  const n=currentClientNumber||"sin-numero";
  downloadBytes(filledPdfBytes,`parte-venta-cliente-${n}.pdf`);
});
document.getElementById("clientDownloadPdfButton")?.addEventListener("click",()=>{
  if(!filledPdfBytes) return;
  const n=currentClientNumber||"sin-numero";
  downloadBytes(filledPdfBytes,`parte-venta-cliente-${n}-para-firma.pdf`);
});
document.getElementById("downloadPage1Button")?.addEventListener("click",async()=>{
  if(!filledPdfBytes) return; downloadBytes(await extractSinglePage(0),`parte-venta-hoja-1-cliente-${currentClientNumber}.pdf`);
});
document.getElementById("downloadPage2Button")?.addEventListener("click",async()=>{
  if(!filledPdfBytes) return; downloadBytes(await extractSinglePage(1),`parte-venta-hoja-2-cliente-${currentClientNumber}.pdf`);
});
document.getElementById("downloadPage3Button")?.addEventListener("click",async()=>{
  if(!filledPdfBytes) return; downloadBytes(await extractSinglePage(2),`parte-venta-hoja-3-cliente-${currentClientNumber}.pdf`);
});

document.getElementById("clientEmailDraftButton")?.addEventListener("click",()=>{
  if(!filledPdfBytes) return;
  const email=document.getElementById("clientSendEmail")?.value.trim()||"";
  const subject=document.getElementById("clientSendSubject")?.value.trim()||"Documentación para firma";
  const body="Adjunto la documentación correspondiente para su revisión y firma. Una vez firmada, por favor remítamela de vuelta.";
  window.location.href=`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("signedPdfInput")?.addEventListener("change",async(e)=>{
  const file=e.target.files?.[0];
  const status=document.getElementById("signedPdfStatus");
  const confirm=document.getElementById("signedPdfConfirmed");
  if(!file){
    signedPdfBytes=null;signedPdfName="";confirm.disabled=true;confirm.checked=false;
    if(status) status.textContent="";
    return;
  }
  signedPdfBytes=new Uint8Array(await file.arrayBuffer());
  signedPdfName=file.name;
  confirm.disabled=false;
  confirm.checked=false;
  if(status) status.textContent=`Documento cargado: ${file.name}. Confirma que está firmado.`;
});

document.getElementById("signedPdfConfirmed")?.addEventListener("change",(e)=>{
  const ok=Boolean(e.target.checked && signedPdfBytes);
  document.getElementById("downloadSignedForCegidButton").disabled=!ok;
  document.getElementById("cegidEmailDraftButton").disabled=!ok;
  const status=document.getElementById("signedPdfStatus");
  if(status && ok){
    status.textContent="Documento firmado confirmado. Ya puedes preparar el envío a CEGID.";
    status.className="sale-action-status success";
  }
});

document.getElementById("downloadSignedForCegidButton")?.addEventListener("click",()=>{
  if(!signedPdfBytes) return;
  downloadBytes(signedPdfBytes,signedPdfName||`parte-venta-firmado-cliente-${currentClientNumber}.pdf`);
});

document.getElementById("cegidEmailDraftButton")?.addEventListener("click",()=>{
  if(!signedPdfBytes) return;
  const to=document.getElementById("cegidRecipientEmail")?.value.trim()||"";
  const body=`Adjunto parte de venta firmado. Referencia interna: Cliente nº ${currentClientNumber||""}.`;
  window.location.href=`mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent("Parte de venta firmado")}&body=${encodeURIComponent(body)}`;
});

setPdfButtonsEnabled(false);


// === Solicitudes de demo y disponibilidad ===
const DEMO_AVAILABILITY_KEY = "rcds_demo_availability_v1";
const demoModal = document.getElementById("demoModal");
const demoProduct = document.getElementById("demoProduct");
const demoSlots = document.getElementById("demoSlots");
const demoEmpty = document.getElementById("demoEmpty");
const demoSelectedSlot = document.getElementById("demoSelectedSlot");
const demoSubmitButton = document.getElementById("demoSubmitButton");
const demoRequestForm = document.getElementById("demoRequestForm");
const demoStatus = document.getElementById("demoStatus");

function getDemoAvailability(){
  try{return JSON.parse(localStorage.getItem(DEMO_AVAILABILITY_KEY)||"[]")}
  catch{return []}
}
function setDemoAvailability(data){
  localStorage.setItem(DEMO_AVAILABILITY_KEY,JSON.stringify(data));
}
function formatDemoSlot(slot){
  const d=new Date(slot.date+"T"+slot.time);
  if(Number.isNaN(d.getTime())) return `${slot.date} · ${slot.time}`;
  return new Intl.DateTimeFormat("es-ES",{
    weekday:"short",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"
  }).format(d);
}
function renderDemoSlots(){
  if(!demoProduct||!demoSlots) return;
  const product=demoProduct.value;
  const all=getDemoAvailability()
    .filter(x=>!product||x.product===product)
    .filter(x=>new Date(x.date+"T"+x.time)>=new Date())
    .sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));

  demoSlots.innerHTML="";
  demoSelectedSlot.value="";
  demoSubmitButton.disabled=true;
  demoEmpty.style.display=all.length?"none":"block";

  all.forEach(slot=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="demo-slot";
    b.textContent=formatDemoSlot(slot);
    b.addEventListener("click",()=>{
      demoSlots.querySelectorAll(".demo-slot").forEach(x=>x.classList.remove("selected"));
      b.classList.add("selected");
      demoSelectedSlot.value=`${slot.product} | ${slot.date} | ${slot.time}`;
      demoSubmitButton.disabled=false;
    });
    demoSlots.appendChild(b);
  });
}
function openDemo(product=""){
  if(!demoModal) return;
  demoModal.classList.add("open");
  demoModal.setAttribute("aria-hidden","false");
  document.body.classList.add("demo-lock");
  if(demoProduct){
    demoProduct.value=product&&[...demoProduct.options].some(o=>o.value===product)?product:"";
  }
  renderDemoSlots();
}
function closeDemo(){
  demoModal?.classList.remove("open");
  demoModal?.setAttribute("aria-hidden","true");
  document.body.classList.remove("demo-lock");
}
document.querySelectorAll("[data-request-demo]").forEach(btn=>btn.addEventListener("click",()=>openDemo(btn.dataset.demoProduct||"")));
document.querySelectorAll("[data-close-demo]").forEach(el=>el.addEventListener("click",closeDemo));
demoProduct?.addEventListener("change",renderDemoSlots);

demoRequestForm?.addEventListener("submit",async e=>{
  e.preventDefault();
  if(!demoSelectedSlot.value){
    demoStatus.textContent="Selecciona una fecha disponible.";
    demoStatus.className="demo-status error";
    return;
  }
  if(!demoRequestForm.reportValidity()) return;

  demoSubmitButton.disabled=true;
  demoStatus.textContent="Enviando solicitud…";
  demoStatus.className="demo-status";

  try{
    const fd=new FormData(demoRequestForm);
    const response=await fetch("https://formsubmit.co/ajax/rubencerlemdigitalsolutions@gmail.com",{
      method:"POST",headers:{"Accept":"application/json"},body:fd
    });
    if(!response.ok) throw new Error();
    demoStatus.textContent="Solicitud de demo enviada correctamente.";
    demoStatus.className="demo-status success";
    demoRequestForm.reset();
    renderDemoSlots();
  }catch{
    demoStatus.textContent="No se pudo enviar la solicitud. Inténtalo de nuevo.";
    demoStatus.className="demo-status error";
    demoSubmitButton.disabled=false;
  }
});

// Admin demo availability manager
const adminDemoProduct=document.getElementById("adminDemoProduct");
const adminDemoDate=document.getElementById("adminDemoDate");
const adminDemoTime=document.getElementById("adminDemoTime");
const adminAddDemoSlot=document.getElementById("adminAddDemoSlot");
const adminDemoList=document.getElementById("adminDemoList");

function renderAdminDemoList(){
  if(!adminDemoList) return;
  const data=getDemoAvailability().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  adminDemoList.innerHTML="";
  data.forEach((slot,index)=>{
    const row=document.createElement("div");
    row.className="admin-demo-item";
    row.innerHTML=`<span><b>${slot.product}</b> · ${formatDemoSlot(slot)}</span>`;
    const del=document.createElement("button");
    del.type="button";del.textContent="Eliminar";
    del.addEventListener("click",()=>{
      const next=getDemoAvailability();
      next.splice(index,1);
      setDemoAvailability(next);
      renderAdminDemoList();renderDemoSlots();
    });
    row.appendChild(del);
    adminDemoList.appendChild(row);
  });
}
adminAddDemoSlot?.addEventListener("click",()=>{
  const product=adminDemoProduct?.value||"";
  const date=adminDemoDate?.value||"";
  const time=adminDemoTime?.value||"";
  if(!product||!date||!time) return;
  const data=getDemoAvailability();
  if(!data.some(x=>x.product===product&&x.date===date&&x.time===time)){
    data.push({product,date,time});
    setDemoAvailability(data);
  }
  renderAdminDemoList();renderDemoSlots();
});
renderAdminDemoList();

otherSolutionName?.addEventListener("input",()=>{
  if(selectedDirectSolution === "Otros") renderDirectComparison();
});
