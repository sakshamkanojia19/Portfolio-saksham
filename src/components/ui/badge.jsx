import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Tech tags are reference data, not decoration — they read as quiet monospace
// chips so a 12-item stack list never out-shouts the heading above it.
const badgeVariants = cva(
  "inline-flex items-center rounded-xs border px-2 py-[3px] font-mono text-2xs leading-none transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border-line bg-white/[0.03] text-ink-3 hover:border-line-strong hover:text-ink-2",
        accent: "border-accent/35 bg-accent-soft text-accent",
        solid: "border-transparent bg-ink text-bg",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const Badge = ({ className, variant, ...props }) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { Badge, badgeVariants };
