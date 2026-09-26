import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { CONTACT, NAV, PROFILE, RESUME_URL } from "../constants";

const socials = [
  { Icon: FaLinkedin, href: PROFILE.linkedin, label: "LinkedIn" },
  { Icon: FaGithub, href: PROFILE.github, label: "GitHub" },
  { Icon: FiMail, href: `mailto:${CONTACT.email}`, label: "Email" },
];

const Footer = () => (
  <footer className="border-t border-line">
    <div className="mx-auto max-w-shell-wide px-5 py-14 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_auto]">
        {/* Identity and a direct way in.
            This column used to repeat PROFILE.signatureLines verbatim — the
            same two sentences the Statement section already gives a full-width
            moment to on the home page, so visitors read the manifesto twice in
            one scroll. The line belongs to Statement; the footer does the job
            a footer is actually for. */}
        <div className="max-w-measure-tight">
          <p className="font-display text-xl font-semibold text-ink">
            {PROFILE.name}
          </p>
          <p className="mt-2 text-sm text-ink-3">
            {PROFILE.role} · {PROFILE.location}
          </p>

          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-6 block break-all text-base text-ink-2 transition-colors hover:text-accent"
          >
            {CONTACT.email}
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-accent"
          >
            Download resume
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
            Site
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-ink-3 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
            Elsewhere
          </h2>
          <ul className="mt-4 flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-3 transition-colors hover:border-line-strong hover:text-ink"
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-2xs text-ink-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <p>
          Press{" "}
          <kbd className="rounded-xs border border-line px-1 py-0.5 text-ink-3">⌘K</kbd>{" "}
          to search
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
