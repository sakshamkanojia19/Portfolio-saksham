import project1 from "../assets/projects/imag2.jpg";

export const HERO_CONTENT = `I build AI-driven full-stack products with React.js, FastAPI, and Node.js. I integrate LLMs (OpenAI, Claude) using LangChain RAG pipelines and vector databases, and deliver scalable backend systems with MongoDB and PostgreSQL. I focus on clean system design, testing, CI/CD, and cloud delivery on GCP.`;

export const EXPERIENCES = [
  {
    year: "Apr 2025 - Present",
    role: "AI Automation Engineer",
    company: "Digital Web Solutions",
    description:
      "Designed, built, and deployed production-grade AI automation systems and internal AI SaaS platforms, reducing manual operational effort by 60%. Engineered LLM-powered chatbots using LangChain RAG pipelines with Pinecone vector search, integrating FastAPI and Node.js services for context-aware, multi-turn interactions. Architected internal business platforms (task management, expense management, hiring pipelines, competitor analysis, AI cold outreach, employee fitment) using Python, FastAPI, React, and AI workflow orchestration.",
    technologies: [
      "Python",
      "FastAPI",
      "AI Automation",
      "n8n",
      "React.js",
      "Node.js",
      "LangChain",
      "Pinecone",
      "RAG",
      "LLM",
      "OpenAI",
      "Claude",
      "MongoDB",
      "Docker",
      "GCP",
      "CI/CD",
    ],
  },
  {
    year: "Apr 2025 - Sep 2025",
    role: "Business AI Automation Trainee",
    company: "Digital Web Solutions",
    description:
      "Engineered AI-powered automations and RPA solutions using ChatGPT, Gemini, and RAG models, reducing manual effort by 60%. Co-developed LLM-powered cognitive AI chatbots with OpenAI, React, Node.js, Express, PostgreSQL, and MongoDB, using prompt engineering for context-aware interactions. Automated complex business processes using Python, Zapier, and Make, delivering systems like competitor analysis tools and hiring workflows.",
    technologies: [
      "MongoDB",
      "PostgreSQL",
      "Node.js",
      "Express.js",
      "AI",
      "Automation",
      "Zapier",
      "Make",
      "RPA",
      "LLM",
      "Gemini",
      "ChatGPT",
      "Prompt Engineering",
      "RAG",
      "OpenAI",
    ],
  },
  {
    year: "Jan 2025 - Mar 2025",
    role: "Full Stack Development Intern",
    company: "Unified Mentor",
    description:
      "Built and deployed full-stack web applications using React.js, FastAPI, Node.js, MongoDB, Docker, and CI/CD pipelines on AWS (EC2), improving deployment efficiency and user experience by 35%. Contributed to code reviews, API development, and technical documentation, improving project delivery success by 60%. Implemented unit, functional, and REST API testing with Selenium, Jest, and Postman, reducing production bugs by 40% and improving backend reliability.",
    technologies: [
      "React.js",
      "FastAPI",
      "Node.js",
      "MongoDB",
      "Docker",
      "AWS EC2",
      "CI/CD",
      "Selenium",
      "Jest",
      "Postman",
    ],
  },
  {
    year: "Dec 2024 - Jan 2025",
    role: "Web Developer Intern",
    company: "Oasis Infobyte",
    description:
      "Built MERN stack projects following SDLC, improving development efficiency by 35%. Optimized CI/CD workflows, reducing deployment time by 20%.",
    technologies: [
      "MERN",
      "React",
      "JavaScript",
      "REST APIs",
      "MongoDB",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "CI/CD",
    ],
  },
  {
    year: "Jan 2024 - Feb 2024",
    role: "Data Science & Generative AI Intern",
    company: "IBM SkillBuild",
    description:
      "Created interactive data visualizations using R and RStudio, improving data interpretation by 40%. Explored Generative AI concepts and tools to enhance AI-driven workflows. Crafted effective prompts for LLMs like ChatGPT, boosting response accuracy and relevance.",
    technologies: ["R", "RStudio", "Generative AI", "Prompt Engineering"],
  },
  {
    year: "Sep 2023 - Nov 2023",
    role: "Cybersecurity & Ethical Hacking Intern",
    company: "Rinex.ai",
    description:
      "Performed cybersecurity tasks including data gathering, vulnerability analysis, and network sniffing. Conducted penetration testing using Nmap, Wireshark, OWASP ZAP, and Metasploit, and produced actionable vulnerability reports.",
    technologies: ["Nmap", "Wireshark", "OWASP ZAP", "Metasploit"],
  },
  {
    year: "2023 - 2024",
    role: "Major Project Lead (Decentralized Cryptocurrency Exchange DApp)",
    company: "College Final Year Project",
    description:
      "Led the development of a decentralized cryptocurrency exchange with MetaMask integration and optimized transaction management. Implemented token slippage handling and improved swapping efficiency using Agile methods.",
    technologies: ["React.js", "Node.js", "Solidity", "Tailwind", "Ethereum"],
  },
];

export const PROJECTS = [
  {
    title: "AI-Powered Medical Service Company ChatBot",
    image: project1,
    category: "Tech",
    description:
      "Developed an LLM-based chatbot using React (Vite), Tailwind CSS, FastAPI, and LangChain, trained on medical company data for domain-specific query resolution. Implemented a RAG pipeline with Pinecone vector DB to improve contextual accuracy and response relevance. Built efficient data ingestion and chunking workflows to reduce latency, and increased engagement via AI-personalized conversations with Calendly and Telegram integrations.",
    technologies: [
      "React",
      "FastAPI",
      "Python",
      "Tailwind",
      "LangChain",
      "RAG",
      "Pinecone",
      "OpenAI",
      "Calendly",
      "Telegram",
    ],
    link: "https://chatbot-3-frontend.vercel.app/",
  },
  {
    title: "Modern Real-Estate Site",
    image: project1,
    category: "Tech",
    description:
      "Launched a real estate platform using React.js, Node.js, MongoDB, and Context API, improving user engagement by 50% with seamless property search and bookings. Deployed with CI/CD pipelines via GitHub, reducing downtime by 25%. Boosted reliability with automated UI testing using Selenium.",
    technologies: [
      "JavaScript",
      "React.js",
      "Node.js",
      "MongoDB",
      "Prisma",
      "Postman",
      "Material UI",
      "Leaflet",
      "OAuth",
      "Selenium",
      "CI/CD",
    ],
    link: "https://sk-homes-phi.vercel.app/",
  },
  {
    title: "CollabDocs - Real-Time Collaborative Documentation Platform",
    image: project1,
    category: "Tech",
    description:
      "Architected a secure, real-time collaborative platform enabling enterprises to create, edit, and share documents within private networks with controlled access. Built with React (Vite), Tailwind CSS, and a microservice-based backend using Express.js, MongoDB, Redis (Upstash), Kafka, Socket.io, JWT, and bcrypt, achieving low latency and stable performance under 10K+ concurrent sessions. Implemented RBAC, no-copy viewer mode, and real-time collaboration with synchronized sessions and chat.",
    technologies: [
      "React",
      "Tailwind",
      "Express.js",
      "MongoDB",
      "Redis",
      "Kafka",
      "Socket.io",
      "JWT",
      "Docker",
      "Microservices",
    ],
    link: "https://collab-docs-io.vercel.app/",
  },
  {
    title: "Portfolio Website",
    image: project1,
    category: "Tech",
    description:
      "Launched a personal portfolio website to showcase projects, improving engagement and performance using Vite for faster builds and optimized delivery.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Node.js",
      "Vite",
      "Framer Motion",
    ],
    link: "https://portfolio-2-sk.vercel.app/",
  },
  {
    title: "Decentralized Cryptocurrency Exchange DApp",
    image: project1,
    category: "Tech",
    description:
      "Developed a decentralized cryptocurrency exchange with MetaMask integration, token slippage handling, and optimized swapping efficiency.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Node.js",
      "Solidity",
      "Ant Design",
      "Tailwind",
      "Ethereum",
    ],
    link: "https://bit-exchangex.netlify.app/",
  },
];

export const CONTACT = {
  address: "Delhi, India",
  phoneNo: "+91 9310277188",
  email: "sakshamkanojia2002@gmail.com",
};
