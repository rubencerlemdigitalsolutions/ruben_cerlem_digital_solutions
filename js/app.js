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
