import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "es";

const dict = {
  en: {
    nav: {
      about: "About",
      work: "What I Build",
      projects: "Projects",
      stack: "Tech Stack",
      contact: "Contact",
      cta: "Get in touch",
    },
    hero: {
      pill: "Available for backend & AI automation work",
      role: "Backend & AI Automation Engineer",
      sub: "I build software that connects APIs, data, AI and infrastructure — backend systems, intelligent automations, and complete solutions deployed end-to-end on real infrastructure.",
      projects: "View projects",
      contact: "Contact",
    },
    about: {
      title: "About",
      p1: "I started in backend engineering building APIs and data-driven systems with Python, PostgreSQL and SQL Server. As systems grew more complex, I moved into automating processes with AI — AI Agents, RAG pipelines and LLM-powered applications that connect internal tools, enterprise systems and external services.",
      p2: "Today I'm deepening my work in infrastructure and DevOps, deploying and operating complete solutions on Linux, Docker, VPS and Dokploy with CI/CD pipelines through GitHub Actions. My focus is building and shipping systems end-to-end — not just interfaces, but the full stack that makes them run.",
      badges: [
        "Backend & APIs",
        "AI Agents & RAG",
        "Infrastructure & DevOps",
        "End-to-end systems",
      ],
    },
    work: {
      title: "What I Build",
      desc: "Three areas that come together in every system I ship.",
      areas: [
        {
          title: "Backend Engineering",
          desc: "APIs and services with Python, FastAPI and Django. Relational data modeling, integrations and systems built to run in production.",
          points: ["REST & APIs", "Python / FastAPI", "System integrations"],
        },
        {
          title: "AI & Automation",
          desc: "AI Agents, RAG pipelines and LLM applications that automate real business processes and connect data to decisions.",
          points: ["AI Agents", "RAG & LLMs", "Process automation"],
        },
        {
          title: "Infrastructure & DevOps",
          desc: "Deployment and operations on Linux, Docker, VPS and Dokploy with CI/CD through GitHub Actions. Building and shipping complete systems.",
          points: ["Docker & VPS", "Dokploy", "CI/CD pipelines"],
        },
      ],
    },
    projects: {
      sectionTitle: "Projects & Experiments",
      sectionDesc:
        "Backend systems, AI automation and technical exploration — from shipped solutions to new ideas.",
      title: "Featured Projects",
      desc: "Systems, not just interfaces — backend, AI automation and complete end-to-end solutions.",
      items: [
        {
          tag: "Backend",
          title: "Multi-tenant API Platform",
          desc: "A production backend with FastAPI and PostgreSQL serving multi-tenant APIs, auth, role-based access and async task workers. Designed for scale and clean data isolation.",
          stack: ["Python", "FastAPI", "PostgreSQL", "Redis"],
        },
        {
          tag: "AI Automation",
          title: "Intelligent Document Assistant",
          desc: "RAG system over enterprise documentation with LLM-powered Q&A, citations and automatic ingestion pipelines. Connects internal knowledge to a conversational interface.",
          stack: ["LangChain", "RAG", "LLMs", "Python"],
        },
        {
          tag: "AI Agents",
          title: "Autonomous Workflow Agents",
          desc: "AI Agents that orchestrate APIs, databases and external services to automate multi-step business processes end-to-end with tool use and memory.",
          stack: ["AI Agents", "Tools", "OpenAI"],
        },
        {
          tag: "Integration",
          title: "Enterprise API Connector",
          desc: "Bi-directional integration layer between internal systems and external services, with queueing, retries and observability for reliable data flow.",
          stack: ["Python", "APIs", "SQL Server"],
        },
      ],
    },
    experiments: {
      title: "R&D / Experiments",
      desc: "Personal projects and technical experiments where I explore new ground.",
      items: [
        {
          title: "Driver Drowsiness Detection (IoT)",
          desc: "Computer vision system on edge hardware that detects driver fatigue in real time and triggers alerts. Combines CV models with sensor integration.",
        },
        {
          title: "RAG for Enterprise Docs",
          desc: "Experiment building retrieval-augmented generation over large internal documentation sets, testing chunking strategies and vector stores.",
        },
        {
          title: "Computer Vision & AI Labs",
          desc: "Hands-on experiments with CV models, LLMs and new automation tooling — exploring what's practical before bringing it into production systems.",
        },
      ],
    },
    stack: {
      title: "Tech Stack",
      desc: "Grouped by category — the tools I use to build and ship.",
    },
    contact: {
      title: "Contact",
      heading: "Let's build something solid.",
      sub: "Open to backend, AI automation and infrastructure projects. Reach out through any of the channels below.",
    },
    footer: {
      tagline: "I build software that connects APIs, data, AI and infrastructure.",
    },
  },
  es: {
    nav: {
      about: "Sobre mí",
      work: "Qué construyo",
      projects: "Proyectos",
      stack: "Stack",
      contact: "Contacto",
      cta: "Hablemos",
    },
    hero: {
      pill: "Disponible para proyectos de backend y automatización con IA",
      role: "Backend & AI Automation Engineer",
      sub: "Construyo software que conecta APIs, datos, IA e infraestructura — sistemas backend, automatizaciones inteligentes y soluciones completas desplegadas de punta a punta sobre infraestructura real.",
      projects: "Ver proyectos",
      contact: "Contacto",
    },
    about: {
      title: "Sobre mí",
      p1: "Comencé en ingeniería backend construyendo APIs y sistemas basados en datos con Python, PostgreSQL y SQL Server. A medida que los sistemas se volvieron más complejos, pasé a automatizar procesos con IA — AI Agents, pipelines RAG y aplicaciones con LLMs que conectan herramientas internas, sistemas empresariales y servicios externos.",
      p2: "Hoy profundizo en infraestructura y DevOps, desplegando y operando soluciones completas en Linux, Docker, VPS y Dokploy con pipelines de CI/CD en GitHub Actions. Mi enfoque es construir y lanzar sistemas de punta a punta — no solo interfaces, sino todo el stack que los hace funcionar.",
      badges: [
        "Backend & APIs",
        "AI Agents & RAG",
        "Infraestructura & DevOps",
        "Sistemas end-to-end",
      ],
    },
    work: {
      title: "Qué construyo",
      desc: "Tres áreas que se combinan en cada sistema que entrego.",
      areas: [
        {
          title: "Backend Engineering",
          desc: "APIs y servicios con Python, FastAPI y Django. Modelado de datos relacionales, integraciones y sistemas construidos para producción.",
          points: ["REST & APIs", "Python / FastAPI", "Integración de sistemas"],
        },
        {
          title: "IA & Automatización",
          desc: "AI Agents, pipelines RAG y aplicaciones con LLMs que automatizan procesos de negocio reales y conectan datos con decisiones.",
          points: ["AI Agents", "RAG & LLMs", "Automatización de procesos"],
        },
        {
          title: "Infraestructura & DevOps",
          desc: "Despliegue y operación en Linux, Docker, VPS y Dokploy con CI/CD en GitHub Actions. Construcción y entrega de sistemas completos.",
          points: ["Docker & VPS", "Dokploy", "Pipelines CI/CD"],
        },
      ],
    },
    projects: {
      sectionTitle: "Proyectos y experimentos",
      sectionDesc:
        "Sistemas backend, automatización con IA y exploración técnica: de soluciones entregadas a nuevas ideas.",
      title: "Proyectos destacados",
      desc: "Sistemas, no solo interfaces — backend, automatización con IA y soluciones completas de punta a punta.",
      items: [
        {
          tag: "Backend",
          title: "Plataforma API Multi-tenant",
          desc: "Backend en producción con FastAPI y PostgreSQL sirviendo APIs multi-tenant, autenticación, control de acceso por roles y workers asíncronos. Diseñado para escalar con aislamiento de datos limpio.",
          stack: ["Python", "FastAPI", "PostgreSQL", "Redis"],
        },
        {
          tag: "Automatización IA",
          title: "Asistente Inteligente de Documentos",
          desc: "Sistema RAG sobre documentación empresarial con preguntas y respuestas potenciadas por LLM, citas y pipelines de ingesta automática. Conecta el conocimiento interno con una interfaz conversacional.",
          stack: ["LangChain", "RAG", "LLMs", "Python"],
        },
        {
          tag: "AI Agents",
          title: "Agentes Autónomos de Workflows",
          desc: "AI Agents que orquestan APIs, bases de datos y servicios externos para automatizar procesos de negocio de múltiples pasos de punta a punta, con uso de herramientas y memoria.",
          stack: ["AI Agents", "Tools", "OpenAI"],
        },
        {
          tag: "Integración",
          title: "Conector de APIs Empresariales",
          desc: "Capa de integración bidireccional entre sistemas internos y servicios externos, con colas, reintentos y observabilidad para un flujo de datos confiable.",
          stack: ["Python", "APIs", "SQL Server"],
        },
      ],
    },
    experiments: {
      title: "I+D / Experimentos",
      desc: "Proyectos personales y experimentos técnicos donde exploro nuevos terrenos.",
      items: [
        {
          title: "Detección de Somnolencia en Conductores (IoT)",
          desc: "Sistema de visión por computadora en hardware edge que detecta fatiga del conductor en tiempo real y dispara alertas. Combina modelos de CV con integración de sensores.",
        },
        {
          title: "RAG para Documentación Empresarial",
          desc: "Experimento de generación aumentada por recuperación sobre grandes conjuntos de documentación interna, probando estrategias de chunking y vector stores.",
        },
        {
          title: "Laboratorios de Computer Vision e IA",
          desc: "Experimentos prácticos con modelos de CV, LLMs y nuevas herramientas de automatización — explorando qué es práctico antes de llevarlo a sistemas en producción.",
        },
      ],
    },
    stack: {
      title: "Stack tecnológico",
      desc: "Agrupado por categoría — las herramientas que uso para construir y entregar.",
    },
    contact: {
      title: "Contacto",
      heading: "Construyamos algo sólido.",
      sub: "Abierto a proyectos de backend, automatización con IA e infraestructura. Escribime por cualquiera de estos canales.",
    },
    footer: {
      tagline: "Construyo software que conecta APIs, datos, IA e infraestructura.",
    },
  },
} as const;

export type Dict = (typeof dict)["en"];

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: dict.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (dict[lang] as Dict) ?? dict.en;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
