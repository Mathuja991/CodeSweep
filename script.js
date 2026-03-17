const modules = [
  {
    id: "frontend",
    tag: "frontend",
    title: "Admin dashboard and verification UI",
    summary:
      "Form-based task submission, lab machine visibility, pending file verification, and audit monitoring."
  },
  {
    id: "backend",
    tag: "backend",
    title: "TCP master and orchestration",
    summary:
      "Converts admin requests into structured scan tasks and dispatches them to connected client agents."
  },
  {
    id: "agent",
    tag: "client-agent",
    title: "Distributed scanning agents",
    summary:
      "Scans configured directories, detects target-language files, quarantines matches, and executes approved deletions."
  },
  {
    id: "shared",
    tag: "shared",
    title: "Persistence and shared schemas",
    summary:
      "Stores agent status, detected file records, verification queue, and deletion report history."
  }
];

const surfaces = [
  {
    id: "backend_stack",
    title: "Backend Stack",
    headline: "Python, Flask, SQLAlchemy, and SQLite drive task processing and verification APIs.",
    points: [
      "Python for orchestration and agent logic",
      "Flask for admin UI endpoints and control APIs",
      "SQLAlchemy + SQLite for persistence"
    ]
  },
  {
    id: "frontend_stack",
    title: "Frontend Stack",
    headline: "Jinja2 templates with Bootstrap components provide a responsive admin dashboard.",
    points: [
      "HTML, CSS, and JavaScript interface",
      "Jinja2-rendered Flask templates",
      "Bootstrap 5 and Font Awesome"
    ]
  },
  {
    id: "ops_stack",
    title: "Networking and Deployment",
    headline: "TCP socket communication and containerized execution support distributed lab operation.",
    points: [
      "TCP sockets between master and client agents",
      "Docker and Docker Compose runtime",
      "Cross-platform deployment support"
    ]
  }
];

const workflow = [
  "Administrator submits target languages, scan directories, and optional filters.",
  "Backend transforms the request into a structured scan task.",
  "Master server dispatches scan tasks to connected client agents.",
  "Agents detect matching files and move them to quarantine first.",
  "Detected file records are returned and shown for human verification.",
  "Administrator approves, modifies, or rejects deletion candidates.",
  "Approved files are permanently deleted by agents.",
  "Status updates and deletion reports are stored for audit monitoring."
];

const stats = {
  supportedLanguages: "14",
  mappedSeats: "200",
  coreModules: "4",
  verifiedWorkflow: "8"
};

function renderModules() {
  const list = document.getElementById("module-list");
  const tag = document.getElementById("module-tag");
  const title = document.getElementById("module-title");
  const summary = document.getElementById("module-summary");
  let activeId = modules[0].id;

  const update = () => {
    const current = modules.find((item) => item.id === activeId) || modules[0];
    tag.textContent = current.tag;
    title.textContent = current.title;
    summary.textContent = current.summary;

    list.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.id === activeId);
      button.setAttribute("aria-selected", String(button.dataset.id === activeId));
    });
  };

  modules.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tab-button";
    button.dataset.id = item.id;
    button.setAttribute("role", "tab");
    button.innerHTML = `<span class="tab-label">${item.tag}</span><span class="tab-title">${item.title}</span>`;
    button.addEventListener("click", () => {
      activeId = item.id;
      update();
    });
    list.appendChild(button);
  });

  update();
}

function renderWorkflow() {
  const list = document.getElementById("workflow-list");
  workflow.forEach((step, index) => {
    const card = document.createElement("article");
    card.className = "workflow-card";
    card.innerHTML = `<div class="workflow-number">0${index + 1}</div><p>${step}</p>`;
    list.appendChild(card);
  });
}

function renderSurfaces() {
  const tabs = document.getElementById("surface-tabs");
  const name = document.getElementById("surface-name");
  const headline = document.getElementById("surface-headline");
  const points = document.getElementById("surface-points");
  let activeId = surfaces[0].id;

  const update = () => {
    const current = surfaces.find((item) => item.id === activeId) || surfaces[0];
    name.textContent = current.title;
    headline.textContent = current.headline;
    points.innerHTML = "";

    current.points.forEach((point) => {
      const item = document.createElement("div");
      item.className = "point-item";
      item.textContent = point;
      points.appendChild(item);
    });

    tabs.querySelectorAll(".pill-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.id === activeId);
      button.setAttribute("aria-selected", String(button.dataset.id === activeId));
    });
  };

  surfaces.forEach((surface) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pill-button";
    button.dataset.id = surface.id;
    button.setAttribute("role", "tab");
    button.textContent = surface.title;
    button.addEventListener("click", () => {
      activeId = surface.id;
      update();
    });
    tabs.appendChild(button);
  });

  update();
}

function setStats() {
  Object.entries(stats).forEach(([key, value]) => {
    const node = document.querySelector(`[data-stat="${key}"]`);
    if (node) {
      node.textContent = value;
    }
  });

  const timestamp = document.getElementById("generated-at");
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  timestamp.textContent = `refreshed locally ${time}`;
}

function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

setupMenu();
setStats();
renderModules();
renderWorkflow();
renderSurfaces();
