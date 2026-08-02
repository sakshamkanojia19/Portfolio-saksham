import { Separator } from "./ui/separator";

const PageHeader = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="space-y-4 pb-8 sm:pb-10">
      {eyebrow && (
        <p className="font-mono text-xs text-orange-300 sm:text-sm">
          <span className="text-white/30">{"~/"}</span>
          {eyebrow.toLowerCase().replace(/\s+/g, "-")}
        </p>
      )}
      <h1 className="section-title font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-sm text-white/65 sm:text-base">{subtitle}</p>
      )}
      <Separator />
    </div>
  );
};

export default PageHeader;
