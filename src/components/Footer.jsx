import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/60 sm:flex-row sm:px-10">
        <p>© 2026 Saksham Kanojia. All rights reserved.</p>
        <div className="flex items-center gap-4 text-lg text-white/70">
          <a
            href="https://www.linkedin.com/in/saksham-kanojia-7895b7217/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-orange-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/sakshamkanojia19"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition hover:text-orange-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
