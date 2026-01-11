import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface CardCustomHeaderProps {
  title: string;
  description?: string;
}

export const CardCustomHeader = ({
  title,
  description,
}: CardCustomHeaderProps) => {
  return (
    <CardHeader className="pb-4">
      <div className="relative pl-4">
        <div className="absolute left-0 top-0 h-full w-1 rounded bg-primary/60" />
        <CardTitle className="text-lg">{title}</CardTitle>
        {description ? (
          <CardDescription className="mt-1 text-sm">
            {description}
          </CardDescription>
        ) : null}
      </div>
    </CardHeader>
  );
};
