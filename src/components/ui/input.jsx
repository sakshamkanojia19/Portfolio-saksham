import { cn } from "../../lib/utils";

const base = [
  "w-full rounded-sm border bg-black/40 px-3.5 text-sm text-ink",
  "placeholder:text-ink-4",
  "transition-colors duration-200",
  "focus:outline-none focus:border-accent/70 focus:ring-2 focus:ring-accent/20",
  // aria-invalid drives the error styling so the red state can never drift
  // out of sync with the message rendered beneath the field.
  "aria-[invalid=true]:border-danger/70 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger/15",
].join(" ");

const Input = ({ className, ...props }) => (
  <input className={cn(base, "h-11 border-line", className)} {...props} />
);

export { Input, base as fieldBase };
