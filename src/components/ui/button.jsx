import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// One accent, used sparingly: `primary` is the only amber-filled control and
// there should be at most one per viewport. Everything else is monochrome.
// Note there is no global hover-lift any more — a button that moves is a
// signal, and the old build spent that signal on every control at once.
const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-[-0.01em]",
    "transition-[background-color,border-color,color,transform] duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white",
    "disabled:pointer-events-none disabled:opacity-45",
    "active:scale-[0.985]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-accent text-accent-ink hover:brightness-[1.08] shadow-e1",
        solid:
          "rounded-full bg-ink text-bg hover:bg-white/90",
        outline:
          "rounded-full border border-line-strong bg-white/[0.02] text-ink hover:border-accent/60 hover:bg-accent-soft hover:text-accent",
        subtle:
          "rounded-full border border-line bg-white/[0.02] text-ink-2 hover:border-line-strong hover:text-ink",
        ghost:
          "rounded-full text-ink-3 hover:bg-white/[0.06] hover:text-ink",
        link: "text-ink-2 underline-offset-4 hover:text-accent hover:underline",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
