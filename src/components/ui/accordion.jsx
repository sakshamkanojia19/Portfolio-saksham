import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({ className, ...props }) => (
  <AccordionPrimitive.Item
    className={cn(
      "rounded-2xl border border-white/10 bg-white/5 px-4 py-2",
      className
    )}
    {...props}
  />
);

const AccordionTrigger = ({ className, children, ...props }) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      className={cn(
        "group flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-white transition hover:text-orange-200",
        className
      )}
      {...props}
    >
      {children}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-orange-300 transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-orange-300/60">
        +
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({ className, ...props }) => (
  <AccordionPrimitive.Content
    className={cn(
      "overflow-hidden pb-4 text-sm text-white/70 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      className
    )}
    {...props}
  />
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
