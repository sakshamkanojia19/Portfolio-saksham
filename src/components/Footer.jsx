import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { CONTACT, PROFILE } from "../constants";

const quickLinks = [
  { label: "AI POV", to: "/ai-pov" },
  { label: "Projects", to: "/projects" },
  { label: "Exploring", to: "/exploring" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="container mx-auto grid gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div className="space-y-3">
          <p className="font-display text-lg text-white">{PROFILE.name}</p>
          <p className="max-w-md text-sm leading-relaxed text-white/55">
            {PROFILE.signatureLines[0]}
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition hover:text-orange-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-lg text-white/70">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition hover:text-orange-300"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition hover:text-orange-300"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              aria-label={`Email ${PROFILE.name}`}
              className="transition hover:text-orange-300"
            >
              <FiMail aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <p className="container mx-auto px-5 py-5 text-xs text-white/40 sm:px-8 lg:px-10">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
