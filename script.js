const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");

/* =========================
   MOBILE MENU
========================= */
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  const expanded =
    menuBtn.getAttribute("aria-expanded") === "true";

  menuBtn.setAttribute("aria-expanded", !expanded);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

/* =========================
   ACTIVE NAV LINK
========================= */
window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (
      link.getAttribute("href") === `#${currentSection}`
    ) {
      link.classList.add("active");
    }
  });
});

/* =========================
   HERO PARALLAX EFFECT
========================= */
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});

/* =========================
   SMOOTH BUTTON HOVER
========================= */
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});

/* =========================
   PAGE LOAD ANIMATION
========================= */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ===== Lightbox for project screenshots =====
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.shots img').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }
  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
