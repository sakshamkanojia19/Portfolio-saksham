// Editorial outlines, never exposed as published articles.
export const starterDrafts = [
  {
    title: "When a pause isn’t the end of a sentence",
    slug: "voice-agent-endpointing",
    excerpt:
      "Notes from building Nexus: why turn-taking needs more than a fixed silence timer.",
    tags: "Voice AI, Nexus",
    body: "## The problem\n\nDescribe the unfinished-sentence behavior you observed in Nexus.\n\n## The implementation\n\nExplain the English/Hindi grammar rules and pitch tracker. Add a code excerpt from the project.\n\n## What changed\n\nInclude a reproducible test, hardware, timings, and limitations.\n\n## What I would improve next\n\nAdd your own conclusions before publishing.",
  },
  {
    title: "Permissions belong before generation",
    slug: "permission-aware-rag",
    excerpt:
      "How CollabDocs scopes document retrieval to the access boundary of the person asking.",
    tags: "RAG, Security",
    body: "## The access boundary\n\nDescribe how CollabDocs represents document permissions.\n\n## Retrieval before ranking\n\nAdd a sanitized query and explain where ACL filtering happens.\n\n## Testing the boundary\n\nShow permitted and denied cases. Explain the remaining security limitations.\n\n## Takeaways\n\nAdd your own conclusions and link to the case study.",
  },
];
