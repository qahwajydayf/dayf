/* =========================================
   Qahwaji Taif - main.js
   - FAQ accordion (accessible: aria-expanded + hidden)
   - Booking form -> WhatsApp (includes "via website" + page URL)
   - Smooth scroll anchors
   - Fade-in on scroll (IntersectionObserver)
   ========================================= */

(() => {
  "use strict";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- FAQ Accordion (Accessible) ----------
  // HTML structure expected:
  // .faq-item
  //   button.faq-question[aria-expanded="false"]
  //   .faq-answer[hidden]
  function closeAllFaq(exceptItem = null) {
    $$(".faq-item").forEach((item) => {
      if (exceptItem && item === exceptItem) return;

      const btn = $(".faq-question", item);
      const ans = $(".faq-answer", item);

      if (btn) btn.setAttribute("aria-expanded", "false");
      if (ans) ans.hidden = true;

      // optional legacy class support
      item.classList.remove("active");
    });
  }

  window.toggleFAQ = function (buttonEl) {
    const item = buttonEl?.closest(".faq-item");
    if (!item) return;

    const btn = $(".faq-question", item) || buttonEl;
    const ans = $(".faq-answer", item);

    const expanded = btn.getAttribute("aria-expanded") === "true";

    // close others
    closeAllFaq(item);

    // toggle current
    btn.setAttribute("aria-expanded", String(!expanded));
    if (ans) ans.hidden = expanded;

    // optional legacy class support
    item.classList.toggle("active", !expanded);
  };

  // Auto-bind clicks (حتى لو شلت onclick من الـ HTML)
  $$(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => window.toggleFAQ(btn));
  });

  // Ensure initial FAQ state is consistent
  $$(".faq-item").forEach((item) => {
    const btn = $(".faq-question", item);
    const ans = $(".faq-answer", item);
    if (!btn || !ans) return;

    // إذا ما فيه aria-expanded خلّه false
    if (!btn.hasAttribute("aria-expanded")) btn.setAttribute("aria-expanded", "false");

    const expanded = btn.getAttribute("aria-expanded") === "true";
    ans.hidden = !expanded;

    item.classList.toggle("active", expanded);
  });

  // ---------- Booking Form -> WhatsApp ----------
  const bookingForm = $("#bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());

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

      // Message (includes "via website" + page URL)
      let message = "سلام الله عليكم، اتواصل معكم عبر موقعكم\n";
      message += `رابط الصفحة: ${window.location.href}\n\n`;
      message += "أود حجز خدمة الضيافة التراثية:\n\n";
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
  const animated = $$(".standard-card, .value-card, .service-card, .stat-card, .area-card, .faq-item");

  if (!("IntersectionObserver" in window)) {
    animated.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  animated.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
})();
