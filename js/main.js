/* =========================================
   Qahwaji Taif - main.js
   - FAQ accordion
   - Booking form -> WhatsApp
   - Smooth scroll anchors
   - Fade-in on scroll (IntersectionObserver)
   ========================================= */

(() => {
  "use strict";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- FAQ Accordion ----------
  // HTML must use: onclick="toggleFAQ(this)" OR we auto-bind below
  window.toggleFAQ = function (element) {
    const faqItem = element?.closest(".faq-item");
    if (!faqItem) return;

    const isActive = faqItem.classList.contains("active");
    $$(".faq-item").forEach((item) => item.classList.remove("active"));
    if (!isActive) faqItem.classList.add("active");
  };

  // Optional: auto-bind clicks if you remove inline onclick
  $$(".faq-question").forEach((q) => {
    q.addEventListener("click", () => window.toggleFAQ(q));
  });

  // ---------- Booking Form -> WhatsApp ----------
  const bookingForm = $("#bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());

      // Convert select values to Arabic labels (optional)
      const eventLabels = {
        wedding: "حفل زفاف",
        corporate: "مناسبة شركات",
        family: "مناسبة عائلية",
        graduation: "حفل تخرج",
        birthday: "عيد ميلاد",
        other: "أخرى",
      };

      const areaLabels = {
        center: "مركز الطائف",
        hada: "الهدا",
        shafa: "الشفا",
        hawiya: "الحوية",
        other: "منطقة أخرى في الطائف",
      };

      // Basic validation (extra safety)
      const name = (data.name || "").trim();
      const phone = (data.phone || "").trim();

      if (!name) {
        alert("فضلاً اكتب الاسم الكامل.");
        $("#name")?.focus();
        return;
      }

      if (!phone) {
        alert("فضلاً اكتب رقم الهاتف.");
        $("#phone")?.focus();
        return;
      }

      // WhatsApp message
      let message = "مرحباً، أود حجز خدمة الضيافة التراثية:\n\n";
      message += `الاسم: ${name}\n`;
      message += `الهاتف: ${phone}\n`;
      message += `نوع المناسبة: ${eventLabels[data.eventType] || data.eventType || "غير محدد"}\n`;
      message += `تاريخ المناسبة: ${data.eventDate || "غير محدد"}\n`;
      message += `عدد الضيوف: ${data.guestCount || "غير محدد"}\n`;
      message += `منطقة الطائف: ${areaLabels[data.area] || data.area || "غير محدد"}\n`;

      const details = (data.details || "").trim();
      if (details) message += `تفاصيل إضافية: ${details}\n`;

      const waNumber = "966507712688";
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp (with fallback if popup blocked)
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = url;

      alert("تم إرسال طلب الحجز! سنتواصل معك قريباً.");
      bookingForm.reset();
    });
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = $(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---------- Fade-in on Scroll ----------
  // Requires CSS: .fade-in and .fade-in.visible
  const animated = $$(".standard-card, .value-card, .service-card, .stat-card");

  // If browser doesn't support IntersectionObserver, just show everything
  if (!("IntersectionObserver" in window)) {
    animated.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // performance
      }
    });
  }, observerOptions);

  animated.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
})();
