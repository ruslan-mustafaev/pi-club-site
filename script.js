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
      { src: "/billiards/139ae7cf-fbd8-4446-90bf-4b7a2e645650.jpg", label: "Billiard Lounge" },
      { src: "/billiards/16244a08-fae4-4a80-92b3-cf040f628544.jpg", label: "Billiard Lounge" },
      { src: "/billiards/fca61e42-8940-47e9-b1da-73ff3350f636.jpg", label: "Billiard Lounge" },
    ],
    video: "/billiards/2.mp4",
  },

  bar: {
    kicker: "Premium Bar",
    title: "Signature Bar",
    text: "Dizajnový bar s prémiovou atmosférou, signature drinkami a priestorom pre štart večera pred klubovou nocou.",
    images: [
      { src: "/bar2/464bfe1b-7e0d-4f65-8fcf-61b103cbab7c.jpg", label: "Premium Bar" },
      { src: "/bar2/79553374-2d6e-418d-b2b0-461b4303b919.jpg", label: "Premium Bar" },
      { src: "/bar2/a262620f-1e41-46b2-bf4d-45b38f8db89c.jpg", label: "Premium Bar" },
      { src: "/bar2/ffdbbb0b-2a6b-4d8b-9058-c7584fa1a9be.jpg", label: "Premium Bar" },
    ],
  },

  cocktails: {
    kicker: "Cocktails",
    title: "Signature Cocktails",
    text: "Autorské koktaily miešané šikovnými barmanmi z prémiovych destilátov, čerstvých ingrediencií a vlastných receptúr. Každý drink je malé umelecké dielo.",
    images: [
      { src: "/cocktails/218aeda6-0565-4b44-9f13-807f41bfa8bc.jpg", label: "Cocktail" },
      { src: "/cocktails/274d9098-58fd-48fb-a693-45698c27b731_(1).jpg", label: "Cocktail" },
      { src: "/cocktails/561b68f1-4d74-4e3c-afac-76d79d023d68.jpg", label: "Cocktail" },
      { src: "/cocktails/7167f871-21d8-47a7-89c3-b423025d394a.jpg", label: "Cocktail" },
      { src: "/cocktails/861a9490-2599-4ac9-99eb-d0d76e264da3_(1).jpg", label: "Cocktail" },
      { src: "/cocktails/93e4b89c-ba32-4aa1-985c-1cd8377babfb.jpg", label: "Cocktail" },
      { src: "/cocktails/b083a85c-c64c-4640-be8f-c6f5d724cc6f.jpg", label: "Cocktail" },
      { src: "/cocktails/ced070a1-88d0-47c9-b600-750197b1ac6f.jpg", label: "Cocktail" },
    ],
  },

  karaoke1: {
    kicker: "VIP Karaoke",
    title: "VIP Karaoke 1",
    text: "Súkromná karaoke zóna pre spev, oslavy, menšie skupiny a VIP večery s vlastnou atmosférou.",
    images: [
      { src: "/k0-hvGDKtSf.jpg", label: "VIP Karaoke 1" },
      { src: "/k2.jpg", label: "VIP Karaoke 1" },
    ],
  },

  karaoke2: {
    kicker: "VIP Karaoke",
    title: "VIP Karaoke 2",
    text: "Druhá karaoke zóna pre skupiny hostí, súkromné rezervácie, oslavy a večerný program.",
    images: [
      { src: "/d9.jpg", label: "VIP Karaoke 2" },
      { src: "/d10.jpg", label: "VIP Karaoke 2" },
      { src: "/d11.jpg", label: "VIP Karaoke 2" },
    ],
  },

  dance: {
    kicker: "Dance & Night",
    title: "Dance Floor",
    text: "Energetická klubová zóna pre piatkové a sobotné noci, DJ program, svetelnú show a tanečný parket.",
    images: [
      { src: "/d1.jpg", label: "Dance & Night" },
      { src: "/d3.jpg", label: "Dance & Night" },
      { src: "/d4.jpg", label: "Dance & Night" },
      { src: "/d5.jpg", label: "Dance & Night" },
      { src: "/d6.jpg", label: "Dance & Night" },
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

  const videoHtml = zone.video
    ? `<article class="zone-photo zone-photo-video">
        <video autoplay muted loop playsinline>
          <source src="${zone.video}" type="video/mp4" />
        </video>
       </article>`
    : "";

  zoneCarousel.innerHTML =
    videoHtml +
    zone.images
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

/* ========================= */
/* FLIP CARDS — TAP ON TOUCH  */
/* ========================= */

(function initFlipCards() {
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  if (!isTouchDevice) return;

  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();

      flipCards.forEach((other) => {
        if (other !== card) other.classList.remove("flipped");
      });

      card.classList.toggle("flipped");
    });
  });
})();