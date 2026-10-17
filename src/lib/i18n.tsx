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
    },
    theme: {
      label: "Theme",
      open: "Open theme selector",
      close: "Close theme selector",
      dialogTitle: "Choose a theme",
      search: "Select Theme...",
      noResults: "No themes found",
      documentation: "Available themes",
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
      actions: {
        repository: "Repository",
        live: "Live page",
        gallery: "View gallery",
        closeGallery: "Close gallery",
        previousImage: "Previous image",
        nextImage: "Next image",
        imageCounter: "Image {current} of {total}",
      },
      items: [
        {
          tag: "Website and Mobile",
          title: "Cotorra",
          desc: "Development of a web and mobile platform for the management of and collaborative access to university resources. The system supports different types of users, as well as mechanisms for content management and moderation.",
          stack: ["FastAPI", "PostgreSQL", "Redis", "Flutter", "DevOps"],
          links: {
            repo: "https://github.com/davideq555/cotorra_app",
            live: "https://cotorra.com.ar",
          },
        },
        {
          tag: "OCR image",
          title: "Photo Recognition",
          desc: "A Python desktop application that finds participant numbers in photos using local OCR (RapidOCR), Ollama, OpenAI, Gemini, or an OpenAI-compatible vision service.",
          stack: ["OCR", "OpenAI", "LLMs", "Python"],
          links: {
            repo: "https://github.com/davideq555/app_reconocimiento_fotos",
            gallery: ["https://placehold.co/1200x800/png?text=RAG+Document+Flow"],
          },
        },
        {
          tag: "Backend",
          title: "WhatsApp Contact Management",
          desc: "An API project developed with FastAPI to manage WhatsApp contacts and chats in order to integrate them with n8n agents. It includes features for managing accounts and labels, as well as for linking them to chats.",
          stack: ["AI Agents", "n8n", "FastAPI"],
          links: {
            repo: "https://github.com/davideq555/whatsapp-contactos",
          },
        },
        {
          tag: "Management System",
          title: "Metalnor SIM",
          desc: "Comprehensive Modular System (SIM) for Metalnor. It integrates the comprehensive management of all areas—including HR, accounting, logistics, purchasing, and branch offices, among others—into a single platform.",
          stack: ["Python", "Django", "SQL Server"],
          links: {
            live: "https://sim.metalnor.com.ar/",
          },
        },
      ],
    },
    experiments: {
      title: "R&D / Experiments",
      desc: "Personal projects and technical experiments where I explore new ground.",
      items: [
        {
          title: "Convoy safe (IoT)",
          desc: "Early-warning system for hazards along the route for convoys of vehicles traveling on mountain roads without cell phone service, GPS, or internet access.",
          links: {
            repo: "https://github.com/davideq555/convoy-safe",
          },
        },
        {
          title: "RAG for Enterprise Docs",
          desc: "Experiment building retrieval-augmented generation over large internal documentation sets, testing chunking strategies and vector stores.",
          links: {
            repo: "https://github.com/davideq555/rag_documentos",
          },
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
    },
    theme: {
      label: "Tema",
      open: "Abrir selector de tema",
      close: "Cerrar selector de tema",
      dialogTitle: "Elegí un tema",
      search: "Seleccionar tema...",
      noResults: "No se encontraron temas",
      documentation: "Temas disponibles",
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
      actions: {
        repository: "Repositorio",
        live: "Página en vivo",
        gallery: "Ver galería",
        closeGallery: "Cerrar galería",
        previousImage: "Imagen anterior",
        nextImage: "Imagen siguiente",
        imageCounter: "Imagen {current} de {total}",
      },
      items: [
        {
          tag: "Pagina web y movil",
          title: "Cotorra",
          desc: "Desarrollo de una plataforma web y móvil para la gestión y acceso colaborativo a recursos universitarios. El sistema cuenta con diferentes tipos de usuarios, mecanismos de gestión y moderación del contenido.",
          stack: ["FastAPI", "PostgreSQL", "Redis", "Flutter", "DevOps"],
          links: {
            repo: "https://github.com/davideq555/cotorra_app",
            live: "https://cotorra.com.ar",
          },
        },
        {
          tag: "OCR imagenes",
          title: "Photo Recognition",
          desc: "Una aplicación de escritorio en Python que identifica el número de participantes en fotografías utilizando OCR local (RapidOCR), Ollama, OpenAI, Gemini o un servicio de visión compatible con OpenAI.",
          stack: ["OCR", "OpenAI", "LLMs", "Python"],
          links: {
            repo: "https://github.com/davideq555/app_reconocimiento_fotos",
            gallery: ["https://placehold.co/1200x800/png?text=RAG+Document+Flow"],
          },
        },
        {
          tag: "Backend",
          title: "Gestion contactos Whatsapp",
          desc: "Proyecto API desarrollada con FastAPI para gestionar contactos y chats de WhatsApp para integracion con agentes en n8n. Incluye funcionalidades para manejar cuentas, etiquetas, y la asociación de estas con los chats.",
          stack: ["AI Agents", "n8n", "FastAPI"],
          links: {
            repo: "https://github.com/davideq555/whatsapp-contactos",
          },
        },
        {
          tag: "Sistema de gestión",
          title: "Metalnor SIM",
          desc: "Sistema integral modular (SIM) para la empresa de Metalnor. Integra en una sola plataforma la gestión integral de todas las areas como RRHH, contabilidad, logistica, compras, sucursales, entre otras areas.",
          stack: ["Python", "Django", "SQL Server"],
          links: {
            live: "https://sim.metalnor.com.ar/",
          },
        },
      ],
    },
    experiments: {
      title: "I+D / Experimentos",
      desc: "Proyectos personales y experimentos técnicos donde exploro nuevos terrenos.",
      items: [
        {
          title: "Convoy seguro (IoT)",
          desc: "Sistema de alerta temprana de peligros en ruta para convoys de vehículos que circulan por caminos de montaña, sin cobertura celular, sin GPS y sin acceso a internet.",
          links: {
            repo: "https://github.com/davideq555/convoy-safe",
          },
        },
        {
          title: "RAG para Documentación Empresarial",
          desc: "Experimento de generación aumentada por recuperación sobre grandes conjuntos de documentación interna, probando estrategias de chunking y vector stores.",
          links: {
            repo: "https://github.com/davideq555/rag_documentos",
            gallery: ["https://placehold.co/1200x800/png?text=Enterprise+RAG+Lab"],
          },
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
