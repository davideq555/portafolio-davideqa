import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  Palette,
  Check,
  Search,
  ExternalLink,
  Images,
  ChevronLeft,
  ChevronRight,
  FileCode,
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

const THEME_OPTIONS = [
  "dracula",
  "tokyo-night",
  "one-dark",
  "nord",
  "catppuccin-mocha",
  "ayu-mirage",
  "gruvbox-dark",
  "ayu-light",
  "solarized-light",
  "one-light",
] as const;
type Theme = (typeof THEME_OPTIONS)[number];
const DEFAULT_THEME: Theme = "ayu-mirage";
const THEME_STORAGE_KEY = "portfolio-theme";
type ThemeMode = "dark" | "light";
type ThemeMetadata = { label: string; mode: ThemeMode; vantaColor: number };
const THEME_CONFIG = {
  dracula: { label: "Dracula", mode: "dark", vantaColor: 0x67e8f9 },
  "tokyo-night": { label: "Tokyo Night", mode: "dark", vantaColor: 0x5eead4 },
  "one-dark": { label: "One Dark", mode: "dark", vantaColor: 0x7dd3fc },
  nord: { label: "Nord", mode: "dark", vantaColor: 0x93c5fd },
  "catppuccin-mocha": { label: "Catppuccin Mocha", mode: "dark", vantaColor: 0xc4b5fd },
  "ayu-mirage": { label: "Ayu Mirage", mode: "dark", vantaColor: 0xfcd34d },
  "gruvbox-dark": { label: "Gruvbox Dark", mode: "dark", vantaColor: 0xfacc15 },
  "ayu-light": { label: "Ayu Light", mode: "light", vantaColor: 0x263238 },
  "solarized-light": { label: "Solarized Light", mode: "light", vantaColor: 0x174a5b },
  "one-light": { label: "One Light", mode: "light", vantaColor: 0x1f3a5f },
} satisfies Record<Theme, ThemeMetadata>;

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  open: false,
  setOpen: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && THEME_OPTIONS.includes(stored as Theme)) setThemeState(stored as Theme);
    else if (stored) window.localStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME);
  }, []);

  useEffect(() => {
    document.documentElement.dataset["theme"] = theme;
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key.toLowerCase() === "t") {
        if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, open, setOpen }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemePicker() {
  const { theme, setTheme, open, setOpen } = useContext(ThemeContext);
  const { t } = useLang();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery("");
      const selectedIndex = THEME_OPTIONS.indexOf(theme);
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      searchRef.current?.focus();
    }
  }, [open, theme]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const filteredThemes = THEME_OPTIONS.filter((option) =>
    option.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const closePicker = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };
  const moveHighlight = (nextIndex: number) => {
    if (!filteredThemes.length) return;
    const wrappedIndex = (nextIndex + filteredThemes.length) % filteredThemes.length;
    setHighlightedIndex(wrappedIndex);
    optionRefs.current[wrappedIndex]?.focus();
  };
  const selectTheme = (option: Theme) => {
    setTheme(option);
    closePicker();
  };

  return (
    <div>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? t.theme.close : t.theme.open}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Palette size={14} aria-hidden="true" />
        <span>{t.theme.label}</span>
        <kbd className="hidden rounded border border-border px-1 text-[10px] text-muted-foreground sm:inline">
          T
        </kbd>
      </button>
      {open && (
        <div
          className="theme-picker-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px] sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePicker();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closePicker();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-picker-title"
            className="theme-picker-panel flex max-h-[min(42rem,calc(100dvh-2rem))] w-full max-w-lg flex-col rounded-xl border border-border bg-popover p-4 font-mono shadow-2xl shadow-black/30 sm:p-5"
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              const target = event.target as HTMLElement;
              const isTextField = target.matches(
                "input, textarea, select, [contenteditable='true']",
              );
              if (
                !isTextField &&
                event.key.length === 1 &&
                event.key !== " " &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.altKey
              ) {
                event.preventDefault();
                event.stopPropagation();
                searchRef.current?.focus();
                setQuery((value) => value + event.key);
                setHighlightedIndex(0);
              }
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary">
                  {t.theme.label}
                </p>
                <h2
                  id="theme-picker-title"
                  className="mt-1 font-display text-lg font-semibold text-foreground"
                >
                  {t.theme.dialogTitle}
                </h2>
              </div>
              <button
                type="button"
                aria-label={t.theme.close}
                onClick={closePicker}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <label className="mt-4 flex min-h-11 items-center gap-2 rounded border border-input bg-background/70 px-3 py-2 text-xs text-muted-foreground focus-within:border-primary">
              <Search size={14} aria-hidden="true" />
              <span className="sr-only">{t.theme.search}</span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    moveHighlight(0);
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    moveHighlight(filteredThemes.length - 1);
                  } else if (event.key === "Enter" && filteredThemes[highlightedIndex]) {
                    event.preventDefault();
                    selectTheme(filteredThemes[highlightedIndex]);
                  }
                }}
                placeholder={t.theme.search}
                className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
            <div
              className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1"
              role="listbox"
              aria-label={t.theme.dialogTitle}
            >
              {filteredThemes.map((option, index) => (
                <button
                  key={option}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={theme === option}
                  aria-pressed={theme === option}
                  data-highlighted={highlightedIndex === index ? "true" : undefined}
                  onFocus={() => setHighlightedIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      moveHighlight(index + 1);
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      moveHighlight(index - 1);
                    } else if (event.key === "Home") {
                      event.preventDefault();
                      moveHighlight(0);
                    } else if (event.key === "End") {
                      event.preventDefault();
                      moveHighlight(filteredThemes.length - 1);
                    } else if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectTheme(option);
                    }
                  }}
                  onClick={() => selectTheme(option)}
                  className="flex min-h-11 w-full items-center justify-between rounded px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground aria-pressed:bg-primary/10 aria-pressed:text-primary data-[highlighted=true]:bg-accent data-[highlighted=true]:text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <span className={`theme-swatch theme-swatch-${option}`} aria-hidden="true" />
                    <span>{THEME_CONFIG[option].label}</span>
                  </span>
                  {theme === option && <Check size={15} aria-hidden="true" />}
                </button>
              ))}
              {!filteredThemes.length && (
                <p className="px-2 py-3 text-xs text-muted-foreground">{t.theme.noResults}</p>
              )}
            </div>
            <p className="mt-3 border-t border-border px-2 pt-3 text-[10px] text-muted-foreground">
              {t.theme.documentation}
            </p>
          </div>
        </div>
      )}
    </div>
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
          Deqa<span className="text-primary">.</span>
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
        </div>
        <div className="flex items-center gap-2">
          <ThemePicker />
          <LangToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
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
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <VantaNetwork />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
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

function VantaNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  const themeConfig = THEME_CONFIG[theme];

  useEffect(() => {
    const element = containerRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!element || reduceMotion) return;

    let cancelled = false;
    let effect: VantaEffect | undefined;
    let frameId: number | undefined;

    void Promise.all([import("three"), import("vanta/dist/vanta.net.min")]).then(
      ([threeModule, vantaModule]) => {
        if (cancelled || !containerRef.current) return;
        frameId = window.requestAnimationFrame(() => {
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
            color: themeConfig.vantaColor,
            backgroundAlpha: 0,
            points: window.innerWidth < 640 ? 7 : 10,
            maxDistance: window.innerWidth < 640 ? 16 : 20,
            spacing: window.innerWidth < 640 ? 20 : 18,
            showDots: true,
          }) as VantaEffect;
        });
      },
    );

    return () => {
      cancelled = true;
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      effect?.destroy();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ opacity: themeConfig.mode === "light" ? 0.8 : 0.45 }}
      className="vanta-network pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent_8%,black_55%,black_100%)]"
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

type ProjectLinks = {
  repo?: string;
  live?: string;
  gallery?: readonly string[];
};

const viewFromHash = (): ProjectView =>
  window.location.hash === "#experiments" ? "experiments" : "projects";

function ProjectActions({
  links,
  onGallery,
  labels,
}: {
  links?: ProjectLinks;
  onGallery?: () => void;
  labels: {
    repository: string;
    live: string;
    gallery: string;
  };
}) {
  if (!links) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
      {links.repo && (
        <a
          href={links.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.repository}
          title={labels.repository}
          className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Github size={14} aria-hidden="true" />
          <span>{labels.repository}</span>
        </a>
      )}
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.live}
          title={labels.live}
          className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ExternalLink size={14} aria-hidden="true" />
          <span>{labels.live}</span>
        </a>
      )}
      {links.gallery && links.gallery.length > 0 && onGallery && (
        <button
          type="button"
          onClick={onGallery}
          aria-label={labels.gallery}
          title={labels.gallery}
          className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Images size={14} aria-hidden="true" />
          <span>{labels.gallery}</span>
        </button>
      )}
    </div>
  );
}

function GalleryModal({
  title,
  images,
  imageIndex,
  labels,
  onClose,
  onPrevious,
  onNext,
}: {
  title: string;
  images: readonly string[];
  imageIndex: number;
  labels: {
    closeGallery: string;
    previousImage: string;
    nextImage: string;
    imageCounter: string;
  };
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  const counter = labels.imageCounter
    .replace("{current}", String(imageIndex + 1))
    .replace("{total}", String(images.length));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-4">
        <div className="flex w-full items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="min-w-0 truncate font-display text-foreground">{title}</span>
          <span className="shrink-0 font-mono text-xs">{counter}</span>
        </div>
        <div className="relative flex min-h-0 w-full items-center justify-center">
          <img
            src={images[imageIndex]}
            alt={`${title} - ${counter}`}
            className="max-h-[calc(100vh-10rem)] w-auto max-w-full rounded-lg border border-border object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrevious}
                aria-label={labels.previousImage}
                title={labels.previousImage}
                className="absolute left-2 rounded-full border border-border bg-background/85 p-2 text-foreground transition-colors hover:border-primary hover:text-primary sm:left-4"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label={labels.nextImage}
                title={labels.nextImage}
                className="absolute right-2 rounded-full border border-border bg-background/85 p-2 text-foreground transition-colors hover:border-primary hover:text-primary sm:right-4"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.closeGallery}
          title={labels.closeGallery}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <X size={16} aria-hidden="true" />
          <span>{labels.closeGallery}</span>
        </button>
      </div>
    </div>
  );
}

function ProjectsAndExperiments() {
  const { t } = useLang();
  const [view, setView] = useState<ProjectView>("projects");
  const [gallery, setGallery] = useState<{
    title: string;
    images: readonly string[];
    imageIndex: number;
  } | null>(null);

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

  const closeGallery = () => setGallery(null);
  const previousImage = () =>
    setGallery((current) =>
      current
        ? {
            ...current,
            imageIndex: (current.imageIndex - 1 + current.images.length) % current.images.length,
          }
        : null,
    );
  const nextImage = () =>
    setGallery((current) =>
      current ? { ...current, imageIndex: (current.imageIndex + 1) % current.images.length } : null,
    );
  const openGallery = (title: string, links?: ProjectLinks) => {
    if (links?.gallery) setGallery({ title, images: links.gallery, imageIndex: 0 });
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
                    <ProjectActions
                      links={p.links}
                      labels={t.projects.actions}
                      onGallery={() => openGallery(p.title, p.links)}
                    />
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
                    <div className="card-hover flex h-full flex-col rounded-xl border border-border bg-card/40 p-6">
                      <Icon size={22} className="text-primary" />
                      <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                        {e.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {e.desc}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {e.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <ProjectActions
                        links={e.links}
                        labels={t.projects.actions}
                        onGallery={() => openGallery(e.title, e.links)}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {gallery && (
        <GalleryModal
          title={gallery.title}
          images={gallery.images}
          imageIndex={gallery.imageIndex}
          labels={t.projects.actions}
          onClose={closeGallery}
          onPrevious={previousImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}

const EXPERIMENT_ICONS = [Eye, CircuitBoard, Cpu];

/* ---------------- Tech Stack ---------------- */
const STACK = [
  {
    icon: FileCode,
    title: "Languages",
    items: ["Python", "Javascript", "PHP", "Genexus"],
  },
  {
    icon: Boxes,
    title: "Frameworks",
    items: ["FastAPI", "Django", "Laravel"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "SQL Server", "Redis"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    items: ["AI Agents", "RAG", "LLMs", "Jev", "Computer Vision"],
  },
  {
    icon: Server,
    title: "Infrastructure",
    items: ["Linux", "Windows Server", "Docker", "VPS", "AWS", "GCP"],
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
                href="mailto:davideq555@gmail.com"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                <Mail size={16} /> Email
              </a>
              <a
                href="https://github.com/davideq555"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:w-auto"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/davideqa/"
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
      <ThemeProvider>
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
      </ThemeProvider>
    </LangProvider>
  );
}
