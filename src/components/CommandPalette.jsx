import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck, FiCopy, FiExternalLink, FiSearch } from "react-icons/fi";
import { CONTACT, NAV, PROFILE, RESUME_URL } from "../constants";
import { EASE } from "./Reveal";
import useScrollLock from "../hooks/useScrollLock";

/**
 * ⌘K palette — navigate the whole site, grab the resume, or copy the email
 * without touching the mouse. Eight routes is a lot of navbar; this gives the
 * keyboard-first audience (developers, and most recruiters in a hurry) a
 * single entry point to all of it.
 */
const CommandPalette = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useScrollLock(open);

  const commands = useMemo(() => {
    const pages = NAV.map((item) => ({
      id: `nav:${item.to}`,
      group: "Pages",
      label: item.label,
      hint: item.hint,
      run: () => navigate(item.to),
    }));

    const actions = [
      {
        id: "action:resume",
        group: "Actions",
        label: "Download resume",
        hint: "Opens Google Drive",
        external: true,
        run: () => window.open(RESUME_URL, "_blank", "noopener,noreferrer"),
      },
      {
        id: "action:email",
        group: "Actions",
        label: "Copy email address",
        hint: CONTACT.email,
        icon: "copy",
        // Keeps the palette open so the confirmation is actually visible.
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(CONTACT.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          } catch {
            window.location.href = `mailto:${CONTACT.email}`;
          }
        },
      },
      {
        id: "action:github",
        group: "Actions",
        label: "GitHub profile",
        hint: "sakshamkanojia19",
        external: true,
        run: () => window.open(PROFILE.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "action:linkedin",
        group: "Actions",
        label: "LinkedIn profile",
        hint: "Connect",
        external: true,
        run: () => window.open(PROFILE.linkedin, "_blank", "noopener,noreferrer"),
      },
    ];

    return [...pages, ...actions];
  }, [navigate]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.hint ?? ""} ${command.group}`
        .toLowerCase()
        .includes(q)
    );
  }, [commands, query]);

  // Reset transient state on every open so the palette never reopens
  // mid-scroll with a stale query and a highlight pointing off-list.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    setCopied(false);
    restoreFocusRef.current = document.activeElement;
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  // Return focus to whatever opened the palette.
  useEffect(() => {
    if (open) return undefined;
    const node = restoreFocusRef.current;
    if (node instanceof HTMLElement) node.focus();
    return undefined;
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const select = useCallback(
    (command) => {
      if (!command) return;
      command.run();
      if (!command.keepOpen) onOpenChange(false);
    },
    [onOpenChange]
  );

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onOpenChange(false);
      return;
    }
    if (event.key === "ArrowDown" || (event.key === "n" && event.ctrlKey)) {
      event.preventDefault();
      setActive((prev) => (results.length ? (prev + 1) % results.length : 0));
      return;
    }
    if (event.key === "ArrowUp" || (event.key === "p" && event.ctrlKey)) {
      event.preventDefault();
      setActive((prev) =>
        results.length ? (prev - 1 + results.length) % results.length : 0
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      select(results[active]);
    }
    // Tab is swallowed so focus can never escape the dialog into the page
    // behind it — the palette is a single-input surface, so there is nowhere
    // legitimate for Tab to go.
    if (event.key === "Tab") event.preventDefault();
  };

  // Keep the highlighted row in view during keyboard travel.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (typeof document === "undefined") return null;

  let lastGroup = null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[14vh] sm:pt-[18vh]">
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            onKeyDown={onKeyDown}
            className="relative w-full max-w-xl overflow-hidden rounded-lg border border-line-strong bg-surface shadow-e3"
          >
            {/* The search field is auto-focused the moment the dialog opens, so
                the global 2px focus ring landed on it every single time and
                drew a heavy white box across the whole header. The dialog and
                the caret already say where focus is; the accent search icon
                confirms it without the outline. */}
            <div className="group/row flex items-center gap-3 border-b border-line px-4 focus-within:border-line-strong">
              <FiSearch
                className="shrink-0 text-ink-4 transition-colors group-focus-within/row:text-accent"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Jump to a page, or grab the resume…"
                aria-label="Search pages and actions"
                aria-controls="command-results"
                className="h-14 w-full bg-transparent text-base text-ink caret-accent outline-none focus:outline-none focus-visible:outline-none placeholder:text-ink-4"
              />
              <kbd className="ml-1 hidden shrink-0 rounded-xs border border-line px-1.5 py-1 font-mono text-2xs leading-none text-ink-4 sm:block">
                ESC
              </kbd>
            </div>

            <div
              id="command-results"
              ref={listRef}
              role="listbox"
              aria-label="Results"
              className="max-h-[52vh] overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-ink-4">
                  Nothing matches “{query}”.
                </p>
              )}

              {results.map((command, index) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                const isActive = index === active;
                const isCopyDone = copied && command.icon === "copy";

                return (
                  <div key={command.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                        {command.group}
                      </p>
                    )}
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseMove={() => setActive(index)}
                      onClick={() => select(command)}
                      className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-colors ${
                        isActive ? "bg-white/[0.07] text-ink" : "text-ink-2"
                      }`}
                    >
                      <span className="flex-1 truncate text-sm font-medium">
                        {command.label}
                      </span>
                      {command.hint && (
                        <span className="hidden truncate text-xs text-ink-4 sm:block">
                          {isCopyDone ? "Copied" : command.hint}
                        </span>
                      )}
                      {isCopyDone ? (
                        <FiCheck className="shrink-0 text-ok" aria-hidden="true" />
                      ) : command.icon === "copy" ? (
                        <FiCopy className="shrink-0 text-ink-4" aria-hidden="true" />
                      ) : command.external ? (
                        <FiExternalLink className="shrink-0 text-ink-4" aria-hidden="true" />
                      ) : (
                        <FiArrowRight
                          className={`shrink-0 ${isActive ? "text-accent" : "text-ink-4"}`}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-2xs text-ink-4">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span className="ml-auto">{results.length} results</span>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CommandPalette;
