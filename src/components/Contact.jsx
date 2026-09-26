import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { m, useReducedMotion } from "framer-motion";
import { FiAlertCircle, FiCheck, FiCopy, FiLoader } from "react-icons/fi";
import { CONTACT, PROFILE } from "../constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// EmailJS credentials are browser-side by design (the public key is meant to
// be exposed). Nothing secret lives here — the account is locked down by
// domain allowlist in the EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_7aanxef";
const EMAILJS_TEMPLATE_ID = "template_yjkw4xd";
const EMAILJS_PUBLIC_KEY = "bVCiV2X-6Gl5uXiWE";

const EMPTY = { name: "", email: "", message: "" };

const validators = {
  name: (value) => (value.trim() ? null : "Please tell me your name."),
  email: (value) => {
    if (!value.trim()) return "An email address is needed for me to reply.";
    return /\S+@\S+\.\S+/.test(value) ? null : "That doesn't look like an email address.";
  },
  message: (value) =>
    value.trim().length >= 10 ? null : "A sentence or two about the project, please.",
};

const Field = ({ id, label, error, touched, children, hint }) => {
  const showError = Boolean(error && touched);
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-ink-2">
          {label}
        </label>
        {hint && <span className="font-mono text-2xs text-ink-4">{hint}</span>}
      </div>
      {children}
      {showError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-danger"
        >
          <FiAlertCircle aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Contact form.
 *
 * Corrections to the previous version: errors are red rather than the site's
 * accent orange (which made them indistinguishable from the focus ring and
 * every hover state), fields validate on blur instead of only on submit, and
 * success is an inline panel rather than a toast that a mobile user can
 * scroll past without ever seeing.
 */
const Contact = ({ showHeading = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  // Bots fill every field they find; humans never see this one.
  const honeypot = useRef("");

  const runValidation = (next) =>
    Object.fromEntries(
      Object.entries(validators)
        .map(([key, check]) => [key, check(next[key])])
        .filter(([, error]) => error)
    );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // Only clear errors as the user types; never introduce one mid-keystroke.
    if (errors[name]) {
      const error = validators[name](value);
      setErrors((prev) => {
        const copy = { ...prev };
        if (error) copy[name] = error;
        else delete copy[name];
        return copy;
      });
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validators[name](value);
    setErrors((prev) => {
      const copy = { ...prev };
      if (error) copy[name] = error;
      else delete copy[name];
      return copy;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (honeypot.current) return; // silently drop bot submissions

    const nextErrors = runValidation(values);
    setTouched({ name: true, email: true, message: true });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        values,
        EMAILJS_PUBLIC_KEY
      );
      setValues(EMPTY);
      setTouched({});
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  return (
    <section
      aria-labelledby={showHeading ? "contact-heading" : undefined}
      className="space-y-[var(--gap-block)]"
    >
      {showHeading && (
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Let's build your next AI system together."
          lede="Share your goals, and I'll respond with a clear plan and timeline."
        />
      )}

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <div className="space-y-8">
          <dl className="space-y-6">
            <div>
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                Email
              </dt>
              <dd className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all text-base text-ink transition-colors hover:text-accent"
                >
                  {CONTACT.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-xs border border-line px-2 py-1 font-mono text-2xs text-ink-3 transition-colors hover:border-line-strong hover:text-ink"
                >
                  {copied ? (
                    <>
                      <FiCheck className="text-ok" aria-hidden="true" /> copied
                    </>
                  ) : (
                    <>
                      <FiCopy aria-hidden="true" /> copy
                    </>
                  )}
                </button>
              </dd>
            </div>

            <div>
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                Phone
              </dt>
              <dd className="mt-2">
                <a
                  href={`tel:${CONTACT.phoneNo.replace(/\s/g, "")}`}
                  className="text-base text-ink transition-colors hover:text-accent"
                >
                  {CONTACT.phoneNo}
                </a>
              </dd>
            </div>

            <div>
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                Based in
              </dt>
              <dd className="mt-2 text-base text-ink-2">{CONTACT.address}</dd>
            </div>

            <div>
              <dt className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-4">
                Availability
              </dt>
              <dd className="mt-2 text-base text-ink-2">{PROFILE.availability}</dd>
            </div>
          </dl>

          <p className="border-t border-line pt-6 text-sm text-ink-3">
            {CONTACT.responseTime}
          </p>
        </div>

        <Reveal>
          <div className="rounded-lg border border-line bg-surface/70 p-6 sm:p-8">
            {status === "sent" ? (
              <m.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-4 py-6"
                role="status"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ok/40 bg-ok/10 text-ok">
                  <FiCheck aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">Message sent.</h3>
                  <p className="mt-2 max-w-measure text-sm text-ink-2">
                    Thanks for reaching out — {CONTACT.responseTime.toLowerCase()}
                  </p>
                </div>
                <Button variant="subtle" size="sm" onClick={() => setStatus("idle")}>
                  Send another
                </Button>
              </m.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <Field id="contact-name" label="Your name" error={errors.name} touched={touched.name}>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jane Doe"
                    aria-invalid={Boolean(errors.name && touched.name)}
                    aria-describedby={
                      errors.name && touched.name ? "contact-name-error" : undefined
                    }
                  />
                </Field>

                <Field
                  id="contact-email"
                  label="Email address"
                  error={errors.email}
                  touched={touched.email}
                >
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="jane@company.com"
                    aria-invalid={Boolean(errors.email && touched.email)}
                    aria-describedby={
                      errors.email && touched.email ? "contact-email-error" : undefined
                    }
                  />
                </Field>

                <Field
                  id="contact-message"
                  label="Message"
                  hint="What are you trying to automate?"
                  error={errors.message}
                  touched={touched.message}
                >
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="We spend ~10 hours a week manually…"
                    aria-invalid={Boolean(errors.message && touched.message)}
                    aria-describedby={
                      errors.message && touched.message
                        ? "contact-message-error"
                        : undefined
                    }
                  />
                </Field>

                {/* Honeypot — visually and programmatically hidden. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={(event) => {
                      honeypot.current = event.target.value;
                    }}
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-sm border border-danger/40 bg-danger/10 px-3 py-2.5 text-xs text-danger"
                  >
                    <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden="true" />
                    Couldn&apos;t send that. Try again, or email me directly at{" "}
                    {CONTACT.email}.
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <FiLoader className="animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
