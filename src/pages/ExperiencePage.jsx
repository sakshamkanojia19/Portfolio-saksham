import Experience from "../components/Experience";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { EXPERIENCES, PROOF } from "../constants";

const ExperiencePage = () => {
  useDocumentMeta(
    "Experience — Saksham Kanojia",
    "AI Automation Engineer at Digital Web Solutions, full-stack development at Unified Mentor, and generative AI at IBM SkillBuild."
  );

  return (
    <div className="space-y-[var(--gap-section)]">
      <PageHeader
        eyebrow="Experience"
        title={["Where the", "systems", "actually ran."]}
        lede="Three roles, one throughline: take something people were doing manually and replace it with a system that holds up under real traffic."
        stats={[
          { label: "Roles", value: String(EXPERIENCES.length) },
          { label: "Current", value: "AI Automation Eng." },
          { label: "Manual effort cut", value: PROOF[0].value },
          { label: "Platforms shipped", value: PROOF[1].value },
        ]}
      />

      <Experience />
      <CtaBand
        title="Hiring for AI engineering?"
        body="I'm open to roles and projects. The resume has the formal version."
      />
    </div>
  );
};

export default ExperiencePage;
