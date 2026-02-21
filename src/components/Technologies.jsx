import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const skillGroups = {
  ai: {
    label: "AI & GenAI",
    items: [
      "LLM Integration",
      "OpenAI",
      "Claude",
      "LangChain",
      "RAG Pipelines",
      "Vector Databases",
      "Prompt Engineering",
      "Context Engineering",
      "AI Automation",
    ],
  },
  backend: {
    label: "Backend & Systems",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "Kafka",
      "Redis",
      "WebSocket",
      "Microservices",
    ],
  },
  frontend: {
    label: "Frontend",
    items: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Radix UI",
    ],
  },
  devops: {
    label: "Cloud & DevOps",
    items: ["Docker", "CI/CD", "GCP", "Git", "GitHub", "Postman"],
  },
  concepts: {
    label: "Concepts",
    items: [
      "Data Structures",
      "OOP",
      "System Design",
      "SDLC",
      "STLC",
      "Agile",
      "Scrum",
      "Testing",
      "Test Design",
      "Debugging",
      "Troubleshooting",
      "Cloud Computing",
    ],
  },
};

const Technologies = () => {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">
          Skills
        </p>
        <h2 className="font-display text-3xl sm:text-4xl section-title">
          Core technologies I use to ship AI products.
        </h2>
      </div>

      <Tabs defaultValue="ai">
        <TabsList>
          {Object.entries(skillGroups).map(([key, group]) => (
            <TabsTrigger key={key} value={key}>
              {group.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(skillGroups).map(([key, group]) => (
          <TabsContent key={key} value={key}>
            <div className="flex flex-wrap gap-3">
              {group.items.map((skill, index) => (
                <Badge
                  key={skill}
                  variant={index % 2 === 0 ? "purple" : "orange"}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Technologies;
