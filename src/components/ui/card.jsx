import { cn } from "../../lib/utils";

const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-3xl border border-white/10 bg-black/60 p-6 shadow-[0_0_40px_rgba(168,85,247,0.12)] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_50px_rgba(249,115,22,0.18)]",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("mb-4 space-y-2", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-xl font-semibold text-white", className)} {...props} />
);

const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-white/70", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("text-sm text-white/80", className)} {...props} />
);

const CardFooter = ({ className, ...props }) => (
  <div className={cn("mt-6 flex items-center gap-3", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
