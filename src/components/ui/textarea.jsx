import { cn } from "../../lib/utils";

const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      "min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-orange-400/60 focus:outline-none focus:ring-2 focus:ring-orange-400/20",
      className
    )}
    {...props}
  />
);

export { Textarea };
