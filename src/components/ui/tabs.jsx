import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2",
      className
    )}
    {...props}
  />
);

const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "rounded-full px-4 py-2 text-sm font-semibold text-white/70 transition-all duration-300 hover:text-white data-[state=active]:bg-white data-[state=active]:text-black",
      className
    )}
    {...props}
  />
);

const TabsContent = ({ className, ...props }) => (
  <TabsPrimitive.Content
    className={cn("mt-6 focus-visible:outline-none", className)}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
