const modules = [
  {
    id: "frontend",
    tag: "frontend",
    title: "Admin dashboard and verification UI",
    summary:
      "Task creation, lab-seat visibility, pending file review, and audit-oriented human approval."
  },
  {
    id: "backend",
    tag: "backend",
    title: "TCP master and orchestration",
    summary:
      "Dispatches scan instructions, tracks heartbeats, collects results, and queues delete commands when required."
  },
  {
    id: "agent",
    tag: "client-agent",
    title: "Distributed scanning agents",
    summary:
      "Scan directories, identify code files, quarantine candidates, and delete only after an approved action."
  },
  {
    id: "shared",
    tag: "shared",
    title: "Persistence and shared schemas",
    summary:
      "Stores pending files, deletion records, and runtime state across services."
  }
];

const surfaces = [
  {
    id: "dashboard",
    title: "Dashboard",
    headline: "A control surface built for administrators, not just a demo form.",
    points: [
      "Seat-map style lab monitoring",
      "Scan path, language, and date filters",
      "Agent and pending-file visibility"
    ]
  },
  {
    id: "verification",
    title: "Verification",
    headline: "A review layer that keeps destructive actions explicitly human-gated.",
    points: [
      "Bulk approve and reject actions",
      "Searchable pending file queue",
      "Audit log visibility"
    ]
  },
  {
    id: "delivery",
    title: "Orchestration",
    headline: "A platform story for dispatch, fallback queuing, and deletion confirmation.",
    points: [
      "Heartbeat-aware online status",
      "Live dispatch and queued fallback",
      "Deletion reporting"
    ]
  }
];

const workflow = [
  "Create a scan task with target languages and an absolute path.",
  "Dispatch the instruction to active agents.",
  "Scan, classify, and quarantine candidate files.",
  "Review the verification queue in the admin UI.",
  "Approve, reject, or queue deletion with audit visibility."
];

const stats = {
  supportedLanguages: "14+",
  mappedSeats: "100",
  coreModules: "4",
  verifiedWorkflow: "5"
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
