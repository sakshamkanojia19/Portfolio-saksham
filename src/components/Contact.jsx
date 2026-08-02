import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { CONTACT } from "../constants";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// EmailJS credentials are browser-side by design (the public key is meant to be
// exposed). Nothing secret lives here — the account is locked down by domain
// allowlist in the EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_7aanxef";
const EMAILJS_TEMPLATE_ID = "template_yjkw4xd";
const EMAILJS_PUBLIC_KEY = "bVCiV2X-6Gl5uXiWE";

const details = [
  { Icon: FiMail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { Icon: FiPhone, label: "Phone", value: CONTACT.phoneNo, href: `tel:${CONTACT.phoneNo.replace(/\s/g, "")}` },
  { Icon: FiMapPin, label: "Location", value: CONTACT.address, href: null },
];

const Contact = ({ showHeading = true }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name) nextErrors.name = "Name is required";
    if (!formData.email) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Email is invalid";
    }
    if (!formData.message) nextErrors.message = "Message is required";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData, EMAILJS_PUBLIC_KEY)
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        toast.error("Failed to send message. Please try again!");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section
      aria-labelledby={showHeading ? "contact-heading" : undefined}
      aria-label={showHeading ? undefined : "Contact"}
      className="space-y-8"
    >
      <Toaster position="bottom-center" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div className="space-y-6">
          {showHeading && (
            <SectionHeading
              id="contact-heading"
              eyebrow="Contact"
              title="Let's build your next AI system together."
              lede="Share your goals, and I'll respond with a clear plan and timeline."
            />
          )}

          <ul className="space-y-3">
            {details.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-orange-300"
                  aria-hidden="true"
                >
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-white/40">
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="break-all text-white/80 transition hover:text-orange-300"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-white/80">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* `once` — the form must never fade back out mid-interaction. */}
        <Reveal once>
          <Card>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-xs text-white/60">
                Your name
              </label>
              <Input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name && (
                <p id="contact-name-error" role="alert" className="text-xs text-orange-300">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs text-white/60">
                Email address
              </label>
              <Input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email && (
                <p id="contact-email-error" role="alert" className="text-xs text-orange-300">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-xs text-white/60">
                Message
              </label>
              <Textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="text-xs text-orange-300">
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full sm:w-auto"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </form>
          </Card>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
