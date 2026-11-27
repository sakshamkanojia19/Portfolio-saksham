import Link from "next/link";
import { profile } from "../lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="footer-name" href="/">
            Saksham Kanojia<span>.</span>
          </Link>
          <p>Building useful AI. Sharing what I learn.</p>
          <span className="footer-status">
            <span className="pulse" /> Available for roles &amp; select projects
          </span>
        </div>
        <div className="footer-cols">
          <div>
            <span className="footer-head">Explore</span>
            <Link href="/projects">Projects</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/writing">Articles</Link>
            <Link href="/about">About</Link>
          </div>
          <div>
            <span className="footer-head">Connect</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <Link href="/subscribe">Follow updates</Link>
          </div>
        </div>
      </div>
      <div className="footer-mark" aria-hidden="true">
        sk<span>.</span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Saksham Kanojia</span>
        <span>Made with intention, in Delhi · 28.6139° N 77.2090° E</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
