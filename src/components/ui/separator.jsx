import { cn } from "../../lib/utils";

const Separator = ({ className, ...props }) => (
  <div
    role="presentation"
    className={cn("h-px w-full bg-line", className)}
    {...props}
  />
);

export { Separator };
