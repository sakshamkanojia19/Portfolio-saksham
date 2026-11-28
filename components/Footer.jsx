import Link from "next/link";
import { profile } from "../lib/content";

const COLUMNS = [
  [
    "Work",
    [
      ["/projects", "Case studies"],
      ["/about", "About"],
      ["/about#experience", "Experience"],
      ["/work-with-me", "Work with me"],
    ],
  ],
  [
    "Publishing",
    [
      ["/posts", "Short posts"],
      ["/writing", "Articles"],
      ["/subscribe", "Follow updates"],
      ["/feed.xml", "RSS feed"],
    ],
  ],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="wordmark" href="/">
            SAKSHAM<span className="wordmark-dot">.</span>
          </Link>
          <p>
            AI engineer building production RAG, agentic workflows, and
            real-time voice systems. Delhi, India.
          </p>
          <a className="footer-mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        {COLUMNS.map(([title, links]) => (
          <div className="footer-col" key={title}>
            <span className="footer-head">{title}</span>
            {links.map(([href, label]) =>
              href.endsWith(".xml") ? (
                <a key={href} href={href}>
                  {label}
                </a>
              ) : (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ),
            )}
          </div>
        ))}
        <div className="footer-col">
          <span className="footer-head">Elsewhere</span>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href="/resume.docx" download>
            Resume ↓
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Saksham Kanojia</span>
        <span className="footer-status">
          <span className="status-dot" aria-hidden="true" /> Open to roles
          &amp; select projects
        </span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
