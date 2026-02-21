import { HERO_CONTENT } from "../constants";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

const highlights = [
  { label: "Automation Impact", value: "60%", detail: "Manual effort reduced" },
  { label: "RAG Pipelines", value: "LLM", detail: "LangChain + Pinecone" },
  { label: "Delivery", value: "E2E", detail: "From requirements to deployment" },
];

const focusAreas = [
  "LLM integration and AI workflow orchestration",
  "Scalable APIs with FastAPI, Node.js, and PostgreSQL",
  "Reliable systems with CI/CD, testing, and cloud delivery",
];

const About = () => {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="purple">AI Engineer</Badge>
          <Badge variant="orange">Full-Stack</Badge>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl section-title">
          Building production-grade AI systems that move real metrics.
        </h2>
        <p className="text-white/75 leading-relaxed">{HERO_CONTENT}</p>
        <ul className="space-y-3 text-white/70">
          {focusAreas.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-4">
        {highlights.map((item) => (
          <Card key={item.label} className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              {item.label}
            </p>
            <p className="font-display text-3xl text-white">{item.value}</p>
            <p className="text-sm text-white/60">{item.detail}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default About;
