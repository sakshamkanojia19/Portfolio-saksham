import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

const Projects = () => {
  const techProjects = PROJECTS.filter(
    (project) => project.category === "Tech"
  );

  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
          Projects
        </p>
        <h2 className="font-display text-3xl sm:text-4xl section-title">
          AI products and systems shipped in production.
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {techProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group space-y-6">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/70">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-xl text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={`${project.title}-${tech}-${i}`}>{tech}</Badge>
                ))}
              </div>
              {project.link && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </Button>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
