/* =========================================
   THEME A — CLEAN MINIMAL (RTL)
   Landing/Services friendly • Light • Readable
   Works with your existing HTML (no HTML changes)
   ========================================= */

:root{
  --primary-color:#003080;
  --secondary-color:#0ea5e9;
  --accent-color:#22c55e;

  --text-dark:#0f172a;
  --text-muted:#6b7280;

  --bg-body:#f3f4f6;
  --bg-light:#f9fafb;
  --bg-white:rgba(255,255,255,.92);

  --border-color:#e5e7eb;

  --shadow:0 10px 26px rgba(15,23,42,.07);
  --shadow-hover:0 16px 44px rgba(15,23,42,.12);

  --radius-sm:12px;
  --radius-md:16px;
  --radius-lg:18px;
  --radius-xl:20px;

  --blur:16px;
  --max-width:1200px;

  --focus-ring:0 0 0 3px rgba(14,165,233,.18);
  --transition:.2s ease;
}

/* =============== Reset =============== */
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:auto;}
body{
  font-family:'Cairo','Tajawal','Segoe UI',Tahoma,sans-serif;
  direction:rtl;
  text-align:right;
  line-height:1.85;
  color:var(--text-dark);
  background:
    radial-gradient(circle at top right, rgba(14,165,233,.08), transparent 55%),
    radial-gradient(circle at bottom left, rgba(34,197,94,.08), transparent 55%),
    var(--bg-body);
}
main{min-height:100vh;}
img{max-width:100%;display:block;}
a{
  color:inherit;
  text-decoration:none;
  transition:color var(--transition), background-color var(--transition), transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}
p{color:var(--text-muted);margin:0 0 1rem;font-size:1rem;}
ul{list-style-position:inside;}
svg{width:1em;height:1em;fill:currentColor;}
svg[stroke]{stroke:currentColor;fill:none;}

:where(a,button,input,select,textarea):focus{outline:none;}
:where(a,button,input,select,textarea):focus-visible{box-shadow:var(--focus-ring);border-radius:12px;}

.container{max-width:var(--max-width);margin:0 auto;}
.section{padding:3.2rem 1.5rem;}
.section-light{background:var(--bg-light);}
.text-center{text-align:center;}

/* ✅ منع أي شريط حكومي إن كان موجود في HTML */
.gov-topbar{display:none !important;}

/* ✅ تحسين القفز للـ anchors تحت الهيدر */
[id]{scroll-margin-top:92px;}

/* =============== Typography =============== */
h1,h2,h3,h4,h5,h6{font-weight:900;line-height:1.35;margin-bottom:.7rem;}
h1{font-size:clamp(1.95rem,4vw,2.85rem);}
h2{font-size:clamp(1.65rem,3vw,2.25rem);}
h3{font-size:1.18rem;}

/* =============== Header =============== */
header{
  position:sticky;
  top:0;
  z-index:1000;
  background:rgba(255,255,255,.92);
  border-bottom:1px solid rgba(148,163,184,.16);
  backdrop-filter:blur(var(--blur));
}
.header-container{
  max-width:var(--max-width);
  margin:0 auto;
  padding:.62rem 1.6rem;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
}

/* ترتيب عناصر الهيدر */
.logo{order:1;min-width:0;display:flex;align-items:center;gap:.75rem;}
.header-home-btn{order:2;}
nav{order:3;}
.mobile-menu-toggle{order:4;}

.logo-icon{width:2.6rem;height:2.6rem;color:var(--primary-color);}
.logo h2{margin:0;color:var(--primary-color);font-size:1.22rem;line-height:1.2;}
.logo p{margin:0;color:var(--text-muted);font-size:.84rem;line-height:1.2;}

.header-home-btn a{
  display:inline-flex;
  align-items:center;
  gap:.4rem;
  font-size:.85rem;
  font-weight:900;
  color:var(--primary-color);
  background:transparent;
  border:1px solid rgba(0,48,128,.22);
  padding:.42rem .95rem;
  border-radius:999px;
  white-space:nowrap;
}
.header-home-btn a:hover{
  background:rgba(0,48,128,.06);
  transform:translateX(-2px);
  box-shadow:0 10px 22px rgba(15,23,42,.10);
}

nav ul{
  list-style:none;
  display:flex;
  align-items:center;
  gap:1.35rem;
}
nav ul li{position:relative;}
nav ul li a{
  position:relative;
  font-weight:900;
  font-size:.95rem;
  color:var(--text-dark);
  padding:.35rem 0;
}
nav ul li a::after{
  content:'';
  position:absolute;
  right:0;
  bottom:-.35rem;
  width:0;
  height:2px;
  border-radius:999px;
  background:linear-gradient(90deg,var(--primary-color),var(--secondary-color));
  transition:width .25s ease;
}
nav ul li a:hover{color:var(--primary-color);}
nav ul li a:hover::after{width:100%;}
nav ul li a.active{color:var(--primary-color);}
nav ul li a.active::after{width:100%;}

/* Dropdown (Desktop) */
.dropdown-menu{
  display:none;
  position:absolute;
  top:110%;
  right:0;
  min-width:280px;
  padding:.55rem 0;
  background:var(--bg-white);
  border:1px solid rgba(148,163,184,.20);
  border-radius:14px;
  box-shadow:var(--shadow);
  z-index:1000;
}
.dropdown:hover .dropdown-menu{display:block;}
.dropdown-menu li a{
  display:block;
  padding:.75rem 1.2rem;
  font-weight:800;
  color:var(--text-dark);
}
.dropdown-menu li a::after{display:none;}
.dropdown-menu li a:hover{
  background:rgba(15,23,42,.04);
  color:var(--primary-color);
  padding-right:1.55rem;
}

/* Mobile menu toggle */
.mobile-menu-toggle{
  display:none;
  font-size:1.7rem;
  background:#fff;
  border:1px solid rgba(148,163,184,.30);
  border-radius:12px;
  padding:.5rem .65rem;
  color:var(--primary-color);
  cursor:pointer;
}

/* =============== Buttons =============== */
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:.55rem;
  padding:.85rem 1.6rem;
  border-radius:999px;
  font-weight:900;
  font-size:.96rem;
  cursor:pointer;
  border:none;
  white-space:nowrap;
  box-shadow:0 10px 22px rgba(15,23,42,.10);
  transition:transform var(--transition), box-shadow var(--transition), background-color var(--transition), border-color var(--transition);
}
.btn:hover{transform:translateY(-2px);box-shadow:var(--shadow-hover);}

.btn-primary,
.btn-call{
  background:linear-gradient(135deg,var(--primary-color),var(--secondary-color));
  color:#fff;
}
.btn-primary:hover,
.btn-call:hover{filter:brightness(.97);}

.btn-whatsapp,
.btn-wa{
  background:linear-gradient(135deg,#22c55e,#16a34a);
  color:#fff;
}

.btn-outline,
.btn-services{
  background:transparent;
  border:2px solid var(--primary-color);
  color:var(--primary-color);
  box-shadow:none;
}
.btn-outline:hover,
.btn-services:hover{background:rgba(0,48,128,.06);box-shadow:0 10px 28px rgba(37,100,235,.16);}

/* =============== Section title =============== */
.section-title{text-align:center;margin-bottom:2.2rem;}
.section-title{
  /* دعم حالتك: أحياناً h2 بدون div داخلي */
}
.section-title h2,
h2.section-title{
  display:inline-block;
  position:relative;
  padding-bottom:.75rem;
}
.section-title h2::after,
h2.section-title::after{
  content:'';
  position:absolute;
  right:50%;
  transform:translateX(50%);
  bottom:0;
  width:92px;
  height:3px;
  border-radius:999px;
  background:linear-gradient(90deg,var(--primary-color),var(--secondary-color));
}

/* =============== Cards & Grids =============== */
.card,
.standard-card,
.service-card,
.area-card,
.feature-item{
  background:var(--bg-white);
  border:1px solid rgba(148,163,184,.14);
  border-radius:18px;
  box-shadow:var(--shadow);
}

.standards-grid,
.services-grid,
.areas-grid,
.features-grid{
  display:grid;
  gap:1.4rem;
  grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));
}

.standard-card,
.service-card,
.area-card,
.feature-item{
  padding:1.7rem 1.45rem;
}

.standard-icon,
.service-icon,
.feature-icon{
  width:60px;height:60px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:16px;
  background:linear-gradient(135deg,var(--primary-color),var(--secondary-color));
  color:#fff;
  margin:0 auto 1rem;
}
.standard-icon svg,
.service-icon svg,
.feature-icon svg{width:28px;height:28px;fill:#fff;}

.standard-card h3,
.service-card h3,
.feature-item h3{margin-bottom:.5rem;}

/* =============== HERO (fix big gap) =============== */
.hero{
  position:relative;
  overflow:hidden;

  /* ✅ أهم تعديل: يقلل الفراغ تحت الهيدر */
  padding:2.05rem 1.25rem 3.1rem;

  background:
    radial-gradient(circle at top right, #e0f2fe 0, transparent 55%),
    radial-gradient(circle at bottom left, #dcfce7 0, transparent 55%),
    #f9fafb;
  border-bottom:1px solid rgba(148,163,184,.14);

  display:flex;
  flex-direction:column;
  gap:1.55rem;
}
.hero-content{max-width:760px;margin-inline:auto;position:relative;}
.hero-label{
  display:inline-flex;
  align-items:center;
  gap:.35rem;
  padding:.25rem .75rem;
  border-radius:999px;
  background:rgba(0,48,128,.06);
  border:1px solid rgba(0,48,128,.10);
  color:var(--primary-color);
  font-weight:900;
  font-size:.85rem;

  /* ✅ تقليل المسافة تحتها */
  margin-bottom:.35rem;
}
.hero-label::before{
  content:"";
  width:8px;height:8px;border-radius:999px;
  background:var(--accent-color);
}
.hero h1{margin:0 0 .55rem;}
.hero-subtitle{margin:0 0 .9rem;color:#4b5563;}
.hero-cta{display:flex;flex-wrap:wrap;gap:.75rem;margin-bottom:.75rem;}
.hero-meta{font-size:.88rem;color:#6b7280;font-weight:800;}

/* بطاقات مزايا/معلومات داخل الهيرو إن وجدت */
.hero-features{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));
  gap:1rem;
  margin-top:.9rem;
}
.hero-feature{
  background:var(--bg-white);
  border:1px solid rgba(148,163,184,.14);
  border-radius:16px;
  padding:1.2rem 1.1rem;
  box-shadow:var(--shadow);
}
.hero-feature h3{margin:.6rem 0 .2rem;font-size:1.05rem;}
.hero-feature p{margin:0;color:var(--text-muted);}

/* Hero card (aside) */
.hero-aside{max-width:420px;margin-inline:auto;}
.hero-card{
  background:#fff;
  border:1px solid rgba(148,163,184,.28);
  border-radius:18px;
  padding:1.4rem 1.25rem;
  box-shadow:0 16px 38px rgba(15,23,42,.10);
}
.hero-working-hours{
  margin-top:.6rem;
  padding-top:.6rem;
  border-top:1px dashed #e5e7eb;
  font-weight:900;
  color:#111827;
}

@media (min-width:768px){
  .hero{
    padding:2.65rem 1.5rem 3.8rem;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    gap:2rem;
  }
  .hero-content{margin-inline:0;}
}

/* =============== Service Areas section (your HTML has .service-areas) =============== */
.service-areas{
  background:linear-gradient(135deg, var(--primary-color), #021b49);
  color:#fff;
}
.service-areas .section-title,
.service-areas .section-title h2,
.service-areas p{color:#fff;}
.service-areas .section-title h2::after{background:linear-gradient(90deg,#fff, rgba(255,255,255,.65));}

.service-areas .area-card{
  background:rgba(255,255,255,.10);
  border:1px solid rgba(255,255,255,.18);
  box-shadow:none;
  color:#fff;
}
.service-areas .area-card h4{margin-bottom:.6rem;color:#fff;font-weight:950;}
.service-areas .area-card ul{list-style:none;padding:0;margin:0;}
.service-areas .area-card li{padding:.25rem 0;opacity:.92;}

/* =============== Regions buttons (fix sticking on mobile) =============== */
.regions-list{
  display:flex;
  flex-wrap:wrap;
  gap:.65rem;
}
.regions-list .btn{box-shadow:none;}
.regions-list .btn:hover{box-shadow:var(--shadow-hover);}

@media (max-width:768px){
  .regions-list .btn{flex:1 1 calc(50% - .65rem);min-width:0;}
}
@media (max-width:420px){
  .regions-list .btn{flex:1 1 100%;}
}

/* =============== Booking / Forms =============== */
.booking-section .booking-form,
.contact-form{
  max-width:720px;
  margin:2rem auto 0;
  background:var(--bg-white);
  border:1px solid rgba(148,163,184,.16);
  border-radius:18px;
  box-shadow:var(--shadow);
  padding:1.85rem 1.6rem;
}
.form-grid{
  display:grid;
  grid-template-columns:repeat(2, minmax(0, 1fr));
  gap:1rem;
}
@media (max-width:640px){
  .form-grid{grid-template-columns:1fr;}
}

.form-group{margin-bottom:1.05rem;}
.form-group label{display:block;margin-bottom:.45rem;font-weight:900;color:var(--text-dark);}
.form-group input,
.form-group select,
.form-group textarea,
.form-input{
  width:100%;
  padding:.85rem .9rem;
  border:1px solid var(--border-color);
  border-radius:12px;
  background:#f9fafb;
  font-size:.98rem;
  transition:border-color var(--transition), box-shadow var(--transition), background-color var(--transition);
}
.form-group textarea{min-height:120px;resize:vertical;}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus,
.form-input:focus{
  border-color:var(--secondary-color);
  background:#fff;
  box-shadow:0 0 0 3px rgba(14,165,233,.15);
}
.form-group input::placeholder,
.form-group textarea::placeholder{color:#9ca3af;}

/* =============== FAQ (your HTML uses button + hidden div) =============== */
.faq-item{
  background:var(--bg-white);
  border:1px solid rgba(148,163,184,.14);
  border-radius:16px;
  box-shadow:var(--shadow);
  overflow:hidden;
  margin-bottom:.9rem;
}
.faq-question{
  width:100%;
  background:transparent;
  border:none;
  padding:1rem 1.1rem;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  font-weight:900;
  color:var(--text-dark);
}
.faq-question:hover{background:rgba(15,23,42,.03);}
.faq-toggle{opacity:.85;transition:transform var(--transition);}
.faq-question[aria-expanded="true"] .faq-toggle{transform:rotate(180deg);}
.faq-answer{
  padding:0 1.1rem 1.1rem;
  color:var(--text-muted);
  line-height:1.9;
}

/* =============== Footer =============== */
footer{
  background:#020617;
  color:#f9fafb;
  padding:3rem 1.5rem 1.5rem;
  margin-top:2rem;
}
footer a{color:#fff;text-decoration:underline;text-decoration-color:rgba(255,255,255,.35);}
footer a:hover{text-decoration-color:#fff;}

/* =============== WhatsApp floating (your HTML uses .whatsapp-btn) =============== */
.whatsapp-btn{
  position:fixed;
  left:1rem;
  bottom:1.15rem;
  display:inline-flex;
  align-items:center;
  gap:.55rem;
  background:#22c55e;
  color:#fff;
  padding:.6rem .95rem;
  border-radius:999px;
  font-weight:950;
  font-size:.9rem;
  box-shadow:0 12px 28px rgba(0,0,0,.18);
  z-index:999;
  white-space:nowrap;
}
.whatsapp-btn svg{width:20px;height:20px;fill:#fff;}
.whatsapp-btn:hover{transform:translateY(-2px);box-shadow:0 16px 34px rgba(0,0,0,.22);}

@media (max-width:640px){
  .whatsapp-btn{font-size:.82rem;padding:.55rem .85rem;left:.75rem;bottom:.95rem;}
}

/* =============== Mobile Nav =============== */
@media (max-width:768px){
  nav{display:none;}
  .mobile-menu-toggle{display:block;}

  nav.mobile-active{
    display:block;
    position:absolute;
    top:100%;
    right:0;
    left:0;
    background:#fff;
    border-bottom:1px solid rgba(148,163,184,.16);
    box-shadow:var(--shadow);
    padding:.85rem 1rem 1.15rem;
    z-index:2000;
    max-height:calc(100vh - 72px);
    overflow:auto;
    -webkit-overflow-scrolling:touch;
  }
  nav.mobile-active ul{
    flex-direction:column;
    align-items:flex-start;
    gap:.65rem;
  }
  nav.mobile-active ul li a{display:block;width:100%;padding:.45rem 0;}
  nav.mobile-active ul li a::after{display:none;}

  .header-container{
    padding:.55rem 1rem;
    gap:.75rem;
    flex-wrap:wrap;
    position:relative;
  }

  .logo{order:1;flex:1 1 auto;min-width:0;}
  .mobile-menu-toggle{order:2;margin-inline-start:auto;font-size:1.45rem;padding:.42rem .55rem;}

  .header-home-btn{order:10;width:100%;margin-top:.35rem;}
  .header-home-btn a{width:100%;justify-content:center;}

  .btn{width:100%;justify-content:center;}

  /* ✅ تقليل الهيرو أكثر على الموبايل (حل الفراغ) */
  .hero{padding:1.55rem 1.1rem 3rem;}
}
