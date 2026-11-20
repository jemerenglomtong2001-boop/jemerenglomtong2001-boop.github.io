/* =========================================================
   Jomari Lomtong — Portfolio interactions
   ========================================================= */

(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------- Theme ---------------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, persist = false) {
    const nextTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = nextTheme;

    if (persist) {
      try {
        localStorage.setItem("jl-theme", nextTheme);
      } catch (error) {
        /* Storage can be unavailable in private mode. */
      }
    }

    if (themeToggle) {
      const nextLabel = nextTheme === "dark" ? "light" : "dark";
      themeToggle.setAttribute("aria-label", `Switch to ${nextLabel} theme`);
      themeToggle.setAttribute("title", `Switch to ${nextLabel} theme`);
    }

    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", nextTheme === "dark" ? "#070a12" : "#f6f8fc");
    }
  }

  applyTheme(root.dataset.theme || "dark");

  themeToggle?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  });

  /* ---------------- Header + back to top ---------------- */
  const header = document.getElementById("siteHeader");
  const backTop = document.getElementById("backTop");

  function onScroll() {
    const scrolled = window.scrollY > 8;
    header?.classList.toggle("is-scrolled", scrolled);
    backTop?.classList.toggle("is-visible", window.scrollY > 650);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  /* ---------------- Mobile menu ---------------- */
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("primaryNav");

  function setMenu(open) {
    if (!nav || !menuBtn) return;
    nav.classList.toggle("is-open", open);
    body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  menuBtn?.addEventListener("click", () => {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setMenu(false);
  });

  /* ---------------- Active navigation link ---------------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* ---------------- Role typewriter ---------------- */
  const roleRotator = document.getElementById("roleRotator");
  const roles = [
    "scalable web apps",
    "clean interfaces",
    "robust APIs",
    "delightful experiences",
  ];

  if (roleRotator && !reducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    function typeLoop() {
      const word = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      roleRotator.textContent = word.slice(0, Math.max(charIndex, 0));

      let delay = deleting ? 45 : 90;

      if (!deleting && charIndex >= word.length) {
        deleting = true;
        delay = 1900;
      } else if (deleting && charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 320;
      }

      window.setTimeout(typeLoop, delay);
    }

    window.setTimeout(typeLoop, 1900);
  }

  /* ---------------- Project filters ---------------- */
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const projectCards = Array.from(document.querySelectorAll(".project-card"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------------- Placeholder links ---------------- */
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  document.querySelectorAll("a[data-placeholder]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(link.dataset.placeholder || "Add this link in index.html");
    });
  });

  /* ---------------- Copy email ---------------- */
  const copyButton = document.getElementById("copyEmail");

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    textarea.remove();
    return copied;
  }

  copyButton?.addEventListener("click", async () => {
    const email = copyButton.dataset.email || "";

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        showToast("Email copied to clipboard");
        return;
      }
    } catch (error) {
      /* Fall through to the legacy approach. */
    }

    if (fallbackCopy(email)) {
      showToast("Email copied to clipboard");
    } else {
      showToast(`Email: ${email}`);
    }
  });

  /* ---------------- Subtle portrait tilt ---------------- */
  const portraitCard = document.getElementById("portraitCard");

  if (portraitCard && finePointer && !reducedMotion) {
    portraitCard.addEventListener("pointermove", (event) => {
      const rect = portraitCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      portraitCard.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
      portraitCard.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    });

    portraitCard.addEventListener("pointerleave", () => {
      portraitCard.style.setProperty("--ry", "0deg");
      portraitCard.style.setProperty("--rx", "0deg");
    });
  }

  /* ---------------- Footer year ---------------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
