const cards = document.querySelectorAll(".project-card");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const dotsBox = document.querySelector(".carousel-dots");

let currentIndex = 0;
let autoSlide;

cards.forEach((card, index) => {
  const dot = document.createElement("button");

  dot.setAttribute("aria-label", `Show project ${index + 1}`);

  dot.addEventListener("click", () => {
    showSlide(index);
    restartAutoSlide();
  });

  dotsBox.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dots button");

function showSlide(index) {
  currentIndex = (index + cards.length) % cards.length;

  const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
  const nextIndex = (currentIndex + 1) % cards.length;

  cards.forEach((card, i) => {
    card.classList.remove("active", "prev", "next");

    if (i === currentIndex) {
      card.classList.add("active");
    }

    if (i === prevIndex) {
      card.classList.add("prev");
    }

    if (i === nextIndex) {
      card.classList.add("next");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 10000);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  restartAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  restartAutoSlide();
});

showSlide(currentIndex);
startAutoSlide();

const themeToggle = document.querySelector("#themeToggle");
const themeToggleLabel = themeToggle?.querySelector(".theme-toggle-label");
const savedTheme = localStorage.getItem("theme");

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  if (themeToggleLabel) {
    themeToggleLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
  }
}

setTheme(savedTheme === "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");

    setTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const fallbackEmail = "hello@example.com";
    const to = String(data.get("to") || fallbackEmail).trim() || fallbackEmail;
    const cc = String(data.get("cc") || "").trim();
    const subject = String(data.get("subject") || "Portfolio contact").trim() || "Portfolio contact";
    const from = String(data.get("from") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = [`From: ${from}`, "", message].join("\n");
    const params = new URLSearchParams();

    if (cc) {
      params.set("cc", cc);
    }

    params.set("subject", subject);
    params.set("body", body);

    window.location.href = `mailto:${to}?${params.toString()}`;
  });
}
