
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
  if(comparisonPanel) comparisonPanel.hidden=open;
});

const DEMO_AVAILABILITY_KEY="rcds_demo_availability_v1";
const demoModal=document.getElementById("demoModal");
const demoProduct=document.getElementById("demoProduct");
const demoSlots=document.getElementById("demoSlots");
const demoEmpty=document.getElementById("demoEmpty");
const demoSelectedSlot=document.getElementById("demoSelectedSlot");
const demoSubmitButton=document.getElementById("demoSubmitButton");
const demoRequestForm=document.getElementById("demoRequestForm");
const demoStatus=document.getElementById("demoStatus");

function getDemoAvailability(){
  try{return JSON.parse(localStorage.getItem(DEMO_AVAILABILITY_KEY)||"[]")}catch{return[]}
}
function formatDemoSlot(slot){
  const d=new Date(slot.date+"T"+slot.time);
  if(Number.isNaN(d.getTime())) return `${slot.date} · ${slot.time}`;
  return new Intl.DateTimeFormat("es-ES",{weekday:"short",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(d);
}
function renderDemoSlots(){
  if(!demoProduct||!demoSlots) return;
  const product=demoProduct.value;
  const all=getDemoAvailability()
    .filter(x=>x.product===product)
    .filter(x=>new Date(x.date+"T"+x.time)>=new Date())
    .sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  demoSlots.innerHTML="";
  demoSelectedSlot.value="";
  demoSubmitButton.disabled=true;
  demoEmpty.style.display=all.length?"none":"block";
  all.forEach(slot=>{
    const b=document.createElement("button");
    b.type="button"; b.className="demo-slot"; b.textContent=formatDemoSlot(slot);
    b.addEventListener("click",()=>{
      demoSlots.querySelectorAll(".demo-slot").forEach(x=>x.classList.remove("selected"));
      b.classList.add("selected");
      demoSelectedSlot.value=`${slot.product} | ${slot.date} | ${slot.time}`;
      demoSubmitButton.disabled=false;
    });
    demoSlots.appendChild(b);
  });
}
function openDemo(product){
  if(!demoModal) return;
  demoProduct.value=product||"";
  demoModal.classList.add("open");
  demoModal.setAttribute("aria-hidden","false");
  document.body.classList.add("demo-lock");
  renderDemoSlots();
}
function closeDemo(){
  demoModal?.classList.remove("open");
  demoModal?.setAttribute("aria-hidden","true");
  document.body.classList.remove("demo-lock");
}
document.querySelectorAll("[data-request-demo]").forEach(btn=>btn.addEventListener("click",()=>openDemo(btn.dataset.demoProduct||"")));
document.querySelectorAll("[data-close-demo]").forEach(el=>el.addEventListener("click",closeDemo));

demoRequestForm?.addEventListener("submit",async e=>{
  e.preventDefault();
  if(!demoSelectedSlot.value){
    demoStatus.textContent="Selecciona una fecha disponible.";
    demoStatus.className="demo-status error";
    return;
  }
  if(!demoRequestForm.reportValidity()) return;
  const fd=new FormData(demoRequestForm);
  demoSubmitButton.disabled=true;
  demoStatus.textContent="Enviando solicitud…";
  try{
    const r=await fetch("https://formsubmit.co/ajax/rubencerlemdigitalsolutions@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd});
    if(!r.ok) throw new Error();
    demoStatus.textContent="Solicitud de demo enviada correctamente.";
    demoStatus.className="demo-status success";
    demoRequestForm.reset();
    renderDemoSlots();
  }catch{
    demoStatus.textContent="No se pudo enviar la solicitud.";
    demoStatus.className="demo-status error";
    demoSubmitButton.disabled=false;
  }
});

document.querySelectorAll(".product-contact-form").forEach(form=>{
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const status=form.querySelector(".contact-form-status");
    const btn=form.querySelector(".contact-submit");
    const fd=new FormData(form);
    if(btn){btn.disabled=true;btn.textContent="Enviando…";}
    if(status){status.textContent="Enviando tu consulta…";status.className="contact-form-status";}
    try{
      const r=await fetch("https://formsubmit.co/ajax/rubencerlemdigitalsolutions@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd});
      if(!r.ok) throw new Error();
      if(status){status.textContent="Consulta enviada correctamente.";status.className="contact-form-status success";}
      form.reset();
    }catch{
      if(status){status.textContent="No se ha podido enviar la consulta.";status.className="contact-form-status error";}
    }finally{
      if(btn){btn.disabled=false;btn.innerHTML='Contactar <span>→</span>';}
    }
  });
});
