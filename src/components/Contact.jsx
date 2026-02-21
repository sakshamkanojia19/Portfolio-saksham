import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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
      .send(
        "service_7aanxef",
        "template_yjkw4xd",
        formData,
        "bVCiV2X-6Gl5uXiWE"
      )
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
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <Toaster />
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
          Contact
        </p>
        <h2 className="font-display text-3xl sm:text-4xl section-title">
          Let us build your next AI system together.
        </h2>
        <p className="text-white/70">
          Share your goals, and I will respond with a clear plan and timeline.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs text-orange-300">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-xs text-orange-300">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project"
            />
            {errors.message && (
              <p className="text-xs text-orange-300">{errors.message}</p>
            )}
          </div>
          <Button type="submit" variant="gradient" size="lg" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Contact;
