import { Separator } from "./ui/separator";

const PageHeader = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="space-y-4 pb-10">
      {eyebrow && (
        <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl sm:text-5xl font-semibold section-title">
        {title}
      </h1>
      {subtitle && <p className="max-w-2xl text-white/70">{subtitle}</p>}
      <Separator />
    </div>
  );
};

export default PageHeader;
