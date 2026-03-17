export const showcaseMetrics = {
  supportedLanguages: 14,
  labSeatsPerLayout: 100,
  platformEndpoints: 8
};

export const heroHighlights = [
  {
    title: "Agent visibility mapped to lab seating",
    description:
      "The admin dashboard already models lab layouts with explicit IP mapping, seat counts, and online or offline status monitoring.",
    metric: "100-seat view"
  },
  {
    title: "Quarantine before deletion",
    description:
      "Files are not removed immediately after detection. They enter a review queue so the verification UI can approve or reject actions safely.",
    metric: "human-gated"
  },
  {
    title: "Cross-process dispatch fallback",
    description:
      "Approved deletions can be sent live to connected agents or queued until the next heartbeat if an agent is temporarily unavailable.",
    metric: "queued + live"
  }
];

export const architectureModules = [
  {
    id: "frontend",
    tag: "frontend",
    title: "Admin dashboard and verification layer",
    summary:
      "Flask pages submit tasks, preview pending files, review audit logs, and visualize machine status.",
    detail:
      "The showcase site now calls out the actual strengths of the frontend: task creation with target languages and date filters, pending file review, lab-aware monitoring, and administrative approval flows.",
    points: [
      "Task submission with language targeting and path validation.",
      "Verification queue with bulk approve and reject actions.",
      "Audit log review to trace dispatch, rejection, and deletion outcomes.",
      "Lab layouts represented as mapped PCs rather than generic status cards."
    ]
  },
  {
    id: "backend",
    tag: "backend",
    title: "TCP master, orchestration, and task dispatch",
    summary:
      "The backend coordinates active agents, status updates, command dispatch, and result collection.",
    detail:
      "This site now describes the backend as an orchestration service instead of a generic script. The master listener, connection handlers, dispatcher, and result collector are communicated as a coordinated control plane.",
    points: [
      "Embedded master server support alongside the admin UI runtime.",
      "Agent heartbeat freshness used to infer online and offline state.",
      "Task dispatch to currently active agents with failure tracking.",
      "Delete-command queuing when immediate delivery is not possible."
    ]
  },
  {
    id: "agent",
    tag: "client-agent",
    title: "Endpoint scanning, detection, and quarantine",
    summary:
      "Distributed agents scan target paths, identify code files, quarantine matches, and process approved actions.",
    detail:
      "The user-facing website now frames the agent as a lightweight endpoint runtime that performs controlled file operations, not just a background script. This better matches how industry platforms present managed-node behavior.",
    points: [
      "Pattern-based and signature-based code detection across supported languages.",
      "Quarantine workflow before final deletion to reduce accidental loss.",
      "Structured reporting back to the master server.",
      "Deletion confirmation sent after approved file operations."
    ]
  },
  {
    id: "shared",
    tag: "shared",
    title: "Persistence and common schemas",
    summary:
      "Shared modules hold database helpers, constants, and common structures used across services.",
    detail:
      "This layer matters because it gives the system a durable record of pending files, agent status, and deletion reports. The new website treats this as a real platform capability rather than leaving it implicit.",
    points: [
      "SQLite fallback for local development and PostgreSQL-ready structure.",
      "Pending-file persistence for verification handoff.",
      "Deletion report storage to complete the audit trail.",
      "Reusable constants and schemas across backend and UI layers."
    ]
  }
];

export const workflowSteps = [
  {
    title: "Create scan task",
    description:
      "Administrators select target languages, choose a scan path, and optionally constrain the scan with modified-date filters."
  },
  {
    title: "Dispatch to active agents",
    description:
      "The master service pushes the instruction set to reachable agents and updates runtime status while tracking failed deliveries."
  },
  {
    title: "Detect and quarantine",
    description:
      "Agents classify files using language heuristics and move candidate files into quarantine before any destructive action is allowed."
  },
  {
    title: "Review verification queue",
    description:
      "The UI exposes file path, agent IP, language, confidence, timestamps, and detection reason so human reviewers can decide."
  },
  {
    title: "Approve, queue, or reject",
    description:
      "Approved deletions are sent or queued, rejected files are cleared safely, and all meaningful actions are kept auditable."
  }
];

export const surfaceViews = [
  {
    id: "dashboard",
    title: "Dashboard",
    headline: "A lab-aware control surface instead of a plain admin form",
    description:
      "The dashboard is presented as a monitoring and dispatch layer with seat maps, active-agent counts, pending-file totals, target language management, and task previews.",
    metrics: [
      {
        label: "Status view",
        value: "Online / Offline",
        note: "Agent presence is derived from runtime freshness rather than static registration."
      },
      {
        label: "Task authoring",
        value: "Path + language + date",
        note: "Task creation reflects the actual fields exposed in the Flask application."
      }
    ],
    mockTitle: "Admin Dashboard Surface",
    mockRows: [
      {
        label: "CSL 1 & 2",
        caption: "Seat map rendered from configured IP layout",
        value: "100 PCs"
      },
      {
        label: "Pending verification queue",
        caption: "Waiting review before deletion dispatch",
        value: "12 files"
      },
      {
        label: "Supported scan profiles",
        caption: "Built-in and custom language targeting",
        value: "14+"
      }
    ]
  },
  {
    id: "verification",
    title: "Verification",
    headline: "A decision interface for controlled destructive actions",
    description:
      "The verification page is positioned as the trust layer of the platform, where administrators review pending items, bulk-approve or reject them, and inspect recent audit activity.",
    metrics: [
      {
        label: "Review mode",
        value: "Bulk actions",
        note: "The page supports multi-select approval and rejection workflows."
      },
      {
        label: "Audit coverage",
        value: "End-to-end",
        note: "Deletion dispatch, queueing, rejection, and confirmation are all surfaced."
      }
    ],
    mockTitle: "Verification Surface",
    mockRows: [
      {
        label: "Queue search",
        caption: "Search by filename or full path",
        value: "filterable"
      },
      {
        label: "Decision controls",
        caption: "Approve or reject selected records",
        value: "bulk"
      },
      {
        label: "Recent logs",
        caption: "Operational evidence trail in the same UI",
        value: "auditable"
      }
    ]
  },
  {
    id: "orchestration",
    title: "Orchestration",
    headline: "Back-end behavior explained like a platform control plane",
    description:
      "This surface translates the backend into product language: dispatching instructions, tracking stale agents, collecting reports, and falling back to queued commands when needed.",
    metrics: [
      {
        label: "Transport",
        value: "TCP protocol",
        note: "Agents and master communicate over the project's custom socket-based workflow."
      },
      {
        label: "Fallback mode",
        value: "Queued delivery",
        note: "Approved actions can be persisted for later dispatch on heartbeat."
      }
    ],
    mockTitle: "Orchestration Surface",
    mockRows: [
      {
        label: "Instruction dispatch",
        caption: "Send tasks to all currently active agents",
        value: "fan-out"
      },
      {
        label: "Connection health",
        caption: "Normalize stale systems as offline",
        value: "heartbeat"
      },
      {
        label: "Deletion delivery",
        caption: "Live dispatch or persisted command queue",
        value: "resilient"
      }
    ]
  }
];

export const stackGroups = [
  {
    title: "Website stack",
    items: ["Next.js", "App Router", "Tailwind CSS", "TypeScript"]
  },
  {
    title: "Project runtime",
    items: ["Python", "Flask", "TCP sockets", "SQLAlchemy"]
  },
  {
    title: "Operational tooling",
    items: ["Docker", "Docker Compose", "SQLite", "PostgreSQL-ready"]
  }
];

export const teamMembers = [
  {
    name: "J. Varsha",
    role: "System lead",
    summary:
      "Led system design and implemented core backend, orchestration, and database integration work."
  },
  {
    name: "K.A.T. Saranga",
    role: "UI implementation",
    summary:
      "Designed and implemented the administrative web interface and contributed to regex validation."
  },
  {
    name: "K.G.H.M. Wijesekara",
    role: "Frontend integration",
    summary:
      "Built frontend features focused on usability, interface behavior, and backend integration."
  },
  {
    name: "S. Kujinsika",
    role: "Testing and validation",
    summary:
      "Handled manual integration and system validation for communication and file operation workflows."
  },
  {
    name: "P. Mathuja",
    role: "Master server and deployment",
    summary:
      "Implemented master-server logic, task distribution, and Docker-based deployment support."
  }
];
