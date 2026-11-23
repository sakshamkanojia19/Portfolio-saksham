import Link from "next/link";
import { profile } from "../lib/content";
export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="footer-name" href="/">
          Saksham Kanojia<span>.</span>
        </Link>
        <p>Building useful AI. Sharing what I learn.</p>
      </div>
      <div className="footer-links">
        <a href={profile.github}>GitHub</a>
        <a href={profile.linkedin}>LinkedIn</a>
        <a href={`mailto:${profile.email}`}>Email</a>
        <Link href="/subscribe">Follow updates</Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Saksham Kanojia</span>
        <span>Made with intention, in Delhi.</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
