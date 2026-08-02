// Single source of truth for site content.
// Keep this file aligned with the latest resume — components read from here only.

export const PROFILE = {
  name: "Saksham Kanojia",
  firstName: "Saksham",
  lastName: "Kanojia",
  title: "AI Automation Engineer · Full-Stack Developer · Generative AI",
  tagline:
    "I build AI-native products and automation systems with LLMs, RAG pipelines, and scalable SaaS that deliver measurable impact.",
  signatureLines: [
    "I don't add AI as a feature — I build AI-native systems as infrastructure.",
    "I think in systems, not scripts.",
  ],
  location: "Delhi, India",
  linkedin: "https://www.linkedin.com/in/saksham-kanojia-7895b7217/",
  github: "https://github.com/sakshamkanojia19",
};

// Latest general resume (Google Drive). Swap to a self-hosted PDF in /public
// later if you want an actual file download instead of the Drive viewer.
export const RESUME_URL =
  "https://drive.google.com/file/d/1o9y52N02JNEXnNzGVTm2BIiHlhNv5wPJ/view?usp=sharing";

export const SITE_URL = "https://saksham-kanojia.vercel.app";

export const ABOUT_CONTENT = `I build autonomous AI systems that replace operational work inside real companies. As an AI Automation Engineer, I design and deploy production-grade LLM agents, RAG pipelines, and AI-native SaaS products from 0→1 — owning architecture, backend, deployment, and iteration. My systems reduce manual operational effort by 60%+ across marketing, hiring, outreach, and internal operations. I care about reliability in production, latency and cost optimization, and shipping fast then iterating faster. I operate at the intersection of AI engineering and business execution.`;

// `count`/`suffix` drive the animated counters; `value` is the static fallback.
export const ABOUT_HIGHLIGHTS = [
  {
    label: "Operational Impact",
    value: "60%+",
    count: 60,
    suffix: "%+",
    detail: "Manual effort removed across internal workflows",
  },
  {
    label: "Platforms Shipped",
    value: "5+",
    count: 5,
    suffix: "+",
    detail: "Internal SaaS products designed and delivered 0→1",
  },
  {
    label: "Ownership",
    value: "0→1",
    detail: "Architecture, backend, deployment, iteration",
  },
];

export const FOCUS_AREAS = [
  "Production LLM agents, RAG pipelines, and multi-step orchestration",
  "AI-native SaaS from architecture through deployment and iteration",
  "Reliability, latency, and cost optimization as first-class concerns",
];

// Grouped as on the resume — with a `note` per group so the site says what the
// resume can't: how each layer is actually used in production.
export const SKILL_GROUPS = [
  {
    key: "ai",
    label: "AI & LLM Systems",
    accent: "purple",
    note: "My daily toolkit — agents, retrieval, and orchestration running in production, not demos.",
    items: [
      "LLMs (OpenAI, Claude)",
      "LangChain",
      "LangGraph",
      "AI Agents & multi-step workflows",
      "Tool calling",
      "RAG",
      "Pinecone (vector search)",
      "Embedding-based retrieval",
      "Prompt & context engineering",
      "n8n",
    ],
  },
  {
    key: "languages",
    label: "Languages",
    accent: "orange",
    note: "Python for AI backends, JavaScript end to end.",
    items: ["Python", "JavaScript"],
  },
  {
    key: "backend",
    label: "Backend & APIs",
    accent: "orange",
    note: "Async-first services that front every AI system I ship.",
    items: ["FastAPI", "Node.js (Express)", "REST APIs", "Async services"],
  },
  {
    key: "frontend",
    label: "Frontend",
    accent: "purple",
    note: "Fast, clean interfaces for AI products — this site included.",
    items: ["React.js", "Tailwind CSS"],
  },
  {
    key: "databases",
    label: "Databases",
    accent: "orange",
    note: "Document and relational, picked per workload.",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    key: "cloud",
    label: "Cloud & Infra",
    accent: "purple",
    note: "Shipped to GCP Cloud Run, AWS EC2, and Zeabur with CI/CD.",
    items: ["AWS", "GCP", "Zeabur", "Docker", "CI/CD"],
  },
  {
    key: "systems",
    label: "Systems & Messaging",
    accent: "orange",
    note: "Real-time presence, caching, and per-user rate limiting.",
    items: ["Redis", "WebSockets"],
  },
  {
    key: "fundamentals",
    label: "Fundamentals",
    accent: "purple",
    note: "The base layer under everything above.",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "System Design (HLD/LLD)",
      "Debugging",
      "Test-case design",
    ],
  },
];

export const EXPERIENCES = [
  {
    year: "Apr 2025 – Present",
    role: "AI Automation Engineer",
    company: "Digital Web Solutions",
    current: true,
    points: [
      "Designed and shipped 5+ internal SaaS platforms — task & meeting management, expense management with business-unit and SPOC-level analytics, employee and freelance management — reducing manual operations by 60%.",
      "Built AI-powered automation pipelines and chatbot systems on LLM architectures (LangChain, RAG with Pinecone) and n8n, including multi-step agent workflows with tool calling and task routing.",
      "Engineered RAG ingestion, chunking, and retrieval pipelines with grounding strategies, improving relevance and reliability in production.",
      "Architected cross-platform integrations enabling real-time task sync between systems, with user-specific dashboards and RBAC-based access control.",
      "Leveraged AI-assisted development (Claude Code, Codex) to accelerate iteration while maintaining scalable, production-reliable system design.",
    ],
    technologies: [
      "LangChain",
      "RAG",
      "Pinecone",
      "n8n",
      "OpenAI",
      "Claude",
      "FastAPI",
      "Node.js",
      "React.js",
      "MongoDB",
      "Docker",
      "CI/CD",
    ],
  },
  {
    year: "Jan 2025 – Mar 2025",
    role: "Full Stack Development Intern",
    company: "Unified Mentor",
    points: [
      "Built and deployed full-stack apps (React, FastAPI, Node.js, MongoDB, Docker, AWS EC2) with automated testing (Jest, Selenium, Postman) and CI/CD — deployment efficiency +35%, production bugs −40%.",
    ],
    technologies: [
      "React.js",
      "FastAPI",
      "Node.js",
      "MongoDB",
      "Docker",
      "AWS EC2",
      "CI/CD",
      "Jest",
      "Selenium",
      "Postman",
    ],
  },
  {
    year: "Jan 2024 – Feb 2024",
    role: "Data Science & Generative AI Intern",
    company: "IBM SkillBuild",
    points: [
      "Explored GenAI/LLM workflows and prompt engineering; built data visualizations in R/RStudio.",
    ],
    technologies: ["Generative AI", "Prompt Engineering", "R", "RStudio"],
  },
];

export const EDUCATION = {
  degree: "B.Tech, Information Technology",
  institution: "Maharaja Surajmal Institute of Technology, New Delhi",
  period: "Nov 2020 – Jun 2024",
  score: "8.7 CGPA",
};

export const CERTIFICATIONS = [
  "OCI Generative AI Certified — Oracle",
  "Docker Essentials — Udemy",
];

export const PROJECTS = [
  {
    title: "CollabDocs",
    subtitle: "AI-Native Collaborative Document Workspace",
    featured: true,
    tagline: "An AI-native doc workspace where permissions come BEFORE generation.",
    highlights: [
      "Permission-aware RAG — retrieval filters chunks by document ACLs before generation, so AI answers can't surface content a user isn't allowed to see (prompt-injection resistant), with evidence-bound citations.",
      "Tiered AI: deterministic local summaries/mind-maps at zero API cost; OpenAI gated to paid tiers with per-user rate limiting and artifact caching.",
      "Real-time co-editing and presence over Socket.IO with server-side role enforcement.",
      "Modular monolith; CI/CD with live MongoDB/Redis smoke tests, auto-deployed to Cloud Run.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Redis",
      "OpenAI",
      "Docker",
      "GitHub Actions",
      "Cloud Run",
    ],
    link: "https://collabdocs-v1.vercel.app/",
    linkLabel: "Live demo",
  },
  {
    title: "AI Lead Intelligence Agent",
    subtitle: "Agentic research & outreach pipeline",
    tagline:
      "Turns a company domain plus an ICP into structured insight and personalized outreach.",
    highlights: [
      "End-to-end agentic pipeline converting company/domain + ICP into structured insights and personalized outreach.",
      "FastAPI backend with async scraping, LLM summarization, and MongoDB storage.",
      "Reduced manual research and improved outbound quality.",
    ],
    technologies: ["FastAPI", "Python", "LLMs", "MongoDB", "Async scraping"],
    // TODO(saksham): add repo / demo URL
    link: null,
    linkLabel: "Repo / demo",
  },
  {
    title: "AI-Powered Medical Service Chatbot",
    subtitle: "Domain-specific RAG assistant",
    tagline:
      "A grounded RAG chatbot tuned for a single medical domain, wired into booking flows.",
    highlights: [
      "Domain-specific RAG chatbot (React, FastAPI, LangChain, Pinecone) with engineered ingestion, chunking, and retrieval — relevance +45%, latency −30%.",
      "Integrations (Calendly, Telegram) lifted lead conversion +35%.",
    ],
    technologies: [
      "React",
      "FastAPI",
      "LangChain",
      "Pinecone",
      "RAG",
      "Calendly",
      "Telegram",
    ],
    link: "https://chatbot-3-frontend.vercel.app/",
    linkLabel: "Live demo",
  },
];

export const AI_POV = [
  {
    title: "Permissions before generation",
    description:
      "Most RAG checks access after retrieval — too late. I filter by ACL inside the query, so unauthorized content never enters the model's context.",
  },
  {
    title: "AI-native, not AI-as-a-feature",
    description:
      "I design systems where AI is infrastructure — agents, retrieval, and orchestration are the architecture, not a bolt-on.",
  },
  {
    title: "Graceful degradation",
    description:
      "Products should work when the key is unplugged: deterministic local fallbacks, cost caps, and sane defaults over hard failures.",
  },
  {
    title: "Reliability & cost are features",
    description:
      "Latency, token cost, rate limits, and evaluation are first-class concerns, not afterthoughts.",
  },
];

export const CURRENTLY_EXPLORING = {
  intro: "Things I'm going deeper on right now.",
  items: [
    {
      title: "Agent architectures & memory systems",
      detail: "Session, long-term, and vector memory.",
    },
    {
      title: "LLM & agent evaluation frameworks",
      detail: "LLM-as-judge, grounding checks, regression suites.",
    },
    {
      title: "Observability & tracing",
      detail: "Making agentic systems debuggable in production.",
    },
    {
      title: "MCP (Model Context Protocol)",
      detail: "Schema-driven tools and typed capability surfaces.",
    },
    {
      title: "Open-weight models & self-hosting",
      detail: "MoE architectures and model serving.",
    },
    {
      title: "Voice AI & emerging dev tools",
      detail: "Where the next interface layer is heading.",
    },
  ],
  humanNote:
    "I build side projects most weekends, I'm mildly obsessed with AI dev tooling (Claude Code, Cursor), and I like turning messy manual workflows into systems that run themselves.",
};

export const WRITING = {
  intro: "Notes on building AI systems in production.",
  posts: [
    {
      title: "Permissions before generation",
      blurb:
        "Why permission-aware retrieval belongs inside the query, not after it — and how CollabDocs enforces it.",
      // TODO(saksham): replace with the direct LinkedIn post URL
      href: PROFILE.linkedin,
      source: "LinkedIn",
    },
  ],
};

// Audience-targeted CTAs — different visitors need different next steps.
export const WORK_WITH_ME = [
  {
    audience: "Recruiters & Hiring Managers",
    pitch:
      "~1.5 years shipping production AI — agents, RAG, and internal SaaS with measurable impact. The resume has the summary; the projects here show the systems.",
    cta: { label: "View Resume", href: RESUME_URL, external: true },
    secondary: { label: "LinkedIn", href: PROFILE.linkedin, external: true },
  },
  {
    audience: "Founders & Teams",
    pitch:
      "Have a manual workflow burning hours? I've automated hiring, outreach, expense, and ops pipelines — cutting manual effort 60%+. Tell me the mess; I'll map the system.",
    cta: { label: "Start a conversation", href: "/contact", external: false },
    secondary: { label: "See the projects", href: "/projects", external: false },
  },
  {
    audience: "Developers",
    pitch:
      "I write about permission-aware RAG and agentic systems, and I build in public most weekends. Come argue with me about retrieval design.",
    cta: { label: "GitHub", href: PROFILE.github, external: true },
    secondary: { label: "AI POV", href: "/ai-pov", external: false },
  },
];

export const PERSONAL = {
  beyondCode:
    "Most weekends you'll find me prototyping something — half my side projects start as \"this workflow annoys me.\"",
  funFact: "I shipped 5+ internal platforms before my first work anniversary.",
};

export const CONTACT = {
  address: "Delhi, India",
  phoneNo: "+91 9310277188",
  email: "sakshamkanojia2002@gmail.com",
};
