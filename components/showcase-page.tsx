"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  architectureModules,
  heroHighlights,
  showcaseMetrics,
  stackGroups,
  surfaceViews,
  teamMembers,
  workflowSteps
} from "@/lib/project-data";

type ShowcaseApiResponse = {
  generatedAt: string;
  metrics: typeof showcaseMetrics;
  moduleCount: number;
  workflowCount: number;
  surfaceCount: number;
};

const navItems = [
  { href: "#system", label: "System" },
  { href: "#workflow", label: "Workflow" },
  { href: "#surfaces", label: "Interfaces" },
  { href: "#delivery", label: "Delivery" },
  { href: "#team", label: "Team" }
];

function formatMetricValue(value: number, suffix = "") {
  return `${value}${suffix}`;
}

function AnimatedValue({
  value,
  suffix = ""
}: {
  value: number;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return <span>{formatMetricValue(displayValue, suffix)}</span>;
}

function MetricCard({
  label,
  value,
  tone
}: {
  label: string;
  value: ReactNode;
  tone: "mint" | "gold" | "cyan";
}) {
  const toneClasses = {
    mint: "from-mintGlow/18 to-transparent",
    gold: "from-goldGlow/18 to-transparent",
    cyan: "from-cyanGlow/18 to-transparent"
  };

  return (
    <div className={`rounded-3xl border border-white/10 bg-gradient-to-br ${toneClasses[tone]} p-5`}>
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.26em] text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">{value}</p>
    </div>
  );
}

function StatusTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export function ShowcasePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(architectureModules[0].id);
  const [activeSurface, setActiveSurface] = useState(surfaceViews[0].id);
  const [liveData, setLiveData] = useState<ShowcaseApiResponse | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadShowcase = async () => {
      try {
        const response = await fetch("/api/showcase");
        if (!response.ok) {
          throw new Error("Unable to load showcase metrics");
        }

        const payload = (await response.json()) as ShowcaseApiResponse;
        if (!ignore) {
          setLiveData(payload);
        }
      } catch {
        if (!ignore) {
          setLiveData({
            generatedAt: new Date().toISOString(),
            metrics: showcaseMetrics,
            moduleCount: architectureModules.length,
            workflowCount: workflowSteps.length,
            surfaceCount: surfaceViews.length
          });
        }
      }
    };

    loadShowcase();
    return () => {
      ignore = true;
    };
  }, []);

  const selectedModule = useMemo(
    () => architectureModules.find((module) => module.id === activeModule) ?? architectureModules[0],
    [activeModule]
  );

  const selectedSurface = useMemo(
    () => surfaceViews.find((surface) => surface.id === activeSurface) ?? surfaceViews[0],
    [activeSurface]
  );

  const metrics = liveData?.metrics ?? showcaseMetrics;

  return (
    <main className="pb-16">
      <header className="shell pt-6">
        <div className="glass-panel sticky top-4 z-40 flex items-center justify-between px-4 py-3 sm:px-6">
          <Link href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-mintGlow via-cyanGlow to-sky-400 text-sm font-bold text-slate-950">
              CS
            </div>
            <div>
              <p className="text-lg font-semibold text-white">CodeSweep</p>
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.3em] text-slate-400">
                Next.js Showcase
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 md:hidden"
            aria-expanded={menuOpen}
          >
            Menu
          </button>

          <nav
            className={`${menuOpen ? "flex" : "hidden"} absolute left-4 right-4 top-[calc(100%+0.75rem)] rounded-3xl border border-white/10 bg-slateSoft/95 p-4 shadow-panel md:static md:flex md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#delivery"
                className="rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-slate-950"
                onClick={() => setMenuOpen(false)}
              >
                Deployment Notes
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <section id="top" className="shell pt-10 sm:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="micro-label mb-4">Industry-style project website</p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              A polished product story for your distributed lab governance platform.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              This Next.js website reframes CodeSweep as a production-grade system:
              centralized scan orchestration, quarantine-first deletion, verification
              workflows, agent visibility, and auditable cleanup across computer labs.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#system"
                className="rounded-full bg-gradient-to-r from-mintGlow to-cyanGlow px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Explore the System
              </Link>
              <Link
                href="#surfaces"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
              >
                View Product Surfaces
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <MetricCard
                label="Built-in languages"
                value={<AnimatedValue value={metrics.supportedLanguages} suffix="+" />}
                tone="mint"
              />
              <MetricCard
                label="Mapped seats per lab"
                value={<AnimatedValue value={metrics.labSeatsPerLayout} />}
                tone="gold"
              />
              <MetricCard
                label="Primary platform endpoints"
                value={<AnimatedValue value={metrics.platformEndpoints} />}
                tone="cyan"
              />
            </div>
          </div>

          <div className="glass-panel overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.3em] text-mintGlow/80">
                  Live showcase snapshot
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Operational summary</h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                dynamic data
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {heroHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">{highlight.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{highlight.description}</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-slate-300">
                      {highlight.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <StatusTile label="Modules" value={liveData?.moduleCount ?? architectureModules.length} />
              <StatusTile label="Workflow steps" value={liveData?.workflowCount ?? workflowSteps.length} />
              <StatusTile label="Surface views" value={liveData?.surfaceCount ?? surfaceViews.length} />
            </div>

            <p className="mt-5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-slate-500">
              {liveData ? `refreshed ${new Date(liveData.generatedAt).toLocaleTimeString()}` : "loading snapshot"}
            </p>
          </div>
        </div>
      </section>

      <section id="system" className="shell pt-24">
        <p className="micro-label">System narrative</p>
        <h2 className="section-title mt-4">
          The project needed a stronger website than a static course-style landing page.
        </h2>
        <p className="section-copy mt-6">
          The new website presents CodeSweep the way industry-facing product sites do:
          clear positioning, modular architecture, product surfaces, operational flow,
          deployment framing, and concise proof of what is already implemented in the
          repo.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {architectureModules.map((module) => {
              const isActive = module.id === activeModule;
              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full rounded-3xl border p-5 text-left transition ${
                    isActive
                      ? "border-mintGlow/40 bg-mintGlow/10"
                      : "border-white/10 bg-white/5 hover:bg-white/[0.08]"
                  }`}
                >
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-slate-400">
                    {module.tag}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{module.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{module.summary}</p>
                </button>
              );
            })}
          </div>

          <div className="glass-panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.3em] text-cyanGlow/80">
                  Architecture focus
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">{selectedModule.title}</h3>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-slate-300">
                {selectedModule.tag}
              </span>
            </div>

            <p className="mt-5 text-base leading-7 text-slate-300">{selectedModule.detail}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selectedModule.points.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="shell pt-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="micro-label">Operational workflow</p>
            <h2 className="section-title mt-4">Verification-first is the product's core trust model.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            The website now communicates the actual flow implemented in the repo rather than
            vague claims. Task creation, dispatch, quarantine, review, and deletion feedback
            are represented as distinct operational steps.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="glass-panel p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 font-[family-name:var(--font-mono)] text-sm text-white">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="surfaces" className="shell pt-24">
        <p className="micro-label">Product surfaces</p>
        <h2 className="section-title mt-4">The new site showcases the real UI layers in your platform.</h2>

        <div className="mt-10 flex flex-wrap gap-3">
          {surfaceViews.map((surface) => {
            const isActive = surface.id === activeSurface;
            return (
              <button
                key={surface.id}
                type="button"
                onClick={() => setActiveSurface(surface.id)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "border border-white/10 bg-white/5 text-slate-200"
                }`}
              >
                {surface.title}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-panel p-6">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.3em] text-goldGlow/80">
              {selectedSurface.title}
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-white">{selectedSurface.headline}</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">{selectedSurface.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selectedSurface.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-slate-400">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{metric.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-white">{selectedSurface.mockTitle}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
                    interface simulation
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-roseGlow" />
                  <span className="h-3 w-3 rounded-full bg-goldGlow" />
                  <span className="h-3 w-3 rounded-full bg-mintGlow" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {selectedSurface.mockRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{row.label}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{row.caption}</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-slate-300">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="shell pt-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass-panel p-6">
            <p className="micro-label">Delivery stack</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
              Built for modern Vercel-style deployment.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              The static files are replaced with a proper Next.js app router project using
              Tailwind CSS, typed project data, and a small API route that drives the live
              metrics displayed in the interface.
            </p>

            <div className="mt-8 space-y-5">
              {stackGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <p className="micro-label">What changed</p>
            <div className="mt-5 space-y-4">
              {[
                "Replaced the plain HTML site with a Next.js app router structure.",
                "Moved design language to Tailwind CSS with reusable panel and typography tokens.",
                "Added client-side interactivity for architecture and interface exploration.",
                "Added a Next.js API route so the hero metrics load dynamically inside the site.",
                "Updated website-local tooling files only, keeping the rest of the repo untouched."
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="shell pt-24">
        <p className="micro-label">Contributors</p>
        <h2 className="section-title mt-4">Team roles are presented as product-delivery functions.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {teamMembers.map((member) => (
            <div key={member.name} className="glass-panel p-5">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-slate-400">
                {member.role}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">{member.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{member.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="shell pt-24">
        <div className="glass-panel flex flex-col gap-8 px-6 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-2xl font-semibold text-white">CodeSweep</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Distributed file-governance for shared labs, now presented with a modern
              Next.js showcase website inside the existing `website` directory.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
