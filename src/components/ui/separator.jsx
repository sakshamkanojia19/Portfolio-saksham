import { cn } from "../../lib/utils";

const Separator = ({ className, ...props }) => (
  <div
    className={cn("h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent", className)}
    {...props}
  />
);

export { Separator };
