const finderProjects = [
  {
    title: "Landing Page",
    kind: "Website Project",
    stack: "HTML",
    status: "Ready",
    focus: "Hero",
    size: "48 KB",
    tags: "HTML, CSS, UI",
    accent: "#007aff",
    accentSoft: "rgba(0, 122, 255, 0.14)",
    description: "A clean landing page project with responsive sections, strong hierarchy and a polished first screen.",
  },
  {
    title: "Dashboard UI",
    kind: "Interface Project",
    stack: "Design",
    status: "Draft",
    focus: "Cards",
    size: "64 KB",
    tags: "Design, Cards, Layout",
    accent: "#ff2d8f",
    accentSoft: "rgba(255, 45, 143, 0.14)",
    description: "A dashboard-style interface with Finder-inspired panels, tidy controls and grouped content.",
  },
  {
    title: "Portfolio Site",
    kind: "Portfolio Project",
    stack: "Web",
    status: "Ready",
    focus: "Story",
    size: "52 KB",
    tags: "Portfolio, Responsive, Web",
    accent: "#34c759",
    accentSoft: "rgba(52, 199, 89, 0.14)",
    description: "A portfolio concept for presenting work, skills and contact information in a calm visual system.",
  },
  {
    title: "Gallery Grid",
    kind: "Gallery Project",
    stack: "CSS",
    status: "Ready",
    focus: "Grid",
    size: "39 KB",
    tags: "Gallery, Grid, CSS",
    accent: "#ff9500",
    accentSoft: "rgba(255, 149, 0, 0.16)",
    description: "A minimal image gallery template with soft spacing, clean thumbnails and a structured layout.",
  },
  {
    title: "App Prototype",
    kind: "Prototype Project",
    stack: "Prototype",
    status: "Concept",
    focus: "Glass",
    size: "71 KB",
    tags: "App, Glass, Prototype",
    accent: "#5856d6",
    accentSoft: "rgba(88, 86, 214, 0.15)",
    description: "A small app interface concept using blurred panels, rounded controls and iOS-style hierarchy.",
  },
  {
    title: "Case Study",
    kind: "Case Study",
    stack: "Content",
    status: "Ready",
    focus: "Process",
    size: "44 KB",
    tags: "Content, Case Study, Template",
    accent: "#5ac8fa",
    accentSoft: "rgba(90, 200, 250, 0.16)",
    description: "A case study section for describing goals, process and final results with a neat editorial rhythm.",
  },
];

const finderWindow = document.querySelector(".project-finder-window");
const finderFileItems = document.querySelectorAll(".finder-file-item");
const finderFileTrack = document.querySelector("#projectFinderFileTrack");
const finderPreview = document.querySelector("#projectFinderPreview");
const finderPrevButtons = [document.querySelector("#projectFinderPrev"), document.querySelector("#projectFinderPrevFile")];
const finderNextButtons = [document.querySelector("#projectFinderNext"), document.querySelector("#projectFinderNextFile")];
const finderCounter = document.querySelector("#projectFinderCounter");
const finderTitle = document.querySelector("#projectFinderTitle");
const finderKind = document.querySelector("#projectFinderKind");
const finderStack = document.querySelector("#projectFinderStack");
const finderStatus = document.querySelector("#projectFinderStatus");
const finderFocus = document.querySelector("#projectFinderFocus");
const finderDescription = document.querySelector("#projectFinderDescription");
const finderInspectorTitle = document.querySelector("#projectFinderInspectorTitle");
const finderInspectorType = document.querySelector("#projectFinderInspectorType");
const finderSize = document.querySelector("#projectFinderSize");
const finderTags = document.querySelector("#projectFinderTags");
const finderPath = document.querySelector("#projectFinderPath");
let currentFinderProject = 0;

function getFinderDistance(itemIndex, activeIndex) {
  const forward = (itemIndex - activeIndex + finderProjects.length) % finderProjects.length;
  const backward = (activeIndex - itemIndex + finderProjects.length) % finderProjects.length;

  return forward <= backward ? forward : -backward;
}

function animateFinderPreview(direction) {
  if (!finderPreview) {
    return;
  }

  finderPreview.style.setProperty("--finder-slide-direction", `${direction * 22}px`);
  finderPreview.classList.remove("is-switching");

  window.requestAnimationFrame(() => {
    finderPreview.classList.add("is-switching");
    window.setTimeout(() => {
      finderPreview.classList.remove("is-switching");
    }, 170);
  });
}

function selectFinderProject(index, direction = 1) {
  if (!finderWindow) {
    return;
  }

  const normalizedIndex = (index + finderProjects.length) % finderProjects.length;
  const project = finderProjects[normalizedIndex];

  currentFinderProject = normalizedIndex;
  animateFinderPreview(direction);

  finderFileItems.forEach((item) => {
    const itemIndex = Number(item.dataset.project);
    const distance = getFinderDistance(itemIndex, normalizedIndex);

    item.classList.toggle("active", itemIndex === normalizedIndex);
    item.classList.toggle("is-near", Math.abs(distance) === 1);
    item.setAttribute("aria-current", itemIndex === normalizedIndex ? "true" : "false");
  });

  finderPreview?.style.setProperty("--finder-accent", project.accent);
  finderPreview?.style.setProperty("--finder-accent-soft", project.accentSoft);

  finderTitle.textContent = project.title;
  finderKind.textContent = project.kind;
  finderStack.textContent = project.stack;
  finderStatus.textContent = project.status;
  finderFocus.textContent = project.focus;
  finderDescription.textContent = project.description;
  finderInspectorTitle.textContent = project.title;
  finderInspectorType.textContent = `${project.kind} document`;
  finderSize.textContent = project.size;
  finderTags.textContent = project.tags;
  finderPath.textContent = project.title;
  finderCounter.textContent = `${normalizedIndex + 1} of ${finderProjects.length}`;

  const activeFile = document.querySelector(".finder-file-item.active");

  if (activeFile && finderFileTrack) {
    const targetLeft = activeFile.offsetLeft - (finderFileTrack.clientWidth - activeFile.clientWidth) / 2;

    finderFileTrack.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }
}

function showNextFinderProject() {
  selectFinderProject(currentFinderProject + 1, 1);
}

function showPreviousFinderProject() {
  selectFinderProject(currentFinderProject - 1, -1);
}

if (finderWindow) {
  finderFileItems.forEach((item) => {
    item.addEventListener("click", () => {
      const nextIndex = Number(item.dataset.project);
      const direction = nextIndex >= currentFinderProject ? 1 : -1;

      selectFinderProject(nextIndex, direction);
    });
  });

  finderPrevButtons.forEach((button) => {
    button?.addEventListener("click", showPreviousFinderProject);
  });

  finderNextButtons.forEach((button) => {
    button?.addEventListener("click", showNextFinderProject);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showPreviousFinderProject();
    }

    if (event.key === "ArrowRight") {
      showNextFinderProject();
    }
  });

  selectFinderProject(0, 1);
}

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
