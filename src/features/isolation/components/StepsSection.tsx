import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

/**
 * Враппер секции "Ход расчёта" в стиле, как на макете:
 * - header-strip с левой акцентной линией
 * - кнопка "Показать/Скрыть" справа
 * - внутри любые карточки шагов (не вложены визуально, просто показываются/скрываются)
 */
export const StepsSection = ({
  children,
  title = "Ход расчёта",
  subtitle = "формулы · подстановка · нормативы",
  defaultOpen = true,
}: React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
  defaultOpen?: boolean;
}>) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {/* Header strip */}
      <div className="relative overflow-hidden rounded-lg border bg-muted/60 my-8">
        <div className="absolute left-0 top-0 h-full w-1 bg-primary/50" />

        <div className="flex items-start justify-between gap-3 px-4 py-3">
          <div className="min-w-0 pl-2">
            <div className="text-lg font-medium">{title}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {subtitle}
            </div>
          </div>

          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="shrink-0 gap-2">
              {open ? "Скрыть" : "Показать"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      {/* Content */}
      <CollapsibleContent>
        <div className="mt-4 space-y-6">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
