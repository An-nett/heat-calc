import { Separator } from "@/components/ui/separator";

export interface NormativeItemProps {
  title: string;
  value: number | string;
  unit: string;
  linkText: string;
  linkHref: string;
}

export const NormativeItem = ({
  title,
  value,
  unit,
  linkText,
  linkHref,
}: NormativeItemProps) => {
  return (
    <div className="rounded-md border p-4 bg-muted/60">
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm font-medium">{title}</div>

        <div className="text-right">
          <div className="text-2xl font-semibold tabular-nums">{value}</div>
          <div className="text-xs text-muted-foreground">{unit}</div>
        </div>
      </div>

      <Separator className="my-3" />

      <a
        href={linkHref}
        className="text-xs text-muted-foreground underline decoration-dotted hover:text-foreground"
        target="_blank"
        rel="noreferrer"
      >
        {linkText}
      </a>
    </div>
  );
};
