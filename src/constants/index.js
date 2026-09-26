// ============================================================================
// Single source of truth for site content.
//
// Every factual claim here traces back to the resume. Where the revamp added
// longer-form prose, it reframes facts that were already on the site — it does
// not introduce new metrics, employers, or outcomes.
//
// Anything still needing a real value is marked TODO(saksham) and the UI
// degrades gracefully until it is filled.
// ============================================================================

export const PROFILE = {
  name: "Saksham Kanojia",
  firstName: "Saksham",
  lastName: "Kanojia",
  role: "AI Automation Engineer",
  title: "AI Automation Engineer · Full-Stack Developer · Generative AI",
  // The headline promise. This is the first thing a visitor reads — the name
  // used to occupy this slot, which told a scanning recruiter nothing.
  proposition: ["I build AI systems", "that replace", "operational work."],
  tagline:
    "Production LLM agents, RAG pipelines, and AI-native SaaS — shipped 0→1, owning architecture through deployment.",
  signatureLines: [
    "I don't add AI as a feature — I build AI-native systems as infrastructure.",
    "I think in systems, not scripts.",
  ],
  location: "Delhi, India",
  availability: "Open to roles & projects",
  linkedin: "https://www.linkedin.com/in/saksham-kanojia-7895b7217/",
  github: "https://github.com/sakshamkanojia19",
};

export const RESUME_URL =
  "https://drive.google.com/file/d/1o9y52N02JNEXnNzGVTm2BIiHlhNv5wPJ/view?usp=sharing";

export const SITE_URL = "https://saksham-kanojia.vercel.app";

// Navigation — one definition, consumed by the navbar, the command palette,
// the footer and the sitemap.
export const NAV = [
  { label: "Home", to: "/", hint: "Overview" },
  { label: "About", to: "/about", hint: "Background & how I work" },
  { label: "AI POV", to: "/ai-pov", hint: "How I think about building AI" },
  { label: "Skills", to: "/skills", hint: "The stack, and what I use it for" },
  { label: "Projects", to: "/projects", hint: "Case studies" },
  { label: "Experience", to: "/experience", hint: "Roles, education, certs" },
  { label: "Exploring", to: "/exploring", hint: "What I'm learning now" },
  { label: "Contact", to: "/contact", hint: "Start a conversation" },
];

// ----------------------------------------------------------------------------
// Proof — the numbers that belong above the fold, not buried in a mid-page card
// ----------------------------------------------------------------------------
export const PROOF = [
  {
    label: "Manual effort removed",
    value: "60%+",
    count: 60,
    suffix: "%+",
    detail: "Across marketing, hiring, outreach and internal operations",
  },
  {
    label: "Platforms shipped",
    value: "5+",
    count: 5,
    suffix: "+",
    detail: "Internal SaaS products delivered 0→1",
  },
  {
    label: "Ownership",
    value: "0→1",
    detail: "Architecture, backend, deployment, iteration",
  },
  {
    label: "Graduated",
    value: "2024",
    detail: "B.Tech IT, 8.7 CGPA — in production since",
  },
];

// Home page: each card is a doorway into a page that now has real depth of its
// own, rather than a duplicate of what the home page already showed.
export const HOME_ENTRIES = [
  {
    to: "/projects",
    eyebrow: "Projects",
    title: "Three systems, end to end",
    blurb:
      "Permission-aware RAG, an agentic research pipeline, and a grounded domain chatbot — with the architecture decisions behind each.",
    meta: "3 case studies",
  },
  {
    to: "/ai-pov",
    eyebrow: "AI POV",
    title: "How I think about building AI",
    blurb:
      "Permissions before generation, graceful degradation, and why reliability and cost are features — not afterthoughts.",
    meta: "4 principles",
  },
  {
    to: "/experience",
    eyebrow: "Experience",
    title: "Where the systems ran",
    blurb:
      "AI automation at Digital Web Solutions, full-stack at Unified Mentor, and a GenAI start at IBM SkillBuild.",
    meta: "3 roles",
  },
  {
    to: "/skills",
    eyebrow: "Skills",
    title: "The stack, with context",
    blurb:
      "Not a logo wall — what each layer is actually used for in systems that have to stay up.",
    meta: "8 groups",
  },
];

// ----------------------------------------------------------------------------
// About — long-form, deliberately distinct from the home page summary
// ----------------------------------------------------------------------------
export const ABOUT_CONTENT = `I build autonomous AI systems that replace operational work inside real companies. As an AI Automation Engineer, I design and deploy production-grade LLM agents, RAG pipelines, and AI-native SaaS products from 0→1 — owning architecture, backend, deployment, and iteration.`;

export const ABOUT_LONG = [
  {
    heading: "What I actually do",
    body: "I design and deploy production-grade LLM agents, RAG pipelines, and AI-native SaaS products from 0→1 — owning the architecture, the backend, the deployment, and the iteration after launch. In practice that means sitting with a manual workflow until I understand why it is manual, then replacing it with a system that runs itself. The systems I have shipped reduce manual operational effort by 60%+ across marketing, hiring, outreach, and internal operations.",
  },
  {
    heading: "Why AI-native, not AI-added",
    body: "Most products bolt a chat box onto an existing app and call it AI. I build the other way around: agents, retrieval, and orchestration are the architecture, not a feature sitting on top of it. That changes what you can promise a user — permission-aware answers, evidence-bound citations, deterministic fallbacks — because those guarantees live in the system design rather than in a prompt.",
  },
  {
    heading: "What I optimise for",
    body: "Reliability in production, latency, and cost. An agent that is brilliant in a demo and unpredictable under real traffic is not finished. I care about what happens when the API key is unplugged, when the context window fills, when a user asks for something they are not allowed to see, and when the monthly token bill arrives. Those cases are the product.",
  },
  {
    heading: "How I work",
    body: "Ship fast, then iterate faster — but with the architecture chosen deliberately up front, because that is the part that is expensive to change later. I use AI-assisted development heavily (Claude Code, Codex) to accelerate the loop, while keeping the system design scalable and production-reliable. I operate at the intersection of AI engineering and business execution: the point is not the model, it is the hours it gives back.",
  },
];

export const FOCUS_AREAS = [
  "Production LLM agents, RAG pipelines, and multi-step orchestration",
  "AI-native SaaS from architecture through deployment and iteration",
  "Reliability, latency, and cost optimization as first-class concerns",
];

export const PERSONAL = {
  beyondCode:
    "Most weekends you will find me prototyping something — half my side projects start as “this workflow annoys me”.",
  funFact:
    "I am mildly obsessed with AI dev tooling. Claude Code and Cursor changed how I build more than any framework has.",
  workingStyle:
    "I would rather spend an afternoon understanding why a workflow is manual than a week automating the wrong half of it.",
};

// ----------------------------------------------------------------------------
// Skills — grouped as on the resume, with the context the resume cannot carry
// ----------------------------------------------------------------------------
export const SKILL_GROUPS = [
  {
    key: "ai",
    label: "AI & LLM Systems",
    primary: true,
    note: "My daily toolkit — agents, retrieval, and orchestration running in production, not demos.",
    usedFor:
      "Multi-step agent workflows with tool calling and task routing; RAG ingestion, chunking and retrieval with grounding strategies; permission-aware retrieval where ACL filtering happens inside the query.",
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
    key: "backend",
    label: "Backend & APIs",
    note: "Async-first services that front every AI system I ship.",
    usedFor:
      "FastAPI for AI backends where async scraping and LLM calls dominate the request; Node and Express where the workload is CRUD and real-time.",
    items: ["FastAPI", "Node.js (Express)", "REST APIs", "Async services"],
  },
  {
    key: "languages",
    label: "Languages",
    note: "Python for AI backends, JavaScript end to end.",
    usedFor:
      "Python for anything touching models, retrieval or data pipelines. JavaScript from the API layer through to the interface.",
    items: ["Python", "JavaScript"],
  },
  {
    key: "frontend",
    label: "Frontend",
    note: "Fast, clean interfaces for AI products — this site included.",
    usedFor:
      "Dashboards with user-specific views and RBAC-gated UI; streaming chat surfaces; internal tools people actually have to use all day.",
    items: ["React.js", "Tailwind CSS"],
  },
  {
    key: "cloud",
    label: "Cloud & Infra",
    note: "Shipped to GCP Cloud Run, AWS EC2, and Zeabur with CI/CD.",
    usedFor:
      "Containerised deploys with CI/CD pipelines that run live smoke tests against real MongoDB and Redis before anything reaches production.",
    items: ["AWS", "GCP", "Zeabur", "Docker", "CI/CD"],
  },
  {
    key: "databases",
    label: "Databases",
    note: "Document and relational, picked per workload.",
    usedFor:
      "MongoDB for document-shaped product data and agent state; PostgreSQL where the relationships and constraints matter more than the flexibility.",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    key: "systems",
    label: "Systems & Messaging",
    note: "Real-time presence, caching, and per-user rate limiting.",
    usedFor:
      "Socket.IO for co-editing and presence with server-side role enforcement; Redis for artifact caching and per-user rate limits that keep token spend bounded.",
    items: ["Redis", "WebSockets"],
  },
  {
    key: "fundamentals",
    label: "Fundamentals",
    note: "The base layer under everything above.",
    usedFor:
      "System design decisions made deliberately up front, because that is the part that is expensive to revisit once a system is live.",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "System Design (HLD/LLD)",
      "Debugging",
      "Test-case design",
    ],
  },
];

// ----------------------------------------------------------------------------
// Experience
// ----------------------------------------------------------------------------
export const EXPERIENCES = [
  {
    year: "Apr 2025 – Present",
    period: "2025 —",
    role: "AI Automation Engineer",
    company: "Digital Web Solutions",
    current: true,
    summary:
      "Own AI automation end to end — from the agent architecture down to the deploy pipeline — across internal platforms the business uses daily.",
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
    period: "2025",
    role: "Full Stack Development Intern",
    company: "Unified Mentor",
    summary:
      "Full-stack delivery with automated testing and CI/CD as part of the definition of done, not a follow-up task.",
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
    period: "2024",
    role: "Data Science & Generative AI Intern",
    company: "IBM SkillBuild",
    summary:
      "Where the generative AI work started — prompt engineering and data visualisation.",
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
  { name: "OCI Generative AI Certified", issuer: "Oracle" },
  { name: "Docker Essentials", issuer: "Udemy" },
];

// ----------------------------------------------------------------------------
// Projects — structured as case studies (problem → approach → outcome)
// ----------------------------------------------------------------------------
export const PROJECTS = [
  {
    slug: "collabdocs",
    title: "CollabDocs",
    subtitle: "AI-Native Collaborative Document Workspace",
    featured: true,
    year: "2025",
    role: "Architecture · Backend · Deployment",
    tagline: "An AI-native doc workspace where permissions come BEFORE generation.",
    problem:
      "Retrieval-augmented assistants normally check access after retrieval — by then the restricted text is already in the model's context, one prompt injection away from being repeated back to a user who was never allowed to see it.",
    approach:
      "Retrieval filters chunks by document ACLs inside the query, so unauthorized content never enters the context window at all. On top of that, AI is tiered: deterministic local summaries and mind-maps cost nothing, while OpenAI is gated to paid tiers behind per-user rate limiting and artifact caching.",
    highlights: [
      "Permission-aware RAG — retrieval filters chunks by document ACLs before generation, so AI answers can't surface content a user isn't allowed to see (prompt-injection resistant), with evidence-bound citations.",
      "Tiered AI: deterministic local summaries/mind-maps at zero API cost; OpenAI gated to paid tiers with per-user rate limiting and artifact caching.",
      "Real-time co-editing and presence over Socket.IO with server-side role enforcement.",
      "Modular monolith; CI/CD with live MongoDB/Redis smoke tests, auto-deployed to Cloud Run.",
    ],
    metrics: [
      { value: "ACL-first", label: "Retrieval model" },
      { value: "Zero", label: "Free-tier API cost" },
      { value: "Live", label: "CI/CD smoke tests" },
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
    slug: "lead-intelligence-agent",
    title: "AI Lead Intelligence Agent",
    subtitle: "Agentic research & outreach pipeline",
    year: "2025",
    role: "Backend · Agent design",
    tagline:
      "Turns a company domain plus an ICP into structured insight and personalized outreach.",
    problem:
      "Outbound research is the definition of expensive manual work: someone reads a company's site, infers the fit, and writes a bespoke message — then repeats it a hundred times, with quality degrading as they go.",
    approach:
      "An end-to-end agentic pipeline takes a domain plus an ideal customer profile, scrapes asynchronously, summarises with an LLM into a structured shape, and persists it — so outreach is generated from evidence rather than guesswork.",
    highlights: [
      "End-to-end agentic pipeline converting company/domain + ICP into structured insights and personalized outreach.",
      "FastAPI backend with async scraping, LLM summarization, and MongoDB storage.",
      "Reduced manual research and improved outbound quality.",
    ],
    metrics: [
      { value: "Domain → draft", label: "Single input" },
      { value: "Async", label: "Scrape + summarise" },
    ],
    technologies: ["FastAPI", "Python", "LLMs", "MongoDB", "Async scraping"],
    // TODO(saksham): add the repo / demo URL here and the card turns into a
    // real link automatically — see ProjectCard.
    link: null,
    linkLabel: "Repo / demo",
  },
  {
    slug: "medical-rag-chatbot",
    title: "AI-Powered Medical Service Chatbot",
    subtitle: "Domain-specific RAG assistant",
    year: "2024",
    role: "Full-stack · RAG pipeline",
    tagline:
      "A grounded RAG chatbot tuned for a single medical domain, wired into booking flows.",
    problem:
      "A general-purpose assistant in a medical context is worse than none — it answers confidently outside its evidence, and it cannot do the one thing users actually came for, which is book an appointment.",
    approach:
      "Narrow the domain, engineer the ingestion and chunking for it specifically, and keep answers grounded in retrieved evidence. Then close the loop by wiring the assistant into the booking and messaging channels users already use.",
    highlights: [
      "Domain-specific RAG chatbot (React, FastAPI, LangChain, Pinecone) with engineered ingestion, chunking, and retrieval — relevance +45%, latency −30%.",
      "Integrations (Calendly, Telegram) lifted lead conversion +35%.",
    ],
    metrics: [
      { value: "+45%", label: "Retrieval relevance" },
      { value: "−30%", label: "Response latency" },
      { value: "+35%", label: "Lead conversion" },
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

// ----------------------------------------------------------------------------
// AI POV — each principle now carries an argument, not just a caption
// ----------------------------------------------------------------------------
export const AI_POV = [
  {
    title: "Permissions before generation",
    description:
      "Most RAG checks access after retrieval — too late. I filter by ACL inside the query, so unauthorized content never enters the model's context.",
    body: "Filtering after retrieval means the restricted text has already been loaded, already been concatenated into a prompt, and is already one clever instruction away from being repeated back. Moving the ACL check into the query is a small architectural change with a large security consequence: content a user cannot access is never a candidate, so there is nothing for an injection to extract. It also makes citations honest — every source shown is one the reader was entitled to see.",
    evidence: "Shipped in CollabDocs",
  },
  {
    title: "AI-native, not AI-as-a-feature",
    description:
      "I design systems where AI is infrastructure — agents, retrieval, and orchestration are the architecture, not a bolt-on.",
    body: "A chat box added to an existing product inherits all of that product's assumptions, which is why bolted-on AI so often feels like a demo. When retrieval and orchestration are the architecture, the guarantees change: you can promise grounded answers, enforce roles server-side, and route work between tools — because those behaviours live in the system, not in a prompt asking the model to behave.",
  },
  {
    title: "Graceful degradation",
    description:
      "Products should work when the key is unplugged: deterministic local fallbacks, cost caps, and sane defaults over hard failures.",
    body: "Every AI feature has a failure mode where the provider is down, the quota is spent, or the user is on a tier that does not include it. The honest design answer is a deterministic local path that still does something useful — a real summary, a real outline — rather than an error state. That is why CollabDocs' free tier produces summaries and mind-maps at zero API cost: the product is still a product without the model.",
    evidence: "Tiered AI in CollabDocs",
  },
  {
    title: "Reliability & cost are features",
    description:
      "Latency, token cost, rate limits, and evaluation are first-class concerns, not afterthoughts.",
    body: "Nobody ships a system and then discovers the latency budget; you either designed for it or you did not. The same is true of spend. Per-user rate limiting, artifact caching, and tiering are not optimisations bolted on at the end — they are what makes it possible to offer the feature at all. Evaluation belongs in the same bucket: if you cannot measure whether retrieval got worse, you cannot safely change it.",
  },
];

// ----------------------------------------------------------------------------
// Exploring
// ----------------------------------------------------------------------------
export const CURRENTLY_EXPLORING = {
  intro: "Things I am going deeper on right now.",
  items: [
    {
      title: "Agent architectures & memory systems",
      detail: "Session, long-term, and vector memory.",
      why: "Agents that cannot remember re-solve the same problem every turn — and memory design decides what an agent is actually capable of.",
    },
    {
      title: "LLM & agent evaluation frameworks",
      detail: "LLM-as-judge, grounding checks, regression suites.",
      why: "If you cannot measure whether retrieval got worse, you cannot safely change it. This is the gap between a demo and a system.",
    },
    {
      title: "Observability & tracing",
      detail: "Making agentic systems debuggable in production.",
      why: "A multi-step agent that fails silently is the hardest class of bug I have met. Tracing turns it back into an ordinary one.",
    },
    {
      title: "MCP (Model Context Protocol)",
      detail: "Schema-driven tools and typed capability surfaces.",
      why: "Typed capability surfaces are what tool calling should have been from the start.",
    },
    {
      title: "Open-weight models & self-hosting",
      detail: "MoE architectures and model serving.",
      why: "Cost and data control eventually make self-hosting an architecture question, not a preference.",
    },
    {
      title: "Voice AI & emerging dev tools",
      detail: "Where the next interface layer is heading.",
      why: "The interface layer is moving faster than the model layer right now.",
    },
  ],
  humanNote:
    "I build side projects most weekends, I am mildly obsessed with AI dev tooling (Claude Code, Cursor), and I like turning messy manual workflows into systems that run themselves.",
};

export const WRITING = {
  intro: "Notes on building AI systems in production.",
  posts: [
    {
      title: "Permissions before generation",
      blurb:
        "Why permission-aware retrieval belongs inside the query, not after it — and how CollabDocs enforces it.",
      // TODO(saksham): replace with the direct post URL. While `pending` is
      // true the card is honestly labelled as a profile link, not a published
      // post — the old build presented it as a post that did not exist.
      href: PROFILE.linkedin,
      source: "LinkedIn",
      pending: true,
    },
  ],
};

export const WORK_WITH_ME = [
  {
    audience: "Recruiters & Hiring Managers",
    pitch:
      "~1.5 years shipping production AI — agents, RAG, and internal SaaS with measurable impact. The resume has the summary; the projects here show the systems.",
    cta: { label: "View Resume", href: RESUME_URL, external: true },
    secondary: { label: "Experience", href: "/experience", external: false },
  },
  {
    audience: "Founders & Teams",
    pitch:
      "Have a manual workflow burning hours? I have automated hiring, outreach, expense, and ops pipelines — cutting manual effort 60%+. Tell me the mess; I will map the system.",
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

export const CONTACT = {
  address: "Delhi, India",
  phoneNo: "+91 9310277188",
  email: "sakshamkanojia2002@gmail.com",
  responseTime: "I reply within a day, usually sooner.",
};

// Ticker content — kept short so the strip reads as texture, not a stack list.
export const MARQUEE_ITEMS = [
  "AI Agents",
  "RAG Pipelines",
  "LangChain",
  "LangGraph",
  "Pinecone",
  "FastAPI",
  "Node.js",
  "React",
  "n8n",
  "OpenAI",
  "Claude",
  "Redis",
  "WebSockets",
  "Docker",
  "CI/CD",
];
