// Summaries of the existing case studies. Screenshots capture public landing
// pages; diagrams describe architecture and do not represent a product UI.
export const projectPresentation = {
  nexus: {
    contribution: "Built the continuous voice loop, sentence-aware endpointing, retrieval routing, and streamed responses.",
    decision: "Use speech and sentence signals to handle pauses and interruptions instead of relying on a fixed silence timer.",
    evidence: "17 regression tests, with latency measured on a 4 GB laptop GPU. Hardware and workload affect the result.",
    focus: "A conversation that keeps moving",
  },
  collabdocs: {
    image: "/projects/collabdocs.png",
    alt: "CollabDocs public landing page introducing its collaborative document workspace",
    contribution: "Built collaborative editing and permission-aware retrieval, with access roles enforced by the server.",
    decision: "Keep deterministic AI features available without paid inference; gate paid models behind entitlements and usage limits.",
    evidence: "37 unit tests and MongoDB/Redis smoke tests. Document ACLs scope retrieval before ranking.",
    focus: "Shared documents. Scoped answers.",
  },
  "lead-intelligence-agent": {
    contribution: "Connected asynchronous research, LLM summarization, structured lead profiles, and outreach drafting.",
    decision: "Produce a draft for human review. Research and drafting are separate from sending outreach.",
    evidence: "Source code documents the research-to-draft pipeline. No measured conversion improvement is claimed.",
    focus: "Research before the first message",
  },
  "medical-rag-chatbot": {
    image: "/projects/medical-service.png",
    alt: "Medical Service Assistant public demo website with its healthcare service chatbot launcher",
    contribution: "Built ingestion, chunking, retrieval, and a React/FastAPI interface with booking and communication integrations.",
    decision: "Connect grounded service information to a practical next action, including Calendly and Telegram.",
    evidence: "The resume reports relevance and latency improvements. The evaluation methodology is not published in this case study.",
    focus: "From a service question to the next step",
  },
};
