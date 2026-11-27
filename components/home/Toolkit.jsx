import { skills } from "../../lib/content";

const ICONS = ["✧", "◉", "⌘", "☁", "◧"];

// Skills grouped by discipline, rendered as scannable chips.
export default function Toolkit() {
  return (
    <div className="toolkit">
      {skills.map(([name, tools], i) => {
        const list = tools.split(" · ");
        return (
          <article
            className="toolkit-card spotlight"
            key={name}
            data-reveal
            style={{ "--d": i % 3 }}
          >
            <header>
              <span className="toolkit-icon" aria-hidden="true">
                {ICONS[i % ICONS.length]}
              </span>
              <h3>{name}</h3>
              <span className="toolkit-count">
                {String(list.length).padStart(2, "0")}
              </span>
            </header>
            <ul className="chip-row">
              {list.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
