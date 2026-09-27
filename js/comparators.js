(() => {
const root=document.documentElement;
const toggle=document.getElementById('themeToggle');
const stored=localStorage.getItem('rcds-theme');
if(stored) root.dataset.theme=stored;
if(toggle) toggle.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;localStorage.setItem('rcds-theme',next)});

const YES='Sí', NO='No', PARTIAL='Parcial', ADDON='Complemento', UNKNOWN='No indicado';

// Base interna. Solo se muestran tres alternativas en cada selector; el resto se usa para identificar "Otros".
const DB={
  efirma:{
    product:{name:'eFirma GO',plan:'Referencia',price:9,unit:'€/mes',features:{trial:'Sí',initial:'60',annual:'108 €',from:'1,8 €',to:'0,158 €',api:'Gratuita',weight:'25 Mb',custody:'5 años',app:'Sí',editable:'Sí',inperson:'Sí'}},
    visible:['Signaturit','DocuSign'],
    rows:[['Prueba gratis','trial','bool'],['Firmas paquete inicial','initial','text'],['Coste anual','annual','moneyText'],['Precio/doc. desde','from','moneyText'],['Precio/doc. hasta','to','moneyText'],['API','api','service'],['Peso máximo de envío','weight','size'],['Custodia','custody','text'],['App móvil','app','bool'],['Campos editables','editable','bool'],['Firma presencial','inperson','bool']],
    vendors:{
      'Signaturit':{aliases:['signaturit'],plans:[{name:'Referencia',price:33,features:{trial:'Sí',initial:'60',annual:'396 €',from:'6,6 €',to:'2,75 €',api:'Pago',weight:'15 Mb',custody:'5 años',app:'Sí',editable:'Sí',inperson:'No'}}]},
      'DocuSign':{aliases:['docusign','docu sign'],plans:[{name:'Referencia',price:9,features:{trial:'Sí',initial:'60',annual:'108 €',from:'1,8 €',to:'4,56 €',api:'Pago',weight:'23,8 Mb',custody:'No indicado',app:'Sí',editable:'Sí',inperson:'Sí'}}]},
      'Logalty':{aliases:['logalty'],plans:[{name:'Referencia',price:null,features:{trial:'Sí',initial:'Recarga saldo',annual:'Recarga saldo',from:'Recarga saldo',to:'3 €',api:'No indicado',weight:'1 Mb',custody:'2 años',app:'Sí',editable:'No indicado',inperson:'No'}}]},
      'Firmafy':{aliases:['firmafy'],plans:[{name:'Referencia',price:30,features:{trial:'Sí',initial:'300',annual:'360 €',from:'1,2 €',to:'0,72 €',api:'Gratuita',weight:'No indicado',custody:'10 años',app:'Sí',editable:'Sí',inperson:'Sí'}}]},
      'Click & Sign':{aliases:['click & sign','click and sign','clicksign'],plans:[{name:'Referencia',price:null,features:{trial:'No',initial:'Recarga saldo',annual:'Recarga saldo',from:'1,43 €',to:'1,43 €',api:'Gratuita',weight:'25 Mb',custody:'5 años',app:'No',editable:'No indicado',inperson:'No'}}]},
      'Viafirma':{aliases:['viafirma'],plans:[{name:'Referencia',price:4.5,features:{trial:'Sí',initial:'60',annual:'54 €',from:'0,9 €',to:'No indicado',api:'Pago',weight:'No indicado',custody:'No indicado',app:'Sí',editable:'No indicado',inperson:'No indicado'}}]},
      'Evicertia':{aliases:['evicertia'],plans:[{name:'Referencia',price:null,features:{trial:'No',initial:'No indicado',annual:'No indicado',from:'No indicado',to:'No indicado',api:'Pago',weight:'3 Mb',custody:'1 año',app:'No',editable:'Sí',inperson:'Sí'}}]},
      'Tecalis':{aliases:['tecalis'],plans:[{name:'Referencia',price:20,features:{trial:'Sí',initial:'50',annual:'240 €',from:'4,8 €',to:'1,6 €',api:'Pago',weight:'25 Mb',custody:'5 años',app:'Sí',editable:'No',inperson:'No'}}]},
      'YouSign':{aliases:['yousign','you sign'],plans:[{name:'Referencia',price:25,features:{trial:'Sí',initial:'No indicado',annual:'300 €',from:'No indicado',to:'No indicado',api:'Pago',weight:'No indicado',custody:'No indicado',app:'Sí',editable:'Sí',inperson:'Sí'}}]},
      'PandaDoc':{aliases:['pandadoc','panda doc'],plans:[{name:'Referencia',price:44.42,features:{trial:'Sí',initial:'No indicado',annual:'533 €',from:'No indicado',to:'No indicado',api:'Pago',weight:'No indicado',custody:'No indicado',app:'Sí',editable:'Sí',inperson:'Sí'}}]},
      'EverSign':{aliases:['eversign','ever sign'],plans:[{name:'Referencia',price:38.33,features:{trial:'Sí',initial:'No indicado',annual:'460 €',from:'No indicado',to:'No indicado',api:'Pago',weight:'No indicado',custody:'No indicado',app:'Sí',editable:'Sí',inperson:'Sí'}}]},
      'CocoSign':{aliases:['cocosign','coco sign'],plans:[{name:'Referencia',price:15,features:{trial:'Sí',initial:'No indicado',annual:'180 €',from:'No indicado',to:'No indicado',api:'No indicado',weight:'No indicado',custody:'No indicado',app:'Sí',editable:'No',inperson:'No'}}]},
      'SignHost':{aliases:['signhost','sign host'],plans:[{name:'Referencia',price:7.92,features:{trial:'Sí',initial:'100',annual:'95 €',from:'No indicado',to:'No indicado',api:'Pago',weight:'No indicado',custody:'No indicado',app:'Sí',editable:'Sí',inperson:'Sí'}}]},
      'Xodo Sign':{aliases:['xodo sign','xodo'],plans:[{name:'Referencia',price:38.33,features:{trial:'Sí',initial:'No indicado',annual:'460 €',from:'No indicado',to:'No indicado',api:'Pago',weight:'No indicado',custody:'No indicado',app:'Sí',editable:'Sí',inperson:'Sí'}}]}
    }
  },
  contasimple:{
    product:{name:'Contasimple',plan:'Profesional',price:10.95,unit:'€/mes · pago anual',features:{invoice:'Sí',verifactu:'Sí',tax:'Sí',ocr:'Complemento',bank:'Complemento',inventory:'Complemento',pos:'Complemento',accounting:'Sí',mobile:'Sí',users:'1 usuario',docs:'500 documentos/año'}},
    visible:['Holded','Sage Active','Anfix'],
    rows:[['Facturación','invoice','bool'],['Verifactu','verifactu','bool'],['Impuestos','tax','bool'],['OCR / captura de gastos','ocr','service'],['Conexión bancaria','bank','service'],['Inventario / stock','inventory','service'],['TPV','pos','service'],['Contabilidad','accounting','service'],['App móvil','mobile','bool'],['Usuarios incluidos','users','text'],['Volumen documental','docs','text']],
    vendors:{
      'Holded':{aliases:['holded'],plans:[
        {name:'Plus',price:15,features:{invoice:'Sí',verifactu:'Sí',tax:'Parcial',ocr:'Sí',bank:'Sí',inventory:'Complemento',pos:'Complemento',accounting:'Parcial',mobile:'Sí',users:'1 usuario',docs:'250 facturas/año'}},
        {name:'Básico',price:29,features:{invoice:'Sí',verifactu:'Sí',tax:'Sí',ocr:'Sí',bank:'Sí',inventory:'Complemento',pos:'Complemento',accounting:'Parcial',mobile:'Sí',users:'2 usuarios',docs:'1.000 facturas/año'}},
        {name:'Estándar',price:59,features:{invoice:'Sí',verifactu:'Sí',tax:'Sí',ocr:'Sí',bank:'Sí',inventory:'Complemento',pos:'Complemento',accounting:'Sí',mobile:'Sí',users:'4 usuarios',docs:'3.000 facturas/año'}}]},
      'Sage Active':{aliases:['sage active','sage'],plans:[
        {name:'Starter',price:25,altPrices:[12.5],features:{invoice:'Sí',verifactu:'Sí',tax:'Parcial',ocr:'Sí',bank:'Sí',inventory:'No',pos:'No indicado',accounting:'Parcial',mobile:'Sí',users:'5 usuarios',docs:'300 facturas'}},
        {name:'Essentials',price:49,altPrices:[24.5],features:{invoice:'Sí',verifactu:'Sí',tax:'Sí',ocr:'Sí',bank:'Sí',inventory:'No',pos:'No indicado',accounting:'Sí',mobile:'Sí',users:'10 usuarios',docs:'500 facturas'}}]},
      'Anfix':{aliases:['anfix'],plans:[
        {name:'Básico',price:4.99,altPrices:[5.99],features:{invoice:'Sí',verifactu:'Sí',tax:'Sí',ocr:'Parcial',bank:'Sí',inventory:'Complemento',pos:'No indicado',accounting:'Sí',mobile:'Sí',users:'No indicado',docs:'60 facturas/año'}},
        {name:'Avanzado',price:12.49,altPrices:[14.99],features:{invoice:'Sí',verifactu:'Sí',tax:'Sí',ocr:'Sí',bank:'Sí',inventory:'Complemento',pos:'No indicado',accounting:'Sí',mobile:'Sí',users:'No indicado',docs:'300 facturas/año'}},
        {name:'Profesional',price:24.99,altPrices:[29.99],features:{invoice:'Sí',verifactu:'Sí',tax:'Sí',ocr:'Sí',bank:'Sí',inventory:'Complemento',pos:'No indicado',accounting:'Sí',mobile:'Sí',users:'No indicado',docs:'1.200 facturas/año'}}]}
    }
  },
  ejornada:{
    product:{name:'eJornada',plan:'Solo fichajes',price:18,unit:'€/mes',features:{time:'Sí',geo:'Sí',absence:'No',calendar:'Sí',centers:'Sí',alerts:'Sí',reports:'Sí',export:'Sí',cloud:'Sí',support:'Sí'}},
    visible:['Woffu','Sesame HR','Tempika'],
    rows:[['Control horario','time','bool'],['Geolocalización / restricciones','geo','service'],['Vacaciones y ausencias','absence','bool'],['Horarios / turnos','calendar','service'],['Centros / organización','centers','service'],['Avisos / incidencias','alerts','service'],['Informes','reports','service'],['Exportación','export','service'],['Aplicación en la nube','cloud','bool'],['Soporte','support','service']],
    vendors:{
      'Woffu':{aliases:['woffu'],plans:[{name:'Lite',price:1.5,features:{time:'Sí',geo:'Sí',absence:'Sí',calendar:'Parcial',centers:'Parcial',alerts:'Sí',reports:'Sí',export:'Sí',cloud:'Sí',support:'Sí'}}]},
      'Sesame HR':{aliases:['sesame hr','sesame'],plans:[{name:'Essential',price:4.75,altPrices:[5.25],features:{time:'Sí',geo:'Sí',absence:'Sí',calendar:'Sí',centers:'Sí',alerts:'Sí',reports:'Sí',export:'Sí',cloud:'Sí',support:'Sí'}}]},
      'Tempika':{aliases:['tempika'],plans:[
        {name:'Gratis',price:0,features:{time:'Sí',geo:'Sí',absence:'Parcial',calendar:'Sí',centers:'Parcial',alerts:'Parcial',reports:'Sí',export:'Sí',cloud:'Sí',support:'Sí'}},
        {name:'Pequeña',price:0.99,features:{time:'Sí',geo:'Sí',absence:'Sí',calendar:'Sí',centers:'Sí',alerts:'Sí',reports:'Sí',export:'Sí',cloud:'Sí',support:'Sí'}},
        {name:'Pyme presencial',price:1.49,features:{time:'Sí',geo:'Sí',absence:'Sí',calendar:'Sí',centers:'Sí',alerts:'Sí',reports:'Sí',export:'Sí',cloud:'Sí',support:'Sí'}}]},
      'Factorial':{aliases:['factorial','factorial hr'],plans:[{name:'Referencia pública',price:5.5,features:{time:'Sí',geo:'Sí',absence:'Sí',calendar:'Sí',centers:'Sí',alerts:'Sí',reports:'Sí',export:'Sí',cloud:'Sí',support:'Sí'}}]},
      'Intratime':{aliases:['intratime'],plans:[{name:'Basic',price:1.5,features:{time:'Sí',geo:'Sí',absence:'Parcial',calendar:'Parcial',centers:'No indicado',alerts:'No indicado',reports:'Sí',export:'Sí',cloud:'Sí',support:'No indicado'}}]},
      'Bixpe':{aliases:['bixpe'],plans:[{name:'Premium',price:2,features:{time:'Sí',geo:'Sí',absence:'Parcial',calendar:'Parcial',centers:'No indicado',alerts:'No indicado',reports:'Sí',export:'Sí',cloud:'Sí',support:'No indicado'}}]},
      'WeWorking':{aliases:['weworking','we working'],plans:[{name:'Starter',price:15,features:{time:'Sí',geo:'No indicado',absence:'Sí',calendar:'Sí',centers:'Sí',alerts:'No indicado',reports:'Sí',export:'Sí',cloud:'Sí',support:'No indicado'}}]}
    }
  }
};

const key=root.dataset.comparator; const cfg=DB[key]; if(!cfg) return;
const select=document.getElementById('compareSolution'); const price=document.getElementById('comparePrice'); const otherCompany=document.getElementById('otherCompany'); const otherPrice=document.getElementById('otherPrice'); const otherCompanyField=document.getElementById('otherCompanyField'); const otherPriceField=document.getElementById('otherPriceField'); const result=document.getElementById('compareResult');
[...cfg.visible,'Otros'].forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;select.appendChild(o)});
select.addEventListener('change',()=>{const other=select.value==='Otros';otherCompanyField.hidden=!other;otherPriceField.hidden=!other;document.getElementById('knownPriceField').hidden=other;});

function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
function findVendor(name){const n=norm(name);for(const [vendor,data] of Object.entries(cfg.vendors)){if(norm(vendor)===n || (data.aliases||[]).some(a=>norm(a)===n) || (n && (norm(vendor).includes(n)||n.includes(norm(vendor))))) return [vendor,data]} return null}
function nearestPlan(vendor,paid){const plans=vendor.plans||[]; if(!plans.length) return null; if(!(paid>=0)) return plans[0]; let best=plans[0],dist=Infinity; for(const p of plans){const candidates=[p.price,...(p.altPrices||[])].filter(v=>typeof v==='number');const d=candidates.length?Math.min(...candidates.map(v=>Math.abs(v-paid))):Infinity;if(d<dist){best=p;dist=d}} return best}
function money(v){return typeof v==='number'?`${String(v).replace('.',',')} €/mes`:'No indicado'}
function cls(v){const n=norm(v);if(['si','gratuita','incluida'].includes(n))return 'good';if(n==='no')return 'bad';if(n.includes('complemento')||n.includes('parcial')||n.includes('pago'))return 'warn';if(n.includes('no indicado'))return 'neutral';return 'neutral'}
function isNo(v){return norm(v)==='no'}; function isYes(v){return ['si','gratuita','incluida'].includes(norm(v))}
function pairClasses(a,b,type){if(type==='bool'||type==='service'){if(isYes(a)&&isYes(b))return ['good','good'];if(isYes(a)&&isNo(b))return ['good','bad'];if(isNo(a)&&isYes(b))return ['bad','good'];return [cls(a),cls(b)]}return ['neutral','neutral']}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function render(vendorName,plan,paid,customUnknown=false){
  const base=cfg.product; const comp=plan?.features||{}; let priceBase=base.price, priceComp=paid>=0?paid:plan?.price;
  let priceClasses=['neutral','neutral'];if(typeof priceComp==='number'){if(priceBase<priceComp)priceClasses=['good','bad'];else if(priceBase>priceComp)priceClasses=['bad','good'];else priceClasses=['good','good']}
  const rows=cfg.rows.map(([label,k,t])=>{const av=base.features[k]??UNKNOWN,bv=comp[k]??UNKNOWN;const [ca,cb]=pairClasses(av,bv,t);return `<div class="compare-feature-row"><div class="compare-feature-name">${label}</div><div class="compare-value ${ca}">${escapeHtml(av)}</div><div class="compare-value ${cb}">${escapeHtml(bv)}</div></div>`}).join('');
  const note=customUnknown?'<div class="compare-alert">No he identificado esa empresa en la base interna. Se compara el precio indicado y el resto de funciones quedan como «No indicado» para no inventar datos.</div>':'';
  result.innerHTML=`${note}<section class="compare-board"><div class="compare-board-head"><div></div><div class="compare-col-head primary"><small>Producto</small><strong>${base.name}</strong><span>${base.plan}</span></div><div class="compare-col-head"><small>Tu solución</small><strong>${escapeHtml(vendorName)}</strong><span>${escapeHtml(plan?.name||'Referencia introducida')}</span></div></div><div class="compare-price-row"><div class="compare-feature-name">Precio de referencia</div><div class="compare-value ${priceClasses[0]}">${money(priceBase)}</div><div class="compare-value ${priceClasses[1]}">${typeof priceComp==='number'?money(priceComp):'No indicado'}</div></div>${rows}</section>`;
}

document.getElementById('compareButton').addEventListener('click',()=>{
  const choice=select.value;if(!choice){result.innerHTML='<div class="compare-empty error"><strong>Selecciona una solución.</strong></div>';return}
  if(choice==='Otros'){
    const name=otherCompany.value.trim();const paid=parseFloat(otherPrice.value);if(!name||Number.isNaN(paid)){result.innerHTML='<div class="compare-empty error"><strong>Indica la empresa y lo que pagas al mes.</strong></div>';return}
    const found=findVendor(name);if(found){const [vn,vd]=found;render(vn,nearestPlan(vd,paid),paid,false)}else{render(name,{name:'Precio indicado',features:{}},paid,true)}
  }else{
    const found=findVendor(choice); if(!found) return; const paidRaw=parseFloat(price.value); const paid=Number.isNaN(paidRaw)?undefined:paidRaw; const [vn,vd]=found; render(vn,nearestPlan(vd,paid),paid,false)
  }
});
})();
