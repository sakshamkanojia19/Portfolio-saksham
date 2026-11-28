import { projects } from "../../lib/content";
import { metadata as pageMeta, jsonLd, siteUrl } from "../../lib/site";
import ProjectCard from "../../components/ProjectCard";
export const metadata = pageMeta(
  "Projects",
  "AI engineering case studies with architecture and benchmarks: real-time voice with Nexus, permission-aware RAG with CollabDocs, and agentic workflows.",
  "/projects",
);
export default function Projects() {
  return (
    <div className="container">
      <div className="page-heading" data-reveal>
        <span className="eyebrow">Case studies</span>
        <h1>
          Ideas, <em>made useful.</em>
        </h1>
        <p>
          The systems I’ve built, the problems behind them, and the decisions
          that shaped the result.
        </p>
      </div>
      <div className="project-grid page-projects">
        {projects.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
          />
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Saksham Kanojia — AI engineering case studies",
            url: `${siteUrl}/projects`,
            author: { "@id": `${siteUrl}/#person` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${siteUrl}/projects/${p.slug}`,
                name: p.name,
              })),
            },
          }),
        }}
      />
    </div>
  );
}
