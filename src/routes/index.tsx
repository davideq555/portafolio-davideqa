import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Server,
  Cpu,
  Database,
  Bot,
  Boxes,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Terminal,
  Cloud,
  GitBranch,
  Eye,
  CircuitBoard,
  Menu,
  X,
  Languages,
} from "lucide-react";
import { LangProvider, useLang } from "@/lib/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "David Aramayo — Backend & AI Automation Engineer" },
      {
        name: "description",
        content:
          "Backend & AI Automation Engineer. I build software that connects APIs, data, AI and infrastructure.",
      },
      { property: "og:title", content: "David Aramayo — Backend & AI Automation Engineer" },
      {
        property: "og:description",
        content:
          "Backend, AI automation and infrastructure. I build software that connects APIs, data, AI and infrastructure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------------- Reveal on scroll ---------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("is-visible"), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ---------------- Language toggle ---------------- */
function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      aria-label="Change language"
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <Languages size={14} />
      <span className={lang === "en" ? "text-primary" : ""}>EN</span>
      <span className="text-border">/</span>
      <span className={lang === "es" ? "text-primary" : ""}>ES</span>
    </button>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#projects", label: t.nav.projects },
    { href: "#stack", label: t.nav.stack },
    { href: "#contact", label: t.nav.contact },
  ];
  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-colors ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-foreground"
        >
          David<span className="text-primary">.</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <LangToggle />
          <a
            href="#contact"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t.nav.cta}
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <VantaNetwork />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t.hero.pill}
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          David Aramayo
        </h1>
        <p className="mt-3 font-display text-xl font-medium text-primary sm:text-2xl lg:text-3xl">
          {t.hero.role}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.hero.sub}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {t.hero.projects} <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t.hero.contact}
          </a>
        </div>
      </div>
    </section>
  );
}

type VantaEffect = { destroy: () => void };

function colorTokenToNumber(token: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  if (!context) return 0;
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const data = context.getImageData(0, 0, 1, 1).data;
  const red = data[0] ?? 0;
  const green = data[1] ?? 0;
  const blue = data[2] ?? 0;
  return (red << 16) | (green << 8) | blue;
}

function VantaNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!element || reduceMotion) return;

    let cancelled = false;
    let effect: VantaEffect | undefined;

    void Promise.all([import("three"), import("vanta/dist/vanta.net.min")]).then(
      ([threeModule, vantaModule]) => {
        if (cancelled || !containerRef.current) return;
        const importedNetwork = vantaModule.default;
        const createNetwork =
          typeof importedNetwork === "function" ? importedNetwork : importedNetwork.default;
        effect = createNetwork({
          el: containerRef.current,
          THREE: threeModule,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: colorTokenToNumber("--primary"),
          backgroundAlpha: 0,
          points: window.innerWidth < 640 ? 7 : 10,
          maxDistance: window.innerWidth < 640 ? 16 : 20,
          spacing: window.innerWidth < 640 ? 20 : 18,
          showDots: true,
        }) as VantaEffect;
      },
    );

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-35 [mask-image:linear-gradient(to_right,transparent_8%,black_55%,black_100%)] sm:opacity-50"
    />
  );
}

/* ---------------- Section heading ---------------- */
function SectionTitle({ index, title, desc }: { index: string; title: string; desc?: string }) {
  return (
    <Reveal>
      <div className="mb-12 sm:mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{index}</p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {desc && (
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{desc}</p>
        )}
      </div>
    </Reveal>
  );
}

/* ---------------- Terminal (simulated) ---------------- */
type Line =
  | { kind: "os"; text: string }
  | { kind: "prompt"; user: string; host: string; path: string; cmd?: string }
  | { kind: "status"; head: string }
  | { kind: "row"; icon: string; cat: string; name: string; state: string }
  | { kind: "table-head"; cols: string[] }
  | { kind: "table-row"; cols: string[] }
  | { kind: "blank" };

const TERMINAL_LINES: Line[] = [
  {
    kind: "prompt",
    user: "david",
    host: "infra",
    path: "~/portfolio",
    cmd: "docker compose up -d",
  },
  { kind: "status", head: "[+] Running 3/3" },
  { kind: "row", icon: "⠿", cat: "Network", name: "portfolio_default", state: "Created" },
  { kind: "row", icon: "⠿", cat: "Container", name: "portfolio_db_1", state: "Healthy" },
  { kind: "row", icon: "⠿", cat: "Container", name: "portfolio_api_1", state: "Started" },
  { kind: "blank" },
  { kind: "prompt", user: "david", host: "infra", path: "~/portfolio", cmd: "docker compose ps" },
  { kind: "table-head", cols: ["NAME", "STATUS", "PORTS"] },
  { kind: "table-row", cols: ["portfolio_api_1", "Up (healthy)", "0.0.0.0:8000->8000/tcp"] },
  { kind: "table-row", cols: ["portfolio_db_1", "Up", "5432/tcp"] },
];

function TerminalLine({ line }: { line: Line }) {
  if (line.kind === "os") return <div className="text-muted-foreground/70">{line.text}</div>;

  if (line.kind === "blank") return <div className="h-3" />;

  if (line.kind === "prompt")
    return (
      <div className="flex flex-wrap items-center gap-x-1">
        <span className="text-primary">
          {line.user}@{line.host}
        </span>
        <span className="text-muted-foreground">:</span>
        <span className="text-accent-foreground/80">{line.path}</span>
        <span className="text-primary">$</span>
        {line.cmd && <span className="ml-1 text-foreground">{line.cmd}</span>}
      </div>
    );

  if (line.kind === "status") return <div className="text-primary">{line.head}</div>;

  if (line.kind === "row")
    return (
      <div className="flex gap-2 pl-1 font-mono text-[13px]">
        <span className="text-muted-foreground/70">{line.icon}</span>
        <span className="w-24 shrink-0 text-foreground/90">{line.cat}</span>
        <span className="flex-1 text-muted-foreground">{line.name}</span>
        <span className="text-foreground/80">{line.state}</span>
      </div>
    );

  if (line.kind === "table-head")
    return (
      <div className="flex gap-4 border-b border-border/70 pb-1 pl-1 font-mono text-[13px] text-muted-foreground/80">
        <span className="w-32 shrink-0 sm:w-36">{line.cols[0]}</span>
        <span className="w-24 shrink-0 sm:w-28">{line.cols[1]}</span>
        <span className="shrink-0 whitespace-nowrap">{line.cols[2]}</span>
      </div>
    );

  // table-row
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-0.5 pl-1 font-mono text-[13px]">
      <span className="w-32 shrink-0 text-foreground/90 sm:w-36">{line.cols[0]}</span>
      <span className="w-24 shrink-0 text-primary sm:w-28">{line.cols[1]}</span>
      <span className="shrink-0 whitespace-nowrap text-muted-foreground">{line.cols[2]}</span>
    </div>
  );
}

function SimTerminal() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (count >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 420);
    return () => clearTimeout(t);
  }, [mounted, count]);

  const done = mounted && count >= TERMINAL_LINES.length;

  return (
    <div
      id="about-terminal"
      className="overflow-hidden rounded-xl border border-border bg-card/60 shadow-lg shadow-black/20"
    >
      {/* window header */}
      <div className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-primary/50" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          david@infra — docker compose
        </span>
      </div>
      {/* body */}
      <div className="bg-background/50 p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-[13px]">
        <div className="text-muted-foreground/70">Debian GNU/Linux 12 — tty1</div>
        <div className="mt-1 space-y-1.5">
          {mounted &&
            TERMINAL_LINES.slice(0, count).map((line, i) => <TerminalLine key={i} line={line} />)}
          {done && (
            <div className="flex items-center gap-1 pt-1">
              <span className="text-primary">david@infra</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-accent-foreground/80">~/portfolio</span>
              <span className="text-primary">$</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */
function About() {
  const { t } = useLang();
  return (
    <section id="about" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionTitle index="01" title={t.about.title} />
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal className="flex h-full flex-col">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.about.p1}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.about.p2}
            </p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-8">
              {t.about.badges.map((b) => (
                <li
                  key={b}
                  className="rounded-md border border-border bg-card/50 px-3 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <SimTerminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- What I Build ---------------- */
const AREA_ICONS = [Server, Bot, Cloud];

function WhatIBuild() {
  const { t } = useLang();
  return (
    <section id="work" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionTitle index="02" title={t.work.title} desc={t.work.desc} />
        <div className="grid gap-5 md:grid-cols-3">
          {t.work.areas.map((a, i) => {
            const Icon = AREA_ICONS[i]!;
            return (
              <Reveal key={a.title} delay={i * 100}>
                <div className="card-hover h-full rounded-xl border border-border bg-card/50 p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {a.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects & Experiments ---------------- */

type ProjectView = "projects" | "experiments";

const viewFromHash = (): ProjectView =>
  window.location.hash === "#experiments" ? "experiments" : "projects";

function ProjectsAndExperiments() {
  const { t } = useLang();
  const [view, setView] = useState<ProjectView>("projects");

  useEffect(() => {
    const syncHash = () => setView(viewFromHash());
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  const selectView = (value: string) => {
    const next = value as ProjectView;
    setView(next);
    if (window.location.hash !== `#${next}`) {
      window.history.pushState(null, "", `#${next}`);
    }
  };

  return (
    <section id="projects" className="scroll-mt-16 border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div id="experiments" className="scroll-mt-16" />
        <SectionTitle index="03" title={t.projects.sectionTitle} desc={t.projects.sectionDesc} />
        <Tabs value={view} onValueChange={selectView} className="w-full">
          <TabsList className="mb-8 grid h-auto w-full grid-cols-2 gap-1 border border-border bg-card/60 p-1 sm:mb-10 sm:inline-flex sm:w-auto">
            <TabsTrigger
              value="projects"
              className="min-w-0 whitespace-normal px-2 py-3 text-center leading-snug data-[state=active]:bg-primary/15 data-[state=active]:text-primary sm:px-5"
            >
              {t.projects.title}
            </TabsTrigger>
            <TabsTrigger
              value="experiments"
              className="min-w-0 whitespace-normal px-2 py-3 text-center leading-snug data-[state=active]:bg-primary/15 data-[state=active]:text-primary sm:px-5"
            >
              {t.experiments.title}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-0">
            <p className="mb-6 text-sm text-muted-foreground sm:text-base">{t.projects.desc}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.projects.items.map((p, i) => (
                <Reveal key={p.title} delay={(i % 2) * 100}>
                  <div className="card-hover flex h-full flex-col rounded-xl border border-border bg-card/50 p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                        {p.tag}
                      </span>
                      <Terminal size={16} className="text-muted-foreground" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="experiments" className="mt-0">
            <p className="mb-6 text-sm text-muted-foreground sm:text-base">{t.experiments.desc}</p>
            <div className="grid gap-5 md:grid-cols-3">
              {t.experiments.items.map((e, i) => {
                const Icon = EXPERIMENT_ICONS[i]!;
                return (
                  <Reveal key={e.title} delay={i * 100}>
                    <div className="card-hover h-full rounded-xl border border-border bg-card/40 p-6">
                      <Icon size={22} className="text-primary" />
                      <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                        {e.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {e.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

const EXPERIMENT_ICONS = [Eye, CircuitBoard, Cpu];

/* ---------------- Tech Stack ---------------- */
const STACK = [
  {
    icon: Server,
    title: "Backend",
    items: ["Python", "FastAPI", "Django", "REST APIs", "GraphQL"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "SQL Server", "Redis"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    items: ["AI Agents", "RAG", "LLMs", "LangChain", "Computer Vision"],
  },
  {
    icon: Boxes,
    title: "Infrastructure",
    items: ["Linux", "Docker", "VPS", "Dokploy", "Nginx"],
  },
  {
    icon: GitBranch,
    title: "DevOps",
    items: ["GitHub Actions", "CI/CD", "Dokploy"],
  },
];

function TechStack() {
  const { t } = useLang();
  return (
    <section id="stack" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionTitle index="04" title={t.stack.title} desc={t.stack.desc} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100}>
              <div className="card-hover h-full rounded-xl border border-border bg-card/50 p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <s.icon size={18} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {s.title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionTitle index="05" title={t.contact.title} />
        <Reveal>
          <div className="rounded-2xl border border-border bg-card/50 p-8 text-center sm:p-12">
            <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {t.contact.heading}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              {t.contact.sub}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="mailto:david@example.com"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                <Mail size={16} /> Email
              </a>
              <a
                href="https://github.com/davidaramayo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:w-auto"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/davidaramayo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:w-auto"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="font-mono text-xs text-muted-foreground">
          David Aramayo — Backend & AI Automation Engineer
        </p>
        <p className="font-mono text-xs text-muted-foreground">{t.footer.tagline}</p>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function Portfolio() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <About />
          <WhatIBuild />
          <ProjectsAndExperiments />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
