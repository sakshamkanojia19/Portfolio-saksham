export const profile = {
  name: "Saksham Kanojia",
  role: "AI Engineer",
  location: "Delhi, India",
  email: "sakshamkanojia2002@gmail.com",
  github: "https://github.com/sakshamkanojia19",
  linkedin: "https://www.linkedin.com/in/saksham-kanojia-7895b7217/",
};
export const projects = [
  {
    slug: "nexus",
    repository: "https://github.com/sakshamkanojia19/nexus-voice-rag",
    name: "Nexus",
    category: "VOICE AI · OPEN SOURCE",
    color: "violet",
    title: "A voice assistant that knows when to listen.",
    summary:
      "Real-time voice, grounded retrieval, and a continuous conversation loop. Built for the pauses, interruptions, and messy edges of human speech.",
    stack: [
      "React",
      "TypeScript",
      "FastAPI",
      "LangChain",
      "Qdrant",
      "faster-whisper",
      "ONNX",
    ],
    metrics: [
      ["~0.6s", "speech to transcript"],
      ["~1s", "time to first token"],
      ["17", "regression tests"],
    ],
    caveat:
      "Latency measured on a 4 GB laptop GPU; results depend on hardware and workload.",
    problem:
      "A useful voice assistant has to do more than transcribe speech. It needs to wait through unfinished sentences, handle interruptions, retrieve relevant evidence, and keep the conversation moving.",
    sections: [
      [
        "One microphone session, a continuous loop",
        "Nexus keeps the browser microphone session open throughout a call. In-browser Silero VAD feeds faster-whisper, with generated tokens returned over NDJSON and spoken through streaming text-to-speech. Keeping the session alive removes repeated microphone setup between turns.",
      ],
      [
        "Endpointing that considers the sentence",
        "A fixed silence timer cannot distinguish a pause from the end of a thought. The endpointer combines English/Hindi grammar rules with pitch tracking, reusing frames produced by the VAD. Barge-in and echo suppression let a user interrupt without the assistant responding to its own voice.",
      ],
      [
        "Debugging citations at the retrieval layer",
        "Unrelated search results were returning successful HTTP responses and reaching the model as evidence. I traced fabricated citations to that search tier and added a word-overlap filter to scraped results. Tool routing chooses between user documents and live web retrieval.",
      ],
      [
        "Authentication and isolation",
        "Supabase JWKS verifies authentication server-side. Bring-your-own provider keys are not stored or logged, and are isolated from the shared model-client cache. The project includes 17 regression tests.",
      ],
    ],
    flow: [
      "Voice input",
      "VAD + endpointing",
      "Speech to text",
      "Tools + retrieval",
      "Streamed response",
    ],
  },
  {
    slug: "collabdocs",
    repository: "https://github.com/sakshamkanojia19/collabdocs-v1",
    name: "CollabDocs",
    category: "RAG · COLLABORATION",
    color: "green",
    title: "Useful answers. Inside your access boundary.",
    summary:
      "A collaborative document workspace with permission-aware retrieval, real-time editing, and an AI layer designed around predictable costs.",
    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "Redis",
      "OpenAI",
      "Cloud Run",
    ],
    link: "https://collabdocs-v1.vercel.app/",
    metrics: [
      ["ACL-first", "retrieval"],
      ["Zero", "free-tier API cost"],
      ["37", "unit tests"],
    ],
    caveat:
      "Zero API cost refers to deterministic local AI features. Hosting and paid-model usage are separate.",
    problem:
      "An assistant in a shared workspace must respect document access before it generates an answer. It also needs a useful experience when paid model inference is unavailable.",
    sections: [
      [
        "Permissions are part of the query",
        "Document ACLs scope the retrieval candidate set inside the database query, before ranking. Content outside a user’s access boundary is excluded from retrieval. Schema-constrained answers preserve citation provenance. This boundary does not replace other prompt-injection defenses.",
      ],
      [
        "A useful free tier",
        "Deterministic summaries, mind-maps, and lexical search run without paid model calls. A server-side entitlement layer gates OpenAI features to paid plans, with per-user limits and checksum-keyed artifact caching.",
      ],
      [
        "A simpler deployment boundary",
        "I consolidated an eight-service design into a modular monolith. Real-time co-editing uses Socket.IO with server-enforced roles. GitHub Actions runs 37 unit tests and live MongoDB/Redis smoke tests before the Docker deployment to Cloud Run.",
      ],
    ],
    flow: [
      "Signed-in user",
      "Document ACLs",
      "Scoped retrieval",
      "Grounded generation",
      "Cited answer",
    ],
  },
  {
    slug: "lead-intelligence-agent",
    repository:
      "https://github.com/sakshamkanojia19/AI-lead-Intelligence-Agent-1",
    name: "Lead Intelligence",
    category: "AGENTS · AUTOMATION",
    color: "blue",
    title: "From a company domain to an informed first message.",
    summary:
      "An agentic research pipeline that turns a company and ideal customer profile into structured insights and a personalized outreach draft.",
    stack: ["Python", "FastAPI", "LLMs", "MongoDB"],
    metrics: [
      ["Async", "company research"],
      ["Structured", "lead profiles"],
    ],
    problem:
      "Researching a company and drafting relevant outreach involves repeatedly gathering context from scattered web pages.",
    sections: [
      [
        "Research before outreach",
        "The pipeline accepts a company or domain and an ideal customer profile. Async scraping gathers source material, LLM summarization structures it, and MongoDB persists the result for lead profiles and outreach drafting.",
      ],
      [
        "A draft with a review step",
        "The output is a personalized draft for review. The portfolio does not claim an automated sending system or a measured conversion improvement.",
      ],
    ],
    flow: [
      "Company + ICP",
      "Async scraping",
      "LLM summarization",
      "Lead profile",
      "Outreach draft",
    ],
  },
  {
    slug: "medical-rag-chatbot",
    name: "Medical Service Assistant",
    category: "RAG · FULL-STACK",
    color: "rose",
    title: "Domain-specific retrieval, connected to booking.",
    summary:
      "A healthcare service chatbot with a purpose-built ingestion and retrieval pipeline, personalized interactions, and Calendly and Telegram integrations.",
    stack: [
      "React",
      "FastAPI",
      "LangChain",
      "Pinecone",
      "Calendly",
      "Telegram",
    ],
    link: "https://chatbot-3-frontend.vercel.app/",
    metrics: [
      ["+45%", "response relevance"],
      ["−30%", "response latency"],
    ],
    caveat:
      "Project-reported improvements from the resume; evaluation methodology is not published here.",
    problem:
      "A service assistant needs relevant domain information and a practical path to the next action, such as booking an appointment.",
    sections: [
      [
        "Engineering the retrieval path",
        "I built the ingestion, chunking, and retrieval pipeline with LangChain and Pinecone, served by a FastAPI backend and React interface. The project reported improved response relevance and reduced latency.",
      ],
      [
        "Connecting the user journey",
        "Calendly and Telegram integrations connect the assistant to booking and communication flows. The system is presented as a service assistant, not a clinical diagnosis tool.",
      ],
    ],
    flow: [
      "Service question",
      "Domain retrieval",
      "Grounded response",
      "Booking integration",
    ],
  },
];
export const experience = [
  {
    company: "Digital Web Solutions",
    role: "AI Automation Engineer",
    period: "Apr 2025 — Present",
    points: [
      "Building an enterprise voice-agent module with Pipecat, Plivo, Sarvam AI, and Cartesia for HR screening and lead calling in Hinglish and English, with outcome extraction, cost tracking, and regression-tested routing guardrails.",
      "Built Client Intelligence: daily LLM audits of emails, chats, CRM, and call transcripts across 250+ clients, producing weekly health scores. Health bands are computed in code.",
      "Shipped 5+ internal SaaS platforms across enterprise, employee, task, meeting, freelance, and expense management, with real-time sync, RBAC, and a payroll workflow with human review.",
      "Estimated ~60% reduction in manual operations: a directional estimate validated with leadership.",
      "Built LangChain, Pinecone RAG, and n8n automation pipelines; integrated OpenAI, Claude, Sarvam, Groq, an MCP connector, and observability. Deployed on AWS and GCP with MongoDB and Cloudflare R2 storage.",
    ],
  },
  {
    company: "Unified Mentor",
    role: "Full Stack Development Intern",
    period: "Jan 2025 — Mar 2025",
    points: [
      "Built and deployed full-stack applications with React, FastAPI, Node.js, and MongoDB. Used Docker, AWS EC2, Jest, Selenium, Postman, and CI/CD for testing and delivery.",
    ],
  },
];
export const skills = [
  [
    "AI & retrieval",
    "OpenAI · Claude · LangChain · LangGraph · agentic RAG · tool calling · MCP · embeddings · Pinecone · Qdrant · prompt & context engineering · guardrails · observability · n8n",
  ],
  [
    "Voice & real-time",
    "Pipecat · Plivo · Sarvam AI · Cartesia · Groq Whisper · faster-whisper · Silero VAD · STT / TTS · endpointing · barge-in · echo handling · WebSockets · NDJSON",
  ],
  [
    "Backend & data",
    "Python · JavaScript · TypeScript · FastAPI · Node.js / Express · REST · webhooks · async services · PostgreSQL · MongoDB · Redis · Supabase · JWT / JWKS · RBAC",
  ],
  [
    "Cloud & delivery",
    "AWS · GCP / Cloud Run · Cloudflare R2 · Docker · Git · GitHub Actions · CI/CD · unit & regression testing",
  ],
  [
    "Frontend & fundamentals",
    "React · Tailwind CSS · OOP · system design (HLD / LLD) · debugging · performance · AI-assisted development with Claude Code and Codex",
  ],
];
export const services = [
  {
    title: "RAG & knowledge assistants",
    text: "Make your documents useful through ingestion, retrieval, citations, and access-aware answers.",
    tags: "Internal knowledge · Document workflows",
    project: "collabdocs",
  },
  {
    title: "Voice AI systems",
    text: "Build voice experiences that handle turn-taking, interruptions, and connections to your business systems.",
    tags: "Voice interfaces · Agent integrations",
    project: "nexus",
  },
  {
    title: "Agents & workflow automation",
    text: "Connect research, tools, and existing platforms into workflows with clear boundaries and human review.",
    tags: "Research · Operations · SaaS integrations",
    project: "lead-intelligence-agent",
  },
  {
    title: "AI product engineering",
    text: "Take an AI product from architecture to a usable full-stack application, deployment, and iteration.",
    tags: "Prototypes · Full-stack products",
    project: "medical-rag-chatbot",
  },
];
