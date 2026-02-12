/*********************************
  SAFE DOM READY
**********************************/
document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
  loadSponsors();
  initGalleryImages();
  initCountdown();
  initGalleryEffects();
});

/*********************************
  EVENTS
**********************************/
function loadEvents() {
  const el = document.getElementById("eventsContainer");
  if (!el) return;

  const events = JSON.parse(localStorage.getItem("events")) || [];
  el.innerHTML = "";

  events.forEach(e => {
    el.innerHTML += `
      <div class="card reveal">
        <h3>${e}</h3>
      </div>
    `;
  });
}

/*********************************
  SPONSORS
**********************************/
function loadSponsors() {
  const el = document.getElementById("sponsorsContainer");
  if (!el) return;

  const sponsors = JSON.parse(localStorage.getItem("sponsors")) || [];
  el.innerHTML = "";

  sponsors.forEach(s => {
    el.innerHTML += `
      <div class="card reveal">
        <h3>${s}</h3>
      </div>
    `;
  });
}

/*********************************
  GALLERY IMAGES (STATIC)
**********************************/
function initGalleryImages() {
  const galleryContainer = document.getElementById("galleryContainer");
  if (!galleryContainer) return;

  const images = [
    "assets/gallery/gallery1.jpeg",
    "assets/gallery/gallery2.jpeg",
    "assets/gallery/gallery3.jpeg",
    "assets/gallery/gallery4.jpeg",
    "assets/gallery/gallery5.jpeg"
  ];

  galleryContainer.innerHTML = "";

  images.forEach(src => {
    galleryContainer.innerHTML += `
      <div class="gallery-item">
        <img src="${src}" alt="Gallery Image">
      </div>
    `;
  });
}

/*********************************
  COUNTDOWN TIMER (SAFE)
**********************************/
function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const festDate = new Date("March 27, 2026 09:00:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = festDate - now;

    if (diff <= 0) {
      daysEl.textContent =
      hoursEl.textContent =
      minutesEl.textContent =
      secondsEl.textContent = "00";
      return;
    }

    daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
    hoursEl.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, "0");
    minutesEl.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, "0");
    secondsEl.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/*********************************
  PREMIUM GALLERY EFFECTS
**********************************/
function initGalleryEffects() {
  const items = document.querySelectorAll(".gallery-item");
  if (!items.length) return;

  const isTouch = window.matchMedia("(hover: none)").matches;

  items.forEach(item => {
    const img = item.querySelector("img");

    if (!isTouch) {
      item.addEventListener("mousemove", e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 14;
        const rotateY = (x - rect.width / 2) / 14;

        img.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(1.08)
        `;
      });

      item.addEventListener("mouseleave", () => {
        img.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
      });
    }

    item.addEventListener("click", () => openLightbox(img.src));
  });
}

/*********************************
  LIGHTBOX
**********************************/
function openLightbox(src) {
  let lightbox = document.getElementById("lightbox");

  if (!lightbox) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div id="lightbox" class="lightbox">
        <img id="lightboxImg">
      </div>
      `
    );
    lightbox = document.getElementById("lightbox");
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  document.getElementById("lightboxImg").src = src;
  lightbox.classList.add("active");
}
