import { EXPERIENCES } from "../constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";

const Experience = () => {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300">
          Experience
        </p>
        <h2 className="font-display text-3xl sm:text-4xl section-title">
          Roles delivering AI automation and scalable systems.
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {EXPERIENCES.map((experience) => (
          <AccordionItem
            key={`${experience.company}-${experience.role}`}
            value={`${experience.company}-${experience.role}`}
            className="transition-colors duration-300 hover:border-orange-300/30"
          >
            <AccordionTrigger>
              <div className="space-y-1">
                <p className="text-sm text-white/50">{experience.year}</p>
                <p className="text-lg text-white">
                  {experience.role} <span className="text-white/60">@ {experience.company}</span>
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-4 max-w-3xl text-sm leading-relaxed text-white/70">
                {experience.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <Badge key={`${experience.role}-${tech}-${index}`}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Experience;
