if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function forceTopOnFreshOpen() {
  if (!window.location.hash) {
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 120);
  }
}

window.addEventListener("pageshow", forceTopOnFreshOpen);
window.addEventListener("load", forceTopOnFreshOpen);

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      mobileNav.classList.remove("active");
    });
  });
}

const zoneData = {
  billiard: {
    kicker: "Chill & Play",
    title: "Billiard Lounge",
    text: "Komfortná billiard lounge zóna s tlmeným osvetlením, príjemnou hudbou, prémiovým barom a atmosférou pre oddych počas týždňa.",
    images: [
      { src: "assets/img/biliard/b0.jpg", label: "Billiard Lounge" },
      { src: "assets/img/biliard/b1.jpg", label: "Billiard Lounge" },
      { src: "assets/img/biliard/b2.jpg", label: "Billiard Lounge" },
      { src: "assets/img/biliard/b3.jpg", label: "Billiard Lounge" },
      { src: "assets/img/biliard/b4.jpg", label: "Billiard Lounge" },
    ],
  },

  bar: {
    kicker: "Premium Bar",
    title: "Signature Bar",
    text: "Dizajnový bar s prémiovou atmosférou, signature drinkami a priestorom pre štart večera pred klubovou nocou.",
    images: [
      { src: "assets/img/bar/bar0.jpg", label: "Premium Bar" },
    ],
  },

  karaoke1: {
    kicker: "VIP Karaoke",
    title: "VIP Karaoke 1",
    text: "Súkromná karaoke zóna pre spev, oslavy, menšie skupiny a VIP večery s vlastnou atmosférou.",
    images: [
      { src: "assets/img/vip_karaoke_1/k0.jpg", label: "VIP Karaoke 1" },
      { src: "assets/img/vip_karaoke_1/k2.jpg", label: "VIP Karaoke 1" },
    ],
  },

  karaoke2: {
    kicker: "VIP Karaoke",
    title: "VIP Karaoke 2",
    text: "Druhá karaoke zóna pre skupiny hostí, súkromné rezervácie, oslavy a večerný program.",
    images: [
      { src: "assets/img/vip_karaoke_2/k2_1.jpg", label: "VIP Karaoke 2" },
      { src: "assets/img/vip_karaoke_2/k2_2.jpg", label: "VIP Karaoke 2" },
    ],
  },

  dance: {
    kicker: "Dance & Night",
    title: "Dance Floor",
    text: "Energetická klubová zóna pre piatkové a sobotné noci, DJ program, svetelnú show a tanečný parket.",
    images: [
      { src: "assets/img/disco_zone/d1.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d2.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d3.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d4.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d5.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d6.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d7.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d8.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d9.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d10.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d11.jpg", label: "Dance & Night" },
      { src: "assets/img/disco_zone/d12.jpg", label: "Dance & Night" },
    ],
  },
};


const zoneTabs = document.querySelectorAll(".zone-tab");
const zoneKicker = document.getElementById("zoneKicker");
const zoneTitle = document.getElementById("zoneTitle");
const zoneText = document.getElementById("zoneText");
const zoneCarousel = document.getElementById("zoneCarousel");

/* ========================= */
/* CAROUSEL ARROWS            */
/* ========================= */

const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");

function updateCarouselArrows() {
  if (!zoneCarousel || !carouselPrev || !carouselNext) return;

  const scrollLeft = zoneCarousel.scrollLeft;
  const maxScroll = zoneCarousel.scrollWidth - zoneCarousel.clientWidth;

  if (maxScroll <= 4) {
    carouselPrev.classList.remove("visible");
    carouselNext.classList.remove("visible");
    return;
  }

  if (scrollLeft > 8) {
    carouselPrev.classList.add("visible");
  } else {
    carouselPrev.classList.remove("visible");
  }

  if (scrollLeft < maxScroll - 8) {
    carouselNext.classList.add("visible");
  } else {
    carouselNext.classList.remove("visible");
  }
}

function scrollCarousel(direction) {
  if (!zoneCarousel) return;

  const card = zoneCarousel.querySelector(".zone-photo");
  const scrollAmount = card ? card.offsetWidth + 14 : 300;

  zoneCarousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

if (carouselPrev) {
  carouselPrev.addEventListener("click", () => scrollCarousel(-1));
}

if (carouselNext) {
  carouselNext.addEventListener("click", () => scrollCarousel(1));
}

if (zoneCarousel) {
  zoneCarousel.addEventListener("scroll", updateCarouselArrows, { passive: true });

  new ResizeObserver(() => {
    updateCarouselArrows();
  }).observe(zoneCarousel);
}

/* ========================= */
/* ZONE TABS                  */
/* ========================= */

function renderZone(zoneKey) {
  const zone = zoneData[zoneKey];

  if (!zone || !zoneKicker || !zoneTitle || !zoneText || !zoneCarousel) return;

  zoneKicker.textContent = zone.kicker;
  zoneTitle.textContent = zone.title;
  zoneText.textContent = zone.text;

  zoneCarousel.innerHTML = zone.images
    .map(
      (image) => `
        <article class="zone-photo">
          <img
            src="${image.src}"
            alt="${image.label}"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
        </article>
      `
    )
    .join("");

  zoneCarousel.scrollTo({
    left: 0,
    behavior: "instant",
  });

  requestAnimationFrame(() => {
    updateCarouselArrows();
  });
}

if (zoneTabs.length > 0) {
  zoneTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      zoneTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderZone(tab.dataset.zone);
    });
  });

  renderZone("billiard");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Service Worker registered");
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

/* ========================= */
/* IMAGE LIGHTBOX             */
/* ========================= */

const imageLightbox = document.getElementById("imageLightbox");
const imageLightboxImg = document.getElementById("imageLightboxImg");
const imageLightboxCaption = document.getElementById("imageLightboxCaption");
const imageLightboxClose = document.getElementById("imageLightboxClose");
const imageLightboxPrev = document.getElementById("imageLightboxPrev");
const imageLightboxNext = document.getElementById("imageLightboxNext");

let lightboxImages = [];
let currentLightboxIndex = 0;

function getLightboxImages(clickedImage) {
  const zoneCarousel = clickedImage.closest(".zone-carousel");
  const galleryGrid = clickedImage.closest(".gallery-grid");
  const scope = zoneCarousel || galleryGrid || document;

  return Array.from(scope.querySelectorAll(".zone-photo img, .gallery-card img"));
}

function renderLightboxImage() {
  const image = lightboxImages[currentLightboxIndex];

  if (!image || !imageLightboxImg || !imageLightboxCaption) return;

  imageLightboxImg.src = image.currentSrc || image.src;
  imageLightboxImg.alt = image.alt || "Pi CLUB photo";
  imageLightboxCaption.textContent = image.alt || "";
}

function openImageLightbox(clickedImage) {
  if (!imageLightbox || !clickedImage) return;

  lightboxImages = getLightboxImages(clickedImage);
  currentLightboxIndex = lightboxImages.indexOf(clickedImage);

  if (currentLightboxIndex < 0) {
    currentLightboxIndex = 0;
  }

  renderLightboxImage();

  imageLightbox.classList.add("active");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeImageLightbox() {
  if (!imageLightbox) return;

  imageLightbox.classList.remove("active");
  imageLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");

  if (imageLightboxImg) {
    imageLightboxImg.src = "";
    imageLightboxImg.alt = "";
  }
}

function changeLightboxImage(direction) {
  if (lightboxImages.length === 0) return;

  currentLightboxIndex =
    (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;

  renderLightboxImage();
}

document.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".zone-photo, .gallery-card");

  if (!clickedCard) return;

  const clickedImage = clickedCard.querySelector("img");

  if (!clickedImage) return;

  event.preventDefault();
  openImageLightbox(clickedImage);
});

if (imageLightboxClose) {
  imageLightboxClose.addEventListener("click", closeImageLightbox);
}

if (imageLightboxPrev) {
  imageLightboxPrev.addEventListener("click", () => {
    changeLightboxImage(-1);
  });
}

if (imageLightboxNext) {
  imageLightboxNext.addEventListener("click", () => {
    changeLightboxImage(1);
  });
}

if (imageLightbox) {
  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox) {
      closeImageLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (!imageLightbox || !imageLightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeImageLightbox();
  }

  if (event.key === "ArrowLeft") {
    changeLightboxImage(-1);
  }

  if (event.key === "ArrowRight") {
    changeLightboxImage(1);
  }
});

/* ========================= */
/* SCROLL REVEAL ANIMATIONS   */
/* ========================= */

(function initScrollReveal() {
  const revealSections = document.querySelectorAll(".reveal");
  const revealItems = document.querySelectorAll(".reveal-item");

  if (!revealSections.length && !revealItems.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealSections.forEach((section) => {
    sectionObserver.observe(section);
  });

  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const parent = entry.target.closest(".cards, .program-list, .gallery-grid");
          if (parent) {
            const siblings = parent.querySelectorAll(".reveal-item");
            siblings.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("revealed");
              }, index * 120);
            });

            siblings.forEach((item) => itemObserver.unobserve(item));
          } else {
            entry.target.classList.add("revealed");
            itemObserver.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => {
    itemObserver.observe(item);
  });
})();