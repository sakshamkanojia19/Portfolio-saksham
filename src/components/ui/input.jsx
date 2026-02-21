import { cn } from "../../lib/utils";

const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "h-11 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 focus:border-orange-400/60 focus:outline-none focus:ring-2 focus:ring-orange-400/20",
      className
    )}
    {...props}
  />
);

export { Input };
