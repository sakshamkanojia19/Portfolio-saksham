"use client";
import { useState } from "react";
import { profile } from "../lib/content";
export default function ContactForm() {
  const [message, setMessage] = useState("");
  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `${data.get("type")}: ${data.get("name")}`;
    const body = `Hi Saksham,\n\n${data.get("details")}\n\nName: ${data.get("name")}\nReply email: ${data.get("email")}\nTimeline: ${data.get("timeline") || "Flexible"}\nBudget: ${data.get("budget") || "To discuss"}\n`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMessage(
      "Your email app should open with a draft. Review it and press Send there. If it doesn’t open, email me directly using the link below.",
    );
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <h2>What are you working on?</h2>
      <p>A little context is all we need to start.</p>
      <div className="form-grid">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Alex Morgan"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="alex@company.com"
          />
        </label>
      </div>
      <label>
        I’m reaching out about
        <select name="type">
          <option>A freelance project</option>
          <option>An engineering role</option>
          <option>A collaboration</option>
        </select>
      </label>
      <label>
        The opportunity
        <textarea
          name="details"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
          placeholder="What are you building, and where could I help?"
        />
      </label>
      <div className="form-grid">
        <label>
          Timeline <span>(optional)</span>
          <input
            name="timeline"
            maxLength={100}
            placeholder="e.g. Starting next month"
          />
        </label>
        <label>
          Budget <span>(optional)</span>
          <input
            name="budget"
            maxLength={100}
            placeholder="A range is helpful"
          />
        </label>
      </div>
      <button className="button primary" type="submit">
        Open email draft
      </button>
      <p className="form-note">
        Opens your email app. Nothing is sent or stored by this form.
      </p>
      <p role="status">{message}</p>
      <a className="text-link email-link" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
    </form>
  );
}
