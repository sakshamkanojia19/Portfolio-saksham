import { skills } from "../../lib/content";

export default function Toolkit() {
  return (
    <dl className="spec">
      {skills.map(([name, tools]) => (
        <div className="spec-row" key={name} data-reveal>
          <dt>{name}</dt>
          <dd>{tools}</dd>
        </div>
      ))}
    </dl>
  );
}
