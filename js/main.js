/* =========================================================
   Qahwaji Taif - main.js
   - Sticky header height -> CSS var (fix overlap)
   - Mobile menu (accessible)
   - Smooth scroll with offset
   - FAQ accordion (accessible) + JSON-LD FAQPage auto-fill
   - Booking form -> WhatsApp message (includes page URL)
   - Reveal animation (IntersectionObserver)
   ========================================================= */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Header height -> CSS var (حل تغطية الهيرو/المحتوى) ----------
  const header = $("#siteHeader");
  function syncHeaderHeight() {
    if (!header) return;
    const h = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  }
  window.addEventListener("resize", syncHeaderHeight, { passive: true });
  window.addEventListener("load", syncHeaderHeight, { passive: true });
  syncHeaderHeight();

  // ---------- Mobile Menu ----------
  const toggleBtn = $(".nav-toggle");
  const menu = $("#navMenu");

  function setMenu(open) {
    if (!toggleBtn || !menu) return;
    toggleBtn.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
  }

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      setMenu(!expanded);
    });

    // close on outside click
    document.addEventListener("click", (e) => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      if (!isOpen) return;

      const within = menu.contains(e.target) || toggleBtn.contains(e.target);
      if (!within) setMenu(false);
    });

    // close when click a link
    $$("#navMenu a").forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  // ---------- Smooth scroll with header offset ----------
  function scrollToId(id) {
    const el = $(id);
    if (!el) return;
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
    const top = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 10);
    window.scrollTo({ top, behavior: "smooth" });
  }

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      scrollToId(href);
    });
  });

  // ---------- FAQ Accordion (Accessible) ----------
  const faqButtons = $$(".faq-q");
  function closeAllFaq(exceptBtn = null) {
    faqButtons.forEach((btn) => {
      if (exceptBtn && btn === exceptBtn) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (!expanded) return;
      btn.setAttribute("aria-expanded", "false");
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (panel) panel.hidden = true;
    });
  }

  faqButtons.forEach((btn) => {
    const panelId = btn.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;

    // default state
    btn.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      closeAllFaq(btn);
      btn.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  // ---------- JSON-LD FAQPage auto fill from DOM ----------
  const faqLdEl = $("#faqJsonLd");
  if (faqLdEl && faqButtons.length) {
    const entities = faqButtons.map((btn) => {
      const q = btn.dataset.q?.trim() || btn.textContent.trim();
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      const a = panel?.dataset.a?.trim() || panel?.textContent.trim() || "";
      return {
        "@type": "Question",
        "name": q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": a
        }
      };
    });

    const json = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": entities
    };

    faqLdEl.textContent = JSON.stringify(json);
  }

  // ---------- Booking Form -> WhatsApp ----------
  const bookingForm = $("#bookingForm");
  const eventDate = $("#eventDate");
  const yearEl = $("#year");

  // Year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Min date = today
  if (eventDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    eventDate.min = `${yyyy}-${mm}-${dd}`;
  }

  function isValidPhone(phone) {
    const clean = String(phone || "").replace(/[^\d+]/g, "");
    // accepts: 05xxxxxxxx OR +9665xxxxxxxx OR 9665xxxxxxxx
    return /^(05\d{8}|(\+?966)5\d{8})$/.test(clean);
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(bookingForm);
      const data = Object.fromEntries(fd.entries());

      const name = (data.name || "").trim();
      const phone = (data.phone || "").trim();
      const eventType = (data.eventType || "").trim();
      const eventDateVal = (data.eventDate || "").trim();
      const guestCount = (data.guestCount || "").trim();
      const area = (data.area || "").trim();
      const details = (data.details || "").trim();

      // simple validation
      if (!name) {
        alert("فضلاً اكتب الاسم الكامل.");
        $("#name")?.focus();
        return;
      }
      if (!phone || !isValidPhone(phone)) {
        alert("فضلاً اكتب رقم هاتف صحيح (مثال: 05xxxxxxxx).");
        $("#phone")?.focus();
        return;
      }
      if (!eventType) {
        alert("فضلاً اختر نوع المناسبة.");
        $("#eventType")?.focus();
        return;
      }
      if (!eventDateVal) {
        alert("فضلاً اختر تاريخ المناسبة.");
        $("#eventDate")?.focus();
        return;
      }
      if (!guestCount) {
        alert("فضلاً اختر عدد الضيوف.");
        $("#guestCount")?.focus();
        return;
      }
      if (!area) {
        alert("فضلاً اختر الحي/المنطقة داخل الطائف.");
        $("#area")?.focus();
        return;
      }

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
        other: "حي/منطقة أخرى في الطائف",
      };

      let msg = "سلام الله عليكم، أود حجز خدمة قهوجي الطائف عبر الموقع.\n";
      msg += `رابط الصفحة: ${window.location.href}\n\n`;
      msg += "تفاصيل الحجز:\n";
      msg += `الاسم: ${name}\n`;
      msg += `الجوال: ${phone}\n`;
      msg += `نوع المناسبة: ${eventLabels[eventType] || eventType}\n`;
      msg += `تاريخ المناسبة: ${eventDateVal}\n`;
      msg += `عدد الضيوف: ${guestCount}\n`;
      msg += `المنطقة داخل الطائف: ${areaLabels[area] || area}\n`;
      if (details) msg += `تفاصيل إضافية: ${details}\n`;

      const waNumber = "966507712688";
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = url;

      bookingForm.reset();
    });
  }

  // ---------- Reveal on scroll ----------
  const revealEls = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          obs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => io.observe(el));
})();
