const root=document.documentElement,toggle=document.getElementById('themeToggle');
let theme='light';try{theme=localStorage.getItem('rcds-theme')||'light'}catch(e){}
function setTheme(t){root.dataset.theme=t;document.querySelector('meta[name="theme-color"]').setAttribute('content',t==='dark'?'#07111b':'#f5f8fc');try{localStorage.setItem('rcds-theme',t)}catch(e){}}
setTheme(theme);toggle.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('formMessage').textContent='Mensaje preparado. En una siguiente versión podemos conectarlo a tu correo o WhatsApp.';
});

const productData={
  gesco3:{
    code:'G3', name:'Cegid Gesco3',
    intro:'Gestión comercial, facturación, compras, ventas, cobros, pagos, almacén y trazabilidad.',
    weights:{budgets:3,billing:3,stock:3,multiwarehouse:3,payments:2,reports:2,pos:0,cash:0,simplified:0,accounting:0,tax:0,amortization:0},
    business:{distribution:3,workshop:3,mixed:2,retail:1,services:1,other:0},
    sales:{invoices:3,mixed:2,counter:0,accounting:0}
  },
  conta3:{
    code:'C3', name:'Cegid Conta3',
    intro:'Contabilidad empresarial, asientos, balances, cuentas anuales, informes y amortizaciones.',
    weights:{accounting:4,tax:3,amortization:3,reports:2,payments:1,billing:0,budgets:0,stock:0,multiwarehouse:0,pos:0,cash:0,simplified:0},
    business:{services:2,distribution:2,workshop:2,mixed:2,retail:1,other:1},
    sales:{accounting:4,mixed:2,invoices:0,counter:0}
  },
  terven3:{
    code:'T3', name:'Cegid Terven3',
    intro:'TPV para comercio, venta de mostrador, caja, facturas simplificadas, almacén e inventario.',
    weights:{pos:4,cash:4,simplified:3,stock:3,billing:1,reports:1,budgets:0,multiwarehouse:0,payments:0,accounting:0,tax:0,amortization:0},
    business:{retail:4,mixed:2,distribution:1,services:0,workshop:0,other:0},
    sales:{counter:4,mixed:2,invoices:0,accounting:0}
  }
};



const cegidPlans={
  gesco3:[
    {id:'gescoA',code:'Gesco3 A',name:'Almacén + Compras',monthly:'18,66 €/mes',setup:'Alta 240 €',users:'4 usuarios (Pack Base)',features:['Gestión de almacén','Gestión de compras'],needs:['stock'],priceNumeric:18.66},
    {id:'gescoB',code:'Gesco3 B',name:'Facturación',monthly:'24,33 €/mes',setup:'Alta 300 €',users:'4 usuarios (Pack Base)',features:['Gestión de ventas','Facturación','Factura electrónica'],needs:['billing','budgets'],priceNumeric:24.33},
    {id:'gescoC',code:'Gesco3 C',name:'Almacén + Ventas',monthly:'41,83 €/mes',setup:'Alta 540 €',users:'4 usuarios (Pack Base)',features:['Gestión de almacén','Ventas y facturación','Factura electrónica'],needs:['stock','billing','budgets'],priceNumeric:41.83},
    {id:'gescoD',code:'Gesco3 D',name:'Almacén + Ventas + Compras',monthly:'41,83 €/mes',setup:'Alta 540 €',users:'4 usuarios (Pack Base)',features:['Almacén','Ventas y facturación','Compras','Factura electrónica'],needs:['stock','billing','budgets','payments'],priceNumeric:41.83},
    {id:'gescoE',code:'Gesco3 E',name:'Fabricación',monthly:'50,50 €/mes',setup:'Alta 720 €',users:'4 usuarios (Pack Base)',features:['Almacén','Ventas','Compras','Fabricación','Factura electrónica'],needs:['stock','billing','budgets','payments','multiwarehouse'],priceNumeric:50.50}
  ],
  conta3:[
    {id:'contaR',code:'Conta3 R / Basic',name:'Contabilidad reducida',monthly:'18,66 €/mes',setup:'Alta 240 €',users:'4 usuarios (Pack Base)',features:['Gestión de contabilidad reducida'],needs:['accounting'],priceNumeric:18.66},
    {id:'contaGeneral',code:'Conta3 / Standard',name:'Contabilidad general',monthly:'25 €/mes',setup:'Alta 360 €',users:'4 usuarios (Pack Base)',features:['Administración contable integral','Libros e informes','Exportación de listados'],needs:['accounting','reports','amortization'],priceNumeric:25},
    {id:'contaS',code:'Conta3 S / Superior',name:'Contabilidad superior',monthly:'35,16 €/mes',setup:'Alta 480 €',users:'4 usuarios (Pack Base)',features:['Contabilidad integral','Declaraciones fiscales','Registro Mercantil','Analítica / SII'],needs:['accounting','reports','amortization','tax'],priceNumeric:35.16}
  ],
  terven3:[
    {id:'tervenBasic',code:'Terven3',name:'TPV',monthly:'21,33 €/mes',setup:'Alta 240 €',users:'4 usuarios (Pack Base)',features:['Venta de mostrador','Facturas simplificadas','Caja y arqueo','Cobro efectivo/tarjeta'],needs:['pos','cash','simplified'],priceNumeric:21.33},
    {id:'tervenStock',code:'Terven3',name:'TPV con almacén e inventario',monthly:'39,99 €/mes',setup:'Alta 240 €',users:'4 usuarios (Pack Base)',features:['Todo el TPV básico','Gestión de almacén','Gestión de inventario','Albaranes y facturas'],needs:['pos','cash','simplified','stock'],priceNumeric:39.99}
  ]
};
let selectedCegidPlan={gesco3:null,conta3:null,terven3:null};

const comparisonData={
  gesco3:{
    own:{name:'Cegid Gesco3',price:{main:'Desde 18,66 €/mes',detail:'Sin IVA. Contratación anual, factura semestral (01/01 y 01/07) y pago de un alta. Gesco3: 18,66 / 24,33 / 41,83 / 50,50 €/mes según plan.'},values:{
      commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'yes',payments:'yes',accounting:'partial',crm:'no',cloud:'no',verifactu:'yes'
    }},
    features:[
      ['Presupuestos / pedidos / albaranes','commercial'],
      ['Facturación','billing'],
      ['Compras y ventas','purchases'],
      ['Almacén / stock','stock'],
      ['Multialmacén / trazabilidad','trace'],
      ['Cobros y pagos','payments'],
      ['Contabilidad integrada','accounting'],
      ['CRM / oportunidades','crm'],
      ['Uso 100% cloud','cloud'],
      ['Adaptación VeriFactu','verifactu']
    ],
    companies:{
      'Sage':[
        {id:'sageactive_starter',name:'Sage Active Starter',price:{main:'25 €/mes + IVA',detail:'Precio normal. Incluye 1 empresa y 5 usuarios; hasta 300 facturas. Usuario adicional: 5 €/mes. Funcionalidad centrada en facturación y gestión de ventas; no es un producto de stock.',promo:'Promoción: 12,50 €/mes durante los 3 primeros meses'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'partial',trace:'no',payments:'yes',accounting:'partial',crm:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'sageactive_essentials',name:'Sage Active Essentials',price:{main:'49 €/mes + IVA',detail:'Precio normal. Incluye 1 empresa y 10 usuarios; hasta 500 facturas. Añade contabilidad online a Starter.',promo:'Promoción: 24,50 €/mes durante los 3 primeros meses'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'partial',trace:'no',payments:'yes',accounting:'yes',crm:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'sage50essential',name:'Sage 50 Essential',price:{main:'45 €/mes + IVA',detail:'Contrato anual y pago anual. Para microempresas, hasta 2 usuarios.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'partial',payments:'yes',accounting:'yes',crm:'partial',cloud:'partial',verifactu:'yes'}},
        {id:'sage50standard',name:'Sage 50 Standard',price:{main:'102 €/mes + IVA',detail:'Contrato anual y pago anual. Para pequeñas empresas, hasta 5 usuarios.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'partial',payments:'yes',accounting:'yes',crm:'partial',cloud:'partial',verifactu:'yes'}},
        {id:'sage50commerce',name:'Sage 50 Edición Comercio',price:{main:'59,45 €/mes + IVA',detail:'Contrato anual y pago anual. Incluye funciones específicas para comercio y TPV.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'partial',payments:'yes',accounting:'yes',crm:'partial',cloud:'partial',verifactu:'yes'}},
        {id:'sage50services',name:'Sage 50 Edición Servicios',price:{main:'59,45 €/mes + IVA',detail:'Contrato anual y pago anual. Orientada a mantenimiento y reparación.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'partial',trace:'partial',payments:'yes',accounting:'yes',crm:'partial',cloud:'partial',verifactu:'yes'}},
        {id:'sage50crm',name:'Sage 50 Edición CRM',price:{main:'84 €/mes + IVA',detail:'Contrato anual y pago anual. Orientada a equipos comerciales.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'partial',payments:'yes',accounting:'yes',crm:'yes',cloud:'partial',verifactu:'yes'}}
      ],
      'Holded':[
        {id:'holded_plus',name:'Holded Plus',price:{main:'15 €/mes + IVA',detail:'1 usuario y 250 facturas/año.',promo:'7,50 €/mes durante los 3 primeros meses'},values:{commercial:'yes',billing:'yes',purchases:'partial',stock:'no',trace:'no',payments:'partial',accounting:'partial',crm:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'holded_basic',name:'Holded Básico',price:{main:'29 €/mes + IVA',detail:'2 usuarios y 1.000 facturas/año.',promo:'14,50 €/mes durante los 3 primeros meses'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'partial',trace:'no',payments:'yes',accounting:'partial',crm:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'holded_standard',name:'Holded Estándar',price:{main:'59 €/mes + IVA',detail:'4 usuarios y 3.000 facturas/año. Contabilidad completa, bancos ilimitados y CRM.',promo:'29,50 €/mes durante los 3 primeros meses'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'partial',trace:'no',payments:'yes',accounting:'yes',crm:'yes',cloud:'yes',verifactu:'yes'}},
        {id:'holded_advanced',name:'Holded Avanzado',price:{main:'99 €/mes + IVA',detail:'7 usuarios y 10.000 facturas/año.',promo:'49,50 €/mes durante los 3 primeros meses'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'partial',trace:'no',payments:'yes',accounting:'yes',crm:'yes',cloud:'yes',verifactu:'yes'}},
        {id:'holded_premium',name:'Holded Premium',price:{main:'199 €/mes + IVA',detail:'Plan superior con facturación ilimitada.',promo:'99,50 €/mes durante los 3 primeros meses'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'partial',trace:'partial',payments:'yes',accounting:'yes',crm:'yes',cloud:'yes',verifactu:'yes'}},
        {id:'holded_inventory',name:'Holded Plus + Inventario (4 usuarios)',price:{main:'70 €/mes + IVA',detail:'Configuración comparable para 4 usuarios: Plus 15 € + Inventario 25 € + 3 usuarios extra a 10 €/mes. El precio base sin igualar usuarios sería 40 €/mes.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'partial',payments:'yes',accounting:'partial',crm:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'holded_inventory_manufacturing',name:'Holded Plus + Inventario + Fabricación (4 usuarios)',price:{main:'95 €/mes + IVA',detail:'Configuración comparable para 4 usuarios: Plus 15 € + Inventario 25 € + Fabricación 25 € + 3 usuarios extra a 10 €/mes.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'partial',payments:'yes',accounting:'partial',crm:'partial',cloud:'yes',verifactu:'yes'}}
      ],
      'Wolters Kluwer':[
        {id:'a3facturago',name:'a3facturago (4 usuarios)',price:{main:'27,95 €/mes',detail:'Base 9,95 €/mes + 3 usuarios adicionales a 6 €/mes. Datos y facturas ilimitados, presupuestos, cobros/pagos y VeriFactu. No incluye stock.'},values:{commercial:'yes',billing:'yes',purchases:'partial',stock:'no',trace:'no',payments:'partial',accounting:'no',crm:'no',cloud:'yes',verifactu:'yes'}},
        {id:'a3facturapro',name:'a3facturapro (4 usuarios)',price:{main:'Desde 57 €/mes',detail:'Referencia comparable para 4 usuarios: 39 € + 3 usuarios adicionales a 6 €/mes. Incluye control de stock, pedidos/albaranes, almacenes y facturación periódica.'},values:{commercial:'yes',billing:'yes',purchases:'partial',stock:'yes',trace:'partial',payments:'partial',accounting:'no',crm:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'a3erp',name:'a3innuva ERP',price:{main:'Desde 26 €/mes',detail:'ERP online para pymes. Facturas ilimitadas; stock, banca online, SII y otras capacidades pueden añadirse mediante módulos.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'partial',trace:'partial',payments:'yes',accounting:'yes',crm:'partial',cloud:'yes',verifactu:'yes'}}
      ],
      'Odoo':[
        {id:'odoo_oneapp',name:'Odoo - una aplicación',price:{main:'US$ 0',detail:'Una aplicación gratis con usuarios ilimitados en Odoo Online.'},values:{commercial:'partial',billing:'partial',purchases:'partial',stock:'partial',trace:'partial',payments:'partial',accounting:'partial',crm:'partial',cloud:'yes',verifactu:'partial'}},
        {id:'odoo_standard',name:'Odoo Estándar (4 usuarios)',price:{main:'US$ 99,60/mes',detail:'Equivalencia para 4 usuarios: US$ 24,90 por usuario/mes con facturación anual. Incluye todas las aplicaciones en Odoo Online.',promo:'Precio por usuario publicado: US$ 24,90/mes'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'yes',payments:'partial',accounting:'yes',crm:'yes',cloud:'yes',verifactu:'partial'}},
        {id:'odoo_custom',name:'Odoo Personalizado (4 usuarios)',price:{main:'US$ 196/mes',detail:'Equivalencia para 4 usuarios: US$ 49 por usuario/mes. Incluye Studio, multiempresa y API externa.'},values:{commercial:'yes',billing:'yes',purchases:'yes',stock:'yes',trace:'yes',payments:'partial',accounting:'yes',crm:'yes',cloud:'yes',verifactu:'partial'}}
      ]
    }
  },
  conta3:{
    own:{name:'Cegid Conta3',price:{main:'Desde 18,66 €/mes',detail:'Sin IVA. Contratación anual, factura semestral (01/01 y 01/07) y pago de un alta. Basic 18,66; Standard 25; Superior 35,16 €/mes.'},values:{
      accounting:'yes',entries:'yes',annual:'yes',amortization:'yes',treasury:'yes',bank:'partial',tax:'yes',analytic:'partial',cloud:'no',integration:'yes'
    }},
    features:[
      ['Contabilidad financiera','accounting'],
      ['Asientos y automatización contable','entries'],
      ['Balances / cuentas anuales','annual'],
      ['Amortizaciones / inmovilizado','amortization'],
      ['Tesorería / cartera','treasury'],
      ['Conciliación bancaria','bank'],
      ['Información fiscal','tax'],
      ['Contabilidad analítica','analytic'],
      ['Uso 100% cloud','cloud'],
      ['Integración con gestión/facturación','integration']
    ],
    companies:{
      'Sage':[
        {id:'sageactive_essentials',name:'Sage Active Essentials',price:{main:'49 €/mes',detail:'Precio normal publicado, IVA no incluido. Incluye 1 empresa y 10 usuarios; hasta 500 facturas.',promo:'24,50 €/mes durante los 3 primeros meses'},values:{accounting:'yes',entries:'yes',annual:'yes',amortization:'partial',treasury:'yes',bank:'yes',tax:'yes',analytic:'partial',cloud:'yes',integration:'yes'}},
        {id:'sage50essential',name:'Sage 50 Essential',price:{main:'45 €/mes + IVA',detail:'Contrato anual y pago anual. Hasta 2 usuarios.'},values:{accounting:'yes',entries:'yes',annual:'partial',amortization:'yes',treasury:'yes',bank:'partial',tax:'yes',analytic:'partial',cloud:'partial',integration:'yes'}},
        {id:'sage50standard',name:'Sage 50 Standard',price:{main:'102 €/mes + IVA',detail:'Contrato anual y pago anual. Hasta 5 usuarios. Añade analítica, modelos fiscales y conciliación bancaria.'},values:{accounting:'yes',entries:'yes',annual:'yes',amortization:'yes',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'partial',integration:'yes'}},
        {id:'sage50premium',name:'Sage 50 Premium',price:{main:'Consultar tarifa actual',detail:'La edición Premium existe, pero su tarifa exacta depende de modalidad/configuración.'},values:{accounting:'yes',entries:'yes',annual:'yes',amortization:'yes',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'partial',integration:'yes'}}
      ],
      'Holded':[
        {id:'holded_standard',name:'Holded Estándar',price:{main:'59 €/mes + IVA',detail:'4 usuarios y 3.000 facturas/año. Contabilidad completa y bancos ilimitados.',promo:'29,50 €/mes durante los 3 primeros meses'},values:{accounting:'yes',entries:'yes',annual:'partial',amortization:'yes',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'yes',integration:'yes'}},
        {id:'holded_advanced',name:'Holded Avanzado',price:{main:'99 €/mes + IVA',detail:'7 usuarios y 10.000 facturas/año.',promo:'49,50 €/mes durante los 3 primeros meses'},values:{accounting:'yes',entries:'yes',annual:'partial',amortization:'yes',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'yes',integration:'yes'}},
        {id:'holded_premium',name:'Holded Premium',price:{main:'199 €/mes + IVA',detail:'Plan superior con mayor capacidad y facturación ilimitada.',promo:'99,50 €/mes durante los 3 primeros meses'},values:{accounting:'yes',entries:'yes',annual:'partial',amortization:'yes',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'yes',integration:'yes'}}
      ],
      'Wolters Kluwer':[
        {id:'a3conta',name:'a3innuva Contabilidad para pymes',price:{main:'Desde 26 €/mes',detail:'Software contable 100% cloud para pymes.'},values:{accounting:'yes',entries:'yes',annual:'yes',amortization:'yes',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'yes',integration:'yes'}},
        {id:'a3erp',name:'a3innuva ERP',price:{main:'Desde 26 €/mes',detail:'ERP online con contabilidad, facturación y módulos adicionales.'},values:{accounting:'yes',entries:'yes',annual:'yes',amortization:'partial',treasury:'yes',bank:'yes',tax:'yes',analytic:'partial',cloud:'yes',integration:'yes'}}
      ],
      'Odoo':[
        {id:'odoo_accounting_oneapp',name:'Odoo Contabilidad - una aplicación',price:{main:'US$ 0',detail:'Una sola aplicación gratis con usuarios ilimitados en Odoo Online.'},values:{accounting:'yes',entries:'yes',annual:'partial',amortization:'partial',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'yes',integration:'partial'}},
        {id:'odoo_standard',name:'Odoo Estándar (4 usuarios)',price:{main:'US$ 99,60/mes',detail:'Equivalencia para 4 usuarios: US$ 24,90 por usuario/mes con facturación anual. Incluye todas las aplicaciones en Odoo Online.',promo:'Precio por usuario publicado: US$ 24,90/mes'},values:{accounting:'yes',entries:'yes',annual:'partial',amortization:'partial',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'yes',integration:'yes'}},
        {id:'odoo_custom',name:'Odoo Personalizado (4 usuarios)',price:{main:'US$ 196/mes',detail:'Equivalencia para 4 usuarios: US$ 49 por usuario/mes. Incluye Studio, multiempresa y API externa.'},values:{accounting:'yes',entries:'yes',annual:'partial',amortization:'partial',treasury:'yes',bank:'yes',tax:'yes',analytic:'yes',cloud:'yes',integration:'yes'}}
      ]
    }
  },
  terven3:{
    own:{name:'Cegid Terven3',price:{main:'Desde 21,33 €/mes',detail:'Sin IVA. Contratación anual, factura semestral (01/01 y 01/07) y pago de un alta. TPV con almacén e inventario: 39,99 €/mes.'},values:{
      pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'yes',inventory:'yes',invoice:'yes',accounting:'partial',cloud:'no',verifactu:'yes'
    }},
    features:[
      ['TPV / venta de mostrador','pos'],
      ['Facturas simplificadas / tickets','simplified'],
      ['Caja y arqueos','cash'],
      ['Cobros en efectivo y tarjeta','card'],
      ['Almacén / stock','stock'],
      ['Inventario','inventory'],
      ['Albaranes y facturas','invoice'],
      ['Integración contable','accounting'],
      ['Uso 100% cloud','cloud'],
      ['Adaptación VeriFactu','verifactu']
    ],
    companies:{
      'Sage':[
        {id:'sage50commerce',name:'Sage 50 Edición Comercio',price:{main:'59,45 €/mes + IVA',detail:'Contrato anual y pago anual. Incluye TPV, caja, tickets y funciones específicas de comercio.'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'yes',inventory:'yes',invoice:'yes',accounting:'yes',cloud:'partial',verifactu:'yes'}},
        {id:'sage50essential',name:'Sage 50 Essential',price:{main:'45 €/mes + IVA',detail:'Contrato anual y pago anual. Hasta 2 usuarios.'},values:{pos:'partial',simplified:'partial',cash:'partial',card:'partial',stock:'yes',inventory:'yes',invoice:'yes',accounting:'yes',cloud:'partial',verifactu:'yes'}},
        {id:'sage50standard',name:'Sage 50 Standard',price:{main:'102 €/mes + IVA',detail:'Contrato anual y pago anual. Hasta 5 usuarios.'},values:{pos:'partial',simplified:'partial',cash:'partial',card:'partial',stock:'yes',inventory:'yes',invoice:'yes',accounting:'yes',cloud:'partial',verifactu:'yes'}}
      ],
      'Holded':[
        {id:'holded_plus_tpv',name:'Holded Plus + TPV (4 usuarios)',price:{main:'70 €/mes + IVA',detail:'Configuración comparable para 4 usuarios: Plus 15 € + TPV 25 €/tienda + 3 usuarios extra a 10 €/mes.',promo:'El descuento promocional solo afecta al plan base'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'partial',inventory:'partial',invoice:'yes',accounting:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'holded_basic_tpv',name:'Holded Básico + TPV',price:{main:'54 €/mes + IVA',detail:'Plan Básico 29 €/mes + TPV 25 €/tienda/mes.',promo:'Plan base: 14,50 €/mes durante los 3 primeros meses'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'partial',inventory:'partial',invoice:'yes',accounting:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'holded_standard_tpv',name:'Holded Estándar + TPV',price:{main:'84 €/mes + IVA',detail:'Plan Estándar 59 €/mes + TPV 25 €/tienda/mes.',promo:'Plan base: 29,50 €/mes durante los 3 primeros meses'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'partial',inventory:'partial',invoice:'yes',accounting:'yes',cloud:'yes',verifactu:'yes'}},
        {id:'holded_inventory_tpv',name:'Holded Plus + Inventario + TPV (4 usuarios)',price:{main:'95 €/mes + IVA',detail:'Configuración comparable para 4 usuarios: Plus 15 € + Inventario 25 € + TPV 25 €/tienda + 3 usuarios extra a 10 €/mes.'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'yes',inventory:'yes',invoice:'yes',accounting:'yes',cloud:'yes',verifactu:'yes'}}
      ],
      'Odoo':[
        {id:'odoo_pos_oneapp',name:'Odoo Punto de Venta - una aplicación',price:{main:'US$ 0',detail:'Una sola aplicación gratis con usuarios ilimitados en Odoo Online.'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'partial',inventory:'partial',invoice:'partial',accounting:'partial',cloud:'yes',verifactu:'partial'}},
        {id:'odoo_standard',name:'Odoo Estándar',price:{main:'US$ 24,90/usuario/mes',detail:'Todas las aplicaciones, incluido TPV e Inventario, con facturación anual.',promo:'Precio promocional inicial publicado'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'yes',inventory:'yes',invoice:'yes',accounting:'yes',cloud:'yes',verifactu:'partial'}},
        {id:'odoo_custom',name:'Odoo Personalizado (4 usuarios)',price:{main:'US$ 196/mes',detail:'Equivalencia para 4 usuarios: US$ 49 por usuario/mes. Incluye Studio, multiempresa y API externa.'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'yes',inventory:'yes',invoice:'yes',accounting:'yes',cloud:'yes',verifactu:'partial'}}
      ],
      'Wolters Kluwer':[
        {id:'a3tpv',name:'TPV Cloud (Wolters Kluwer)',price:{main:'Desde 10 €/mes',detail:'TPV cloud integrable con soluciones de facturación y ERP de Wolters Kluwer.'},values:{pos:'yes',simplified:'yes',cash:'yes',card:'yes',stock:'partial',inventory:'partial',invoice:'yes',accounting:'partial',cloud:'yes',verifactu:'yes'}},
        {id:'a3erp',name:'a3innuva ERP',price:{main:'Desde 26 €/mes',detail:'ERP online al que se pueden añadir módulos e integraciones.'},values:{pos:'partial',simplified:'partial',cash:'partial',card:'partial',stock:'partial',inventory:'partial',invoice:'yes',accounting:'yes',cloud:'yes',verifactu:'yes'}}
      ]
    }
  }
};

const compareLabels={yes:'Sí',partial:'Depende del plan / módulo',no:'No consta'};
const compareClass={yes:'yes',partial:'partial',no:'no'};


function recommendCegidPlan(product, needs){
  const plans=cegidPlans[product]||[];
  if(!plans.length) return null;
  let best=plans[0], bestScore=-1;
  plans.forEach(plan=>{
    let score=0;
    needs.forEach(n=>{ if(plan.needs.includes(n)) score+=2; });
    // Reward the smallest plan that covers all selected relevant needs.
    const relevantNeeds=needs.filter(n=>plans.some(p=>p.needs.includes(n)));
    const coversAll=relevantNeeds.every(n=>plan.needs.includes(n));
    if(coversAll) score+=4;
    score-=plan.needs.length*0.05;
    if(score>bestScore){best=plan;bestScore=score;}
  });
  return best;
}

function getSelectedPlan(product=currentProduct){
  const plans=cegidPlans[product]||[];
  const id=selectedCegidPlan[product];
  return plans.find(p=>p.id===id)||null;
}


const directComparisonMap={
  gesco3:{
    gescoA:{
      Sage:[],
      Holded:['holded_inventory'],
      'Wolters Kluwer':['a3facturapro'],
      Odoo:['odoo_standard']
    },
    gescoB:{
      Sage:['sageactive_starter'],
      Holded:['holded_plus'],
      'Wolters Kluwer':['a3facturago'],
      Odoo:['odoo_oneapp']
    },
    gescoC:{
      Sage:['sage50essential'],
      Holded:['holded_inventory'],
      'Wolters Kluwer':['a3facturapro'],
      Odoo:['odoo_standard']
    },
    gescoD:{
      Sage:['sage50essential'],
      Holded:['holded_inventory'],
      'Wolters Kluwer':['a3erp'],
      Odoo:['odoo_standard']
    },
    gescoE:{
      Sage:[],
      Holded:['holded_inventory_manufacturing'],
      'Wolters Kluwer':[],
      Odoo:['odoo_standard']
    }
  },
  conta3:{
    contaR:{
      Sage:['sageactive_essentials'],
      Holded:['holded_standard'],
      'Wolters Kluwer':['a3conta'],
      Odoo:['odoo_accounting_oneapp']
    },
    contaGeneral:{
      Sage:['sageactive_essentials'],
      Holded:['holded_standard'],
      'Wolters Kluwer':['a3conta'],
      Odoo:['odoo_accounting_oneapp']
    },
    contaS:{
      Sage:['sageactive_essentials'],
      Holded:['holded_standard'],
      'Wolters Kluwer':['a3conta'],
      Odoo:['odoo_standard']
    }
  },
  terven3:{
    tervenBasic:{
      Sage:['sage50commerce'],
      Holded:['holded_plus_tpv'],
      'Wolters Kluwer':['a3tpv'],
      Odoo:['odoo_pos_oneapp']
    },
    tervenStock:{
      Sage:['sage50commerce'],
      Holded:['holded_inventory_tpv'],
      'Wolters Kluwer':['a3tpv'],
      Odoo:['odoo_standard']
    }
  }
};

function getDirectComparableProducts(company){
  const data=comparisonData[currentProduct];
  const all=(data.companies[company]||[]);
  const plan=getSelectedPlan(currentProduct);
  if(!plan) return all;
  const ids=directComparisonMap[currentProduct]?.[plan.id]?.[company]||[];
  if(!ids.length) return [];
  return all.filter(p=>ids.includes(p.id));
}

function setupCegidPlanSelector(){
  const select=document.getElementById('compareCegidPlan');
  if(!select) return;
  const plans=(cegidPlans[currentProduct]||[]).slice();
  if(!selectedCegidPlan[currentProduct] && plans.length) selectedCegidPlan[currentProduct]=plans[0].id;
  select.innerHTML=plans.map(plan=>`<option value="${plan.id}" ${selectedCegidPlan[currentProduct]===plan.id?'selected':''}>${plan.code} · ${plan.name} · ${plan.monthly}</option>`).join('');
}


function parseEuroPrice(text){
  if(!text) return null;
  const m=text.replace(/\./g,'').replace(',','.').match(/(\d+(?:\.\d+)?)/);
  return m?Number(m[1]):null;
}

function formatEuro(n){
  return `${n.toFixed(2).replace('.',',')} €/mes`;
}

function adjustedCompetitorPrice(product,users){
  if(!product || !product.price) return null;
  const name=(product.name||'').toLowerCase();
  const base=product.price.main||'';

  // Holded: selected entries already encode some 4-user comparable bundles.
  if(name.includes('holded')){
    const basePrice=parseEuroPrice(base);
    if(basePrice===null) return {main:base,detail:product.price.detail||''};
    // Reverse to rough 4-user base where known, then adjust extra users by 10 €/month.
    let included=4;
    let fixed=basePrice;
    if(name.includes('plus') && !name.includes('4 usuarios')) included=1;
    if(name.includes('básico')) included=2;
    if(name.includes('estándar')) included=4;
    if(name.includes('avanzado')) included=7;
    if(name.includes('premium')) included=10;
    if(name.includes('(4 usuarios)')) included=4;
    const extra=Math.max(0,users-included)*10;
    return {main:formatEuro(fixed+extra),detail:`Coste orientativo ajustado a ${users} usuario${users===1?'':'s'}. ${product.price.detail||''}`};
  }

  // Odoo: per-user plans
  if(name.includes('odoo estándar')){
    return {main:`US$ ${(24.90*users).toFixed(2)}/mes`,detail:`US$ 24,90 por usuario/mes × ${users} usuario${users===1?'':'s'}.`};
  }
  if(name.includes('odoo personalizado')){
    return {main:`US$ ${(49*users).toFixed(2)}/mes`,detail:`US$ 49 por usuario/mes × ${users} usuario${users===1?'':'s'}.`};
  }

  // Wolters a3factura: base + 6 €/extra user
  if(name.includes('a3facturago')){
    const total=9.95+Math.max(0,users-1)*6;
    return {main:formatEuro(total),detail:`9,95 €/mes + ${Math.max(0,users-1)} usuario(s) adicional(es) a 6 €/mes.`};
  }
  if(name.includes('a3facturapro')){
    const total=39+Math.max(0,users-1)*6;
    return {main:`Desde ${formatEuro(total)}`,detail:`39 €/mes + ${Math.max(0,users-1)} usuario(s) adicional(es) a 6 €/mes.`};
  }

  // Sage Active has user bundles.
  if(name.includes('sage active starter')){
    if(users<=5) return {main:'25 €/mes + IVA',detail:'Incluye hasta 5 usuarios.'};
    return {main:formatEuro(25+(users-5)*5)+' + IVA',detail:`25 €/mes incluye 5 usuarios; ${users-5} adicional(es) a 5 €/mes.`};
  }
  if(name.includes('sage active essentials')){
    if(users<=10) return {main:'49 €/mes + IVA',detail:'Incluye hasta 10 usuarios.'};
    return {main:formatEuro(49+(users-10)*10)+' + IVA',detail:`49 €/mes incluye 10 usuarios; usuarios extra a 10 €/mes.`};
  }

  // Otherwise keep public plan price as shown.
  return {main:base,detail:product.price.detail||''};
}


function setupCompareSelectors(){
  const company=document.getElementById('compareCompany');
  const currentCost=document.getElementById('compareCurrentCost');
  if(company) company.value='';
  if(currentCost) currentCost.value='';
  const out=document.getElementById('compareOutput');
  if(out){
    out.className='compare-empty';
    out.innerHTML='Selecciona una empresa e indica lo que pagas actualmente para ver qué planes Cegid podemos ofrecerte.';
  }
}

function currentConfiguredNeeds(){
  return [...document.querySelectorAll('#fitNeeds input:checked')].map(i=>i.value);
}

function scorePlanAgainstNeeds(product,plan,needs){
  const plans=cegidPlans[product]||[];
  const relevant=needs.filter(n=>plans.some(p=>p.needs.includes(n)));
  let score=0;
  relevant.forEach(n=>{ if(plan.needs.includes(n)) score+=3; else score-=2; });
  if(relevant.length && relevant.every(n=>plan.needs.includes(n))) score+=5;
  return score;
}

function recommendPlansForComparison(){
  const company=document.getElementById('compareCompany').value;
  const raw=document.getElementById('compareCurrentCost').value;
  const currentCost=Number(raw);
  const out=document.getElementById('compareOutput');
  const needs=currentConfiguredNeeds();
  const plans=cegidPlans[currentProduct]||[];

  if(!company){
    out.className='compare-empty';
    out.innerHTML='Selecciona primero la empresa con la que trabajas actualmente.';
    return;
  }
  if(raw==='' || !isFinite(currentCost) || currentCost<0){
    out.className='compare-empty';
    out.innerHTML='Indica cuánto pagas actualmente al mes para poder comparar el coste.';
    return;
  }

  const scored=plans.map(plan=>({
    plan,
    score:scorePlanAgainstNeeds(currentProduct,plan,needs),
    diff:plan.priceNumeric-currentCost
  })).sort((a,b)=>{
    if(b.score!==a.score) return b.score-a.score;
    return Math.abs(a.diff)-Math.abs(b.diff);
  });

  const best=scored[0];
  const upgrade=scored
    .filter(x=>x.plan.id!==best.plan.id && x.plan.priceNumeric>best.plan.priceNumeric)
    .sort((a,b)=>(a.plan.priceNumeric-best.plan.priceNumeric)-(b.plan.priceNumeric-best.plan.priceNumeric))
    .find(x=>(x.plan.priceNumeric-best.plan.priceNumeric)<=15);

  const labels={
    budgets:'presupuestos, pedidos y albaranes',
    billing:'facturación',
    stock:'almacén e inventario',
    multiwarehouse:'varios almacenes o trazabilidad',
    payments:'cobros, pagos y tesorería',
    accounting:'contabilidad completa',
    tax:'información fiscal y cuentas anuales',
    amortization:'amortizaciones',
    pos:'TPV y venta de mostrador',
    cash:'caja y arqueos',
    simplified:'facturas simplificadas',
    reports:'informes y análisis'
  };
  const selectedLabels=needs.map(n=>labels[n]).filter(Boolean);

  const costDiff=best.plan.priceNumeric-currentCost;
  const diffText=Math.abs(costDiff)<0.005
    ? 'Mismo coste aproximado que pagas ahora'
    : costDiff>0
      ? `+${costDiff.toFixed(2).replace('.',',')} €/mes respecto a tu coste actual`
      : `${Math.abs(costDiff).toFixed(2).replace('.',',')} €/mes menos que tu coste actual`;

  out.className='compare-card';
  out.innerHTML=`
    <div class="compare-headline">
      <div><strong>Propuesta de ${productScopeNames[currentProduct]} según tu situación</strong><small>${company} · coste actual indicado: ${currentCost.toFixed(2).replace('.',',')} €/mes</small></div>
    </div>
    <div class="offer-grid" style="padding:16px 18px">
      <article class="offer-card primary">
        <span class="offer-tag">Plan ajustado</span>
        <div class="offer-top">
          <div>
            <h5>${best.plan.code} · ${best.plan.name}</h5>
            <div class="offer-diff">${diffText}</div>
          </div>
          <div class="offer-price">${best.plan.monthly}</div>
        </div>
        <p>${selectedLabels.length?`Tomando como referencia que buscas ${selectedLabels.slice(0,5).join(', ')}.`:'Tomando como referencia el producto Cegid que estás consultando y el coste que has indicado.'}</p>
        <ul>${best.plan.features.map(f=>`<li>${f}</li>`).join('')}</ul>
      </article>
      ${upgrade?`
      <article class="offer-card upgrade">
        <span class="offer-tag">Alternativa con más funciones</span>
        <div class="offer-top">
          <div>
            <h5>${upgrade.plan.code} · ${upgrade.plan.name}</h5>
            <div class="offer-diff">+${(upgrade.plan.priceNumeric-best.plan.priceNumeric).toFixed(2).replace('.',',')} €/mes frente al plan recomendado</div>
          </div>
          <div class="offer-price">${upgrade.plan.monthly}</div>
        </div>
        <p>Una alternativa a valorar si quieres ampliar servicios por una diferencia de precio pequeña.</p>
        <ul>${upgrade.plan.features.map(f=>`<li>${f}</li>`).join('')}</ul>
      </article>`:''}
    </div>
    <div class="compare-summary">
      <b>Criterio:</b> se usan las necesidades que hayas marcado en “Configura lo que buscas” y el importe mensual que indiques. El objetivo es enseñarte qué plan del producto que estás consultando podemos ofrecer por un coste similar y qué opción superior del mismo producto existe si por pocos euros más obtienes más servicios.
    </div>`;
}

let currentProduct='gesco3';
const modal=document.getElementById('fitModal');
const fitTitle=document.getElementById('fitTitle');
const fitIntro=document.getElementById('fitIntro');
const fitIcon=document.getElementById('fitIcon');
const fitResult=document.getElementById('fitResult');

function openFit(product){
  currentProduct=product;
  const d=productData[product];
  fitIcon.textContent=d.code;
  fitTitle.textContent=`¿${d.name} encaja conmigo?`;
  fitIntro.textContent=d.intro;
  fitResult.classList.remove('show');
  const ipc=document.getElementById('internalPlanCompare');
  if(ipc){ipc.style.display='none';ipc.innerHTML='';}
  updateProductScopeUI();
  updateDetailedNeedsForProduct();
  renderBasicSuggestions();
  document.getElementById('detailToggle').setAttribute('aria-expanded','false');
  document.getElementById('detailPanel').classList.remove('open');
  const detailArrow=document.getElementById('detailArrow');
  if(detailArrow) detailArrow.textContent='▶';
  document.querySelectorAll('.fit-tab').forEach((t,i)=>t.classList.toggle('active',i===0));
  document.getElementById('fitPaneMatch').classList.add('active');
  document.getElementById('fitPaneCompare').classList.remove('active');
  setupCompareSelectors();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('fit-lock');
}
function closeFit(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('fit-lock');
}
document.querySelectorAll('.fit-trigger').forEach(btn=>btn.addEventListener('click',()=>openFit(btn.dataset.product)));

document.querySelectorAll('.fit-tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.fit-tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
  const compare=tab.dataset.fitTab==='compare';
  document.getElementById('fitPaneMatch').classList.toggle('active',!compare);
  document.getElementById('fitPaneCompare').classList.toggle('active',compare);
  if(compare) recommendPlansForComparison();
}));
document.getElementById('compareCompany').addEventListener('change',recommendPlansForComparison);
document.getElementById('compareCurrentCost').addEventListener('input',recommendPlansForComparison);

document.querySelectorAll('[data-close-fit]').forEach(el=>el.addEventListener('click',closeFit));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeFit()});



const productScopeNames={
  gesco3:'Cegid Gesco3',
  conta3:'Cegid Conta3',
  terven3:'Cegid Terven3'
};

function updateProductScopeUI(){
  const name=productScopeNames[currentProduct]||'Cegid';
  const title=document.getElementById('basicSuggestionsTitle');
  if(title) title.textContent=`${name}: planes relacionados`;
  const compareScope=document.getElementById('compareProductScope');
  if(compareScope) compareScope.textContent=`Comparativa limitada a ${name}`;
}

function getBasicProductSuggestions(){
  const business=document.getElementById('fitBusiness').value;
  const users=Number(document.getElementById('fitPeople').value);
  const sales=document.getElementById('fitSales').value;
  const volume=document.getElementById('fitVolume').value;

  const product=currentProduct;
  let score=0;
  const reasons=[];

  if(product==='gesco3'){
    if(['distribution','workshop','mixed'].includes(business)){score+=3;reasons.push('gestión comercial, compras y almacén');}
    if(sales==='invoices'){score+=3;reasons.push('facturación y documentos comerciales');}
    if(sales==='mixed'){score+=2;reasons.push('actividad mixta');}
    if(volume==='high') score+=1;
  }

  if(product==='conta3'){
    if(['services','mixed','distribution','workshop'].includes(business)){score+=2;reasons.push('gestión contable y financiera');}
    if(sales==='accounting'){score+=4;reasons.push('contabilidad');}
    if(sales==='mixed'){score+=2;reasons.push('actividad mixta');}
  }

  if(product==='terven3'){
    if(business==='retail'){score+=4;reasons.push('venta de mostrador y TPV');}
    if(sales==='counter'){score+=4;reasons.push('caja y venta rápida');}
    if(volume==='high') score+=1;
  }

  if(users<=3) score+=1;

  return [{key:product,score,reasons}];
}

function renderBasicSuggestions(){
  const grid=document.getElementById('basicSuggestionsGrid');
  if(!grid) return;

  const data={
    gesco3:{
      name:'Cegid Gesco3',
      desc:'Gestión, facturación, compras, ventas y almacén.'
    },
    conta3:{
      name:'Cegid Conta3',
      desc:'Contabilidad, informes, tesorería y fiscalidad.'
    },
    terven3:{
      name:'Cegid Terven3',
      desc:'TPV, caja, tickets, inventario y venta de mostrador.'
    }
  };

  const suggestion=getBasicProductSuggestions()[0];
  const d=data[currentProduct];

  grid.innerHTML=`<article class="basic-suggestion primary">
    <span class="tag">Producto consultado</span>
    <b>${d.name}</b>
    <p>${suggestion.reasons.length
      ? `Según los datos básicos seleccionados, este producto puede cubrir necesidades relacionadas con ${[...new Set(suggestion.reasons)].join(', ')}.`
      : d.desc}</p>
  </article>`;
}

function updateDetailedNeedsForProduct(){
  const allowed={
    gesco3:['budgets','billing','stock','multiwarehouse','payments','reports'],
    conta3:['accounting','tax','amortization','payments','reports'],
    terven3:['pos','cash','simplified','stock','billing','reports']
  };
  const active=new Set(allowed[currentProduct]||[]);
  document.querySelectorAll('#fitNeeds .fit-check').forEach(label=>{
    const input=label.querySelector('input');
    if(!input) return;
    const show=active.has(input.value);
    label.style.display=show?'':'none';
    if(!show) input.checked=false;
  });
}


function getPlanFeatureUniverse(product){
  return {
    gesco3:[
      ['Almacén','stock'],
      ['Compras','purchases'],
      ['Ventas / facturación','billing'],
      ['Presupuestos / pedidos / albaranes','budgets'],
      ['Cobros / pagos','payments'],
      ['Trazabilidad / multialmacén','multiwarehouse'],
      ['Fabricación','manufacturing']
    ],
    conta3:[
      ['Contabilidad','accounting'],
      ['Informes / libros','reports'],
      ['Amortizaciones','amortization'],
      ['Fiscalidad','tax'],
      ['Tesorería / cobros-pagos','payments'],
      ['Analítica / SII','analytics']
    ],
    terven3:[
      ['TPV / venta de mostrador','pos'],
      ['Caja / arqueos','cash'],
      ['Facturas simplificadas','simplified'],
      ['Almacén','stock'],
      ['Inventario','inventory'],
      ['Albaranes / facturas','billing']
    ]
  }[product]||[];
}

function planHasFeature(product,plan,key){
  if(plan.needs.includes(key)) return true;

  if(product==='gesco3'){
    if(key==='purchases') return ['gescoA','gescoD','gescoE'].includes(plan.id);
    if(key==='manufacturing') return plan.id==='gescoE';
    if(key==='billing') return ['gescoB','gescoC','gescoD','gescoE'].includes(plan.id);
    if(key==='budgets') return ['gescoB','gescoC','gescoD','gescoE'].includes(plan.id);
    if(key==='stock') return ['gescoA','gescoC','gescoD','gescoE'].includes(plan.id);
  }

  if(product==='conta3'){
    if(key==='analytics') return plan.id==='contaS';
    if(key==='tax') return plan.id==='contaS';
    if(key==='amortization') return ['contaGeneral','contaS'].includes(plan.id);
    if(key==='reports') return ['contaGeneral','contaS'].includes(plan.id);
    if(key==='payments') return ['contaGeneral','contaS'].includes(plan.id);
  }

  if(product==='terven3'){
    if(key==='inventory') return plan.id==='tervenStock';
    if(key==='stock') return plan.id==='tervenStock';
    if(key==='billing') return plan.id==='tervenStock';
    if(['pos','cash','simplified'].includes(key)) return true;
  }
  return false;
}

function renderInternalPlanComparison(product,recommendedPlanId){
  const box=document.getElementById('internalPlanCompare');
  const plans=cegidPlans[product]||[];
  if(!box || plans.length<2){
    if(box) box.style.display='none';
    return;
  }

  const features=getPlanFeatureUniverse(product);
  const header=plans.map(p=>`
    <th class="${p.id===recommendedPlanId?'internal-plan-current':''}">
      ${p.code}
      <span class="internal-plan-price">${p.monthly}</span>
    </th>`).join('');

  const rows=features.map(([label,key])=>{
    const cells=plans.map(p=>{
      const included=planHasFeature(product,p,key);
      return `<td class="${p.id===recommendedPlanId?'internal-plan-current':''}" style="text-align:center">
        <span class="${included?'internal-plan-yes':'internal-plan-no'}">${included?'Sí':'—'}</span>
      </td>`;
    }).join('');
    return `<tr><td>${label}</td>${cells}</tr>`;
  }).join('');

  box.style.display='block';
  box.innerHTML=`
    <div class="internal-plan-compare-head">
      <strong>Comparativa entre planes de ${productScopeNames[product]}</strong>
      <p>Funciones, características, diferencias y precio dentro del mismo producto.</p>
    </div>
    <div class="internal-plan-table-wrap">
      <table class="internal-plan-table">
        <thead><tr><th>Función / característica</th>${header}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function selectedNeeds(){
  return [...document.querySelectorAll('#fitNeeds input:checked')].map(i=>i.value);
}
function recommendationForNeed(needs){
  const scores={gesco3:0,conta3:0,terven3:0};
  needs.forEach(n=>{
    Object.keys(scores).forEach(k=>scores[k]+=productData[k].weights[n]||0);
  });
  return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0];
}
function evaluateFit(){
  const needs=selectedNeeds();
  const plans=cegidPlans[currentProduct]||[];
  const labels={
    budgets:'presupuestos, pedidos y albaranes',
    billing:'facturación',
    stock:'almacén e inventario',
    multiwarehouse:'varios almacenes o trazabilidad',
    payments:'cobros, pagos y tesorería',
    accounting:'contabilidad completa',
    tax:'información fiscal y cuentas anuales',
    amortization:'amortizaciones',
    pos:'TPV y venta de mostrador',
    cash:'caja y arqueos',
    simplified:'facturas simplificadas',
    reports:'informes y análisis'
  };

  const relevantNeeds=needs.filter(n=>plans.some(p=>p.needs.includes(n)));

  const ranked=plans.map(plan=>{
    const covered=relevantNeeds.filter(n=>plan.needs.includes(n));
    const missing=relevantNeeds.filter(n=>!plan.needs.includes(n));
    return {plan,covered,missing,coversAll:missing.length===0};
  });

  let recommended=ranked
    .filter(x=>x.coversAll)
    .sort((a,b)=>a.plan.priceNumeric-b.plan.priceNumeric)[0];

  if(!recommended){
    recommended=ranked
      .sort((a,b)=>{
        if(b.covered.length!==a.covered.length) return b.covered.length-a.covered.length;
        return a.plan.priceNumeric-b.plan.priceNumeric;
      })[0];
  }

  selectedCegidPlan[currentProduct]=recommended.plan.id;

  const alternatives=plans
    .filter(p=>p.id!==recommended.plan.id)
    .filter(p=>p.priceNumeric>recommended.plan.priceNumeric)
    .filter(p=>p.priceNumeric-recommended.plan.priceNumeric<=15)
    .sort((a,b)=>a.priceNumeric-b.priceNumeric);

  document.getElementById('fitVerdict').textContent=`Planes de ${productScopeNames[currentProduct]} que se ajustan a lo que has seleccionado`;

  const coveredText=recommended.covered.length
    ? recommended.covered.map(n=>labels[n]).filter(Boolean).join(', ')
    : 'las necesidades generales indicadas';

  document.getElementById('fitSummary').textContent=
    `Se muestra primero el plan más asequible que cubre la mayor parte de lo solicitado.`;

  const ul=document.getElementById('fitReasons');
  ul.innerHTML=[
    `Plan principal: ${recommended.plan.code} · ${recommended.plan.name} · ${recommended.plan.monthly}.`,
    `Cubre especialmente: ${coveredText}.`
  ].map(r=>`<li>${r}</li>`).join('');

  document.getElementById('fitAlternative').innerHTML='';
  const planBox=document.getElementById('fitPlanRecommendation');
  planBox.style.display='block';
  planBox.innerHTML=`
    <strong>Plan más asequible ajustado a tu selección:</strong><br>
    ${recommended.plan.code} · ${recommended.plan.name} · <b>${recommended.plan.monthly}</b><br>
    <span style="color:var(--muted)">${recommended.plan.users}. ${recommended.plan.setup}.</span>
    ${alternatives.length?`
      <div style="margin-top:12px">
        <strong>Alternativas por hasta 15 € más:</strong>
        ${alternatives.map(p=>`
          <div style="margin-top:8px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:var(--surface2)">
            <b>${p.code} · ${p.name}</b> · ${p.monthly}<br>
            <span style="color:var(--muted)">+${(p.priceNumeric-recommended.plan.priceNumeric).toFixed(2).replace('.',',')} €/mes. Añade: ${p.features.join(', ')}.</span>
          </div>`).join('')}
      </div>`:''}
  `;

  renderInternalPlanComparison(currentProduct,recommended.plan.id);
  fitResult.classList.add('show');
  fitResult.scrollIntoView({behavior:'smooth',block:'nearest'});
}

document.getElementById('detailToggle').addEventListener('click',()=>{
  const panel=document.getElementById('detailPanel');
  const arrow=document.getElementById('detailArrow');
  const btn=document.getElementById('detailToggle');
  const isOpen=panel.classList.contains('open');
  if(isOpen){
    panel.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    arrow.textContent='▶';
  }else{
    panel.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    arrow.textContent='▼';
  }
});

document.getElementById('fitEvaluate').addEventListener('click',evaluateFit);
document.getElementById('fitReset').addEventListener('click',()=>{
  document.getElementById('fitBusiness').selectedIndex=0;
  document.getElementById('fitPeople').selectedIndex=0;
  document.getElementById('fitSales').selectedIndex=0;
  document.getElementById('fitVolume').selectedIndex=0;
  document.querySelectorAll('#fitNeeds input').forEach(i=>i.checked=false);
  fitResult.classList.remove('show');
});

document.getElementById('fitGoCompare').addEventListener('click',()=>{
  document.querySelectorAll('.fit-tab').forEach(t=>t.classList.remove('active'));
  const compareTab=document.querySelector('.fit-tab[data-fit-tab="compare"]');
  if(compareTab) compareTab.classList.add('active');
  document.getElementById('fitPaneMatch').classList.remove('active');
  document.getElementById('fitPaneCompare').classList.add('active');
  const target=document.querySelector('#fitPaneCompare .compare-intro');
  if(target) setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),30);
  recommendPlansForComparison();
});

document.getElementById('fitContact').addEventListener('click',closeFit);
