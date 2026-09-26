import { cn } from "../../lib/utils";
import { fieldBase } from "./input";

const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(fieldBase, "min-h-[150px] resize-y border-line py-3", className)}
    {...props}
  />
);

export { Textarea };
