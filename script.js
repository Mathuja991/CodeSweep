const modules = [
  {
    id: "frontend",
    tag: "frontend",
    title: "Admin dashboard and verification UI",
    summary:
      "Submits scan tasks, tracks mapped lab seats, reviews pending files, and records approval actions."
  },
  {
    id: "backend",
    tag: "backend",
    title: "TCP master and orchestration",
    summary:
      "Dispatches scan instructions, tracks heartbeat status, stores results, and issues or queues delete commands."
  },
  {
    id: "agent",
    tag: "client-agent",
    title: "Distributed scanning agents",
    summary:
      "Scan configured directories, detect language signatures, quarantine candidate files, and report outcomes."
  },
  {
    id: "shared",
    tag: "shared",
    title: "Persistence and shared schemas",
    summary:
      "Maintains agent states, pending verification queue, queued commands, and deletion reports."
  }
];

const surfaces = [
  {
    id: "dashboard",
    title: "Dashboard",
    headline: "Dispatch scan tasks with target languages, absolute path, and optional date filters.",
    points: [
      "Task ID preview and scan submission",
      "Mapped lab layout with online/offline visibility",
      "Pending file count and quick status panels"
    ]
  },
  {
    id: "verification",
    title: "Verification",
    headline: "Review pending files and keep deletion explicitly human-approved.",
    points: [
      "Search and filter pending records",
      "Bulk approve and reject operations",
      "Audit log table with action timeline"
    ]
  },
  {
    id: "api",
    title: "Backend API",
    headline: "Flask endpoints support task dispatch, previews, approvals, and reporting.",
    points: [
      "/submit-instruction, /clients-status, /files-preview",
      "/approve-deletion, /reject-deletion, /audit-logs",
      "Queue fallback when agents are temporarily unavailable"
    ]
  }
];

const workflow = [
  "Admin selects target language(s), scan path, and optional date range.",
  "Frontend creates a scan_task payload and dispatches to active agents.",
  "Agent scans files and detects code type using pattern rules.",
  "Matching files are quarantined before any delete action.",
  "Pending records are stored for verification review.",
  "Admin approves or rejects selected records in the verification page.",
  "Approved deletions are dispatched live or queued for next heartbeat.",
  "Agents report deletion outcomes and audit history is updated."
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
