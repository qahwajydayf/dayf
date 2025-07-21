const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "قهوجي وصبابين الطائف - فريق الضيافة التراثية",
  "alternateName": ["قهوجي الطايف", "قهوجي طائف"],
  "description": "أفضل فريق ضيافة يقدم القهوة العربية والضيافة التراثية في الطائف (الطايف – طائف) بخبرة أكثر من 10 سنوات.",
  "url": "https://qahwajydayf.github.io/dayf/",
  "keywords": ["قهوجي الطائف", "قهوجي الطايف", "قهوجي طائف", "ضيافة الطائف", "خدمات القهوة العربية"],
  "telephone": "+966507712688",
  "currenciesAccepted": "SAR",
  "paymentAccepted": "Cash, Bank Transfer",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "الطائف",
    "postalCode": "26432",
    "addressRegion": "منطقة مكة المكرمة",
    "addressCountry": "SA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.27028,
    "longitude": 40.41583
  },
  "openingHours": ["Mo-Su 00:00-23:59"],
  "timeZone": "Asia/Riyadh",
  "sameAs": [
    "https://wa.me/966507712688",
    "https://www.instagram.com/sa_a_.3"
  ]
};

// إضافة الكود تلقائيًا داخل <head>
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);
