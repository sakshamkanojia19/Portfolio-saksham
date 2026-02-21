import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/90 transition-all duration-300 hover:border-orange-300/40 hover:text-orange-200",
  {
    variants: {
      variant: {
        default: "",
        purple: "border-purple-500/30 text-purple-200",
        orange: "border-orange-400/30 text-orange-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Badge = ({ className, variant, ...props }) => (
  <span className={cn(badgeVariants({ variant, className }))} {...props} />
);

export { Badge, badgeVariants };
